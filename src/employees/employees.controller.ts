import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';;
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CreateEmployeeDto } from 'src/users/dto/createEmployeeDto';
import { UpdateEmployeeDTO } from 'src/users/dto/updateEmployeeDto';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false})
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDTO) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
