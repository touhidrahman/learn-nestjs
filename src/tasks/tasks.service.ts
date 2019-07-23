import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.model';
import { Model } from "mongoose";

@Injectable()
export class TasksService {

    constructor(
        @InjectModel('Task')
        private readonly taskModel: Model<Task>,
    ) {}

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        let query = this.taskModel.find();

        if (status) {
            query.and([{status}]);
        }
        if (search) {
            query.or([
                {title: { $regex: search, $options: "i" }},
                {description: { $regex: search, $options: "i" }},
            ]);
        }
        const res = await query.exec();
        return res.map(t => this.toPretty(t));
    }

    async getTaskById(id: string): Promise<Task> {
        let found;

        try {
            found = await this.taskModel.findById(id);
        } catch (error) {
            throw new NotFoundException(`Task with id: ${id} was not found.`);
        }

        if (!found) {
            throw new NotFoundException(`Task with id: ${id} was not found.`);
        }

        return found as Task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new this.taskModel({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        return this.toPretty(await task.save());
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return this.toPretty(task);
    }

    async deleteTaskById(id: string): Promise<void> {
        try {
            await this.taskModel.deleteOne({_id: id}).exec();
        } catch (error) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

    private toPretty(raw: any): Task {
        return {
            id: raw._id,
            description: raw.description,
            title: raw.title,
            status: raw.status,
        } as Task;
    }
}
