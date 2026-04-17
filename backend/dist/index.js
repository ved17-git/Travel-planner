import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/userRoutes.js';
import { tripRouter } from './routes/tripRoutes.js';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/', userRouter);
app.use('/', tripRouter);
async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URL);
        if (connect) {
            console.log("connected to db");
        }
    }
    catch (error) {
        console.log("db connect err");
        console.log(error);
    }
}
connectDB();
app.get('/', (req, res) => {
    res.json({
        msg: "test endpoint"
    });
});
// module.exports =app
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map