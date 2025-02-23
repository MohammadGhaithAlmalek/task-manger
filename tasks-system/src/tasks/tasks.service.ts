import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const createTask = await this.prisma.task.create({
      data: { ...createTaskDto, userId: userId },
    });
    return createTask;
  }

  async getUserTasks(userId: number) {
    return await this.prisma.task.findMany({
      where: { userId: userId }, // Filters tasks for the specific user
    });
  }

  async findOneTask(id: number, userId: number) {
    const oneTask = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!oneTask) {
      throw new NotFoundException('Task not found or does not belong to you');
    }
    return oneTask;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.prisma.task.update({
      where: {
        id,
        userId,
      },
      data: updateTaskDto,
    });
  }

  removeTask(id: number, userId: number) {
    return this.prisma.task.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
