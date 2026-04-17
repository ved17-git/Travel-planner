import express from 'express';
import { createTrip, getAllTrips, getTrip, deleteTrip, updateTrip } from '../controllers/tripController.js';
import { authMiddleware } from '../middleware.js';
import { createTripLimitter, updateTripLimitter } from '../rateLimitter.js';
export const tripRouter = express.Router();
tripRouter.get('/getTrips', authMiddleware, getAllTrips);
tripRouter.post('/createTrips', authMiddleware, createTripLimitter, createTrip);
tripRouter.get('/:tripId', authMiddleware, getTrip);
tripRouter.delete('/:tripId', authMiddleware, deleteTrip);
tripRouter.put('/:tripId', authMiddleware, updateTripLimitter, updateTrip);
//# sourceMappingURL=tripRoutes.js.map