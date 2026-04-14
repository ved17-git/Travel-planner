import express from 'express'
import { createTrip, getAllTrips } from '../controllers/tripController.js'
import { middleware } from '../middleware.js'
export const tripRouter=express.Router()

tripRouter.get('/getTrips', middleware, getAllTrips)
tripRouter.post('/createTrips', middleware, createTrip)
