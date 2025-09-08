import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './createEmployeeDto';

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDto) {}