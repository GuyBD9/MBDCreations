// frontend/services/api.js

const API_BASE_URL = 'http://localhost:4000/api';

async function fetchApi(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
}

export const workApiService = {
  getAllWorks: () => {
    return fetchApi('/works');
  },
  
  getWorkById: (id) => {
    return fetchApi(`/works/${id}`);
  },

  getFeaturedWork: async () => {
    const allWorks = await fetchApi('/works');
    if (!allWorks) return null;
    return allWorks.find(w => w.is_featured) || allWorks[0] || null;
  },

  // NEW function to find the next upcoming drop
  getNextDrop: async () => {
    const allWorks = await fetchApi('/works');
    if (!allWorks) return null;
    
    // Find the soonest upcoming drop in the future
    const nextDrop = allWorks
      .filter(w => w.is_drop && new Date(w.drop_start_at) > new Date())
      .sort((a, b) => new Date(a.drop_start_at) - new Date(b.drop_start_at))[0]; // Get the first one

    return nextDrop || null;
  }
};