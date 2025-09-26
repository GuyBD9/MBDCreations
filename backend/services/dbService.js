// backend/services/dbService.js
import fs from 'fs';
import path from 'path';

// This is the path to our new JSON database.
const DB_PATH = path.join(process.cwd(), './database/works.json');

// A function to read all the data from the JSON file.
function readData() {
  try {
    const jsonData = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Could not read or parse works.json", error);
    return []; // Return an empty array on error
  }
}

// The service now uses the data from the JSON file.
export const worksService = {
  getAllWorks: () => {
    return readData();
  },

  getWorkById: (id) => {
    const works = readData();
    // Find the work with the matching ID. Note that id from params is a string.
    return works.find(work => work.id.toString() === id.toString());
  },
};