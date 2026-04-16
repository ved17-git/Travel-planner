import express from 'express';
import { createTrip, getAllTrips, getTrip, deleteTrip } from '../controllers/tripController.js';
import { middleware } from '../middleware.js';
export const tripRouter = express.Router();
tripRouter.get('/getTrips', middleware, getAllTrips);
tripRouter.post('/createTrips', middleware, createTrip);
tripRouter.get('/:tripId', middleware, getTrip);
tripRouter.delete('/:tripId', middleware, deleteTrip);
//# sourceMappingURL=tripRoutes.js.map