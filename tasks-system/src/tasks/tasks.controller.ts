import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGaurd } from 'src/auth/jwt-guard';
import { JwtTokenPayload } from 'src/auth/auth.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create-task')
  @UseGuards(JwtAuthGaurd)
  create(
    @Req()
    request: { user: JwtTokenPayload },
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, request.user.userId);
  }

  //get all tasks depending on userId
  @Get('get-user-tasks')
  @UseGuards(JwtAuthGaurd)
  getUserTasks(
    @Req()
    request: {
      user: JwtTokenPayload;
    },
  ) {
    return this.tasksService.getUserTasks(request.user.userId);
  }

  //get task depending on task id
  @Get('get-task/:id')
  @UseGuards(JwtAuthGaurd)
  findOneTask(
    @Param('id', ParseIntPipe) id: number,
    @Req()
    request: { user: JwtTokenPayload },
  ) {
    return this.tasksService.findOneTask(id, request.user.userId);
  }

  //correct
  @Put('update-task/:id')
  @UseGuards(JwtAuthGaurd)
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Req()
    request: { user: JwtTokenPayload },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId: number = request.user.userId;
    return this.tasksService.updateTask(id, updateTaskDto, userId);
  }

  //correct
  @Delete('delete-task/:id')
  @UseGuards(JwtAuthGaurd)
  removeTask(
    @Param('id', ParseIntPipe) id: number,
    @Req()
    request: { user: JwtTokenPayload },
  ) {
    const userId = request.user.userId;
    return this.tasksService.removeTask(id, userId);
  }
}
