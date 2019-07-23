import { EntityRepository, Repository, MongoRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";


@EntityRepository(Task)
export class TaskRepository extends MongoRepository<Task> {

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        let query: Partial<Task> = new Task();
        if (status) {
            query.status = status;
        }
        // if (search) {
        //     query.title = { $text: search };
        // }
        const result = await this.find(query);

        return result;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task  = new Task();
        task.title = title; 
        task.description = description; 
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;
    }
    
}