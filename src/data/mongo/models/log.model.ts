import mongoose from "mongoose";
import { LogEntityOptions } from "../../../domian/entities/log.entity";

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    },
    origin: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'hight'],
        default: 'low',
    },
    createdAt: {
        type: String,
        default: new Date(),
    },
});

export const LogModel = mongoose.model<LogEntityOptions>('Log', logSchema);