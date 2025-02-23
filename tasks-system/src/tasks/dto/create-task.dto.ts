import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task-status';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
