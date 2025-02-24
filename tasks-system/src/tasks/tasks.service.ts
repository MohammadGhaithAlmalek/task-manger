import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    try {
      const createTask = await this.prisma.task.create({
        data: { ...createTaskDto, userId },
      });
      return createTask;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Handle Foreign Key Violation (if userId does not exist)
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Invalid user ID: User does not exist.',
          );
        }
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the task.',
      );
    }
  }

  async getUserTasks(userId: number) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: { userId },
      });

      if (!tasks.length) {
        throw new NotFoundException(
          `No tasks found for user with ID ${userId}`,
        );
      }

      return tasks;
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      throw new InternalServerErrorException('Could not retrieve user tasks');
    }
  }

  async findOneTask(id: number, userId: number) {
    try {
      const oneTask = await this.prisma.task.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!oneTask) {
        throw new NotFoundException('Task not found or does not belong to you');
      }

      return oneTask;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new InternalServerErrorException('Could not retrieve the task');
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id, userId },
      });

      if (!task) {
        throw new NotFoundException('Task not found or does not belong to you');
      }

      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw new InternalServerErrorException('Could not update the task');
    }
  }

  async removeTask(id: number, userId: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id, userId },
      });
      if (!task) {
        throw new NotFoundException('Task not found or does not belong to you');
      }
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new InternalServerErrorException('Could not delete the task');
    }
  }
}
