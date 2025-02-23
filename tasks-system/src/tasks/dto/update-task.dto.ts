import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task-status';
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;
}
