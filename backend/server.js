// backend/server.js
import express from 'express';
import cors from 'cors';
import worksRoutes from './routes/works.js'; 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.use('/api/works', worksRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});