import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseDbUri } from './config/mongoose.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseDbUri),
    TasksModule
  ],
})
export class AppModule {}
