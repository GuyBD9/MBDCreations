// backend/controllers/worksController.js
import { worksService } from '../services/dbService.js';

export const worksController = {
  getAll: (req, res) => {
    try {
      const works = worksService.getAllWorks();
      res.status(200).json(works);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching works', error: error.message });
    }
  },

  getById: (req, res) => {
    try {
      const { id } = req.params;
      const work = worksService.getWorkById(id);
      if (work) {
        res.status(200).json(work);
      } else {
        res.status(404).json({ message: `Work with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching work', error: error.message });
    }
  },
};