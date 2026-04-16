import type { Request, Response } from "express";
import 'dotenv/config';
export declare const createTrip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllTrips: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTrip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTrip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTrip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=tripController.d.ts.map