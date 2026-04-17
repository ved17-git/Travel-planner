import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=userSchema.d.ts.map