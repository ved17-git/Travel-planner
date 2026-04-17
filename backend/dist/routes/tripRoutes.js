import express from 'express';
import { createTrip, getAllTrips, getTrip, deleteTrip, updateTrip } from '../controllers/tripController.js';
import { middleware } from '../middleware.js';
import { createTripLimitter, updateTripLimitter } from '../rateLimitter.js';
export const tripRouter = express.Router();
tripRouter.get('/getTrips', middleware, getAllTrips);
tripRouter.post('/createTrips', middleware, createTripLimitter, createTrip);
tripRouter.get('/:tripId', middleware, getTrip);
tripRouter.delete('/:tripId', middleware, deleteTrip);
tripRouter.put('/:tripId', middleware, updateTripLimitter, updateTrip);
//# sourceMappingURL=tripRoutes.js.map