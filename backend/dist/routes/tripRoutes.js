import express from 'express';
import { createTrip, getAllTrips, getTrip, deleteTrip, updateTrip } from '../controllers/tripController.js';
import { middleware } from '../middleware.js';
import { rateLimitter } from '../rateLimitter.js';
export const tripRouter = express.Router();
tripRouter.get('/getTrips', middleware, getAllTrips);
tripRouter.post('/createTrips', middleware, rateLimitter, createTrip);
tripRouter.get('/:tripId', middleware, getTrip);
tripRouter.delete('/:tripId', middleware, deleteTrip);
tripRouter.put('/:tripId', middleware, rateLimitter, updateTrip);
//# sourceMappingURL=tripRoutes.js.map