import * as mongoose from 'mongoose';
import { TaskStatus } from './task-status.enum';

// mongoose schemas must be written in javascript (no typescript)
export const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
});

export interface Task extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}