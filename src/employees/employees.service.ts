import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from 'src/users/dto/createEmployeeDto';
import { UpdateEmployeeDTO } from 'src/users/dto/updateEmployeeDto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const existingEmployee = await this.databaseService.employee.findUnique({
      where: { email: createEmployeeDto.email },
    });

    if (existingEmployee) {
      return {
        message: 'Email already exists',
        data: null,
        success: false,
      };
    }

    const employee = await this.databaseService.employee.create({
      data: createEmployeeDto,
    });

    return {
      message: 'Employee created successfully',
      data: employee,
      success: true
    };
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })

    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id
      }
    });

    if (!employee) {
      return {
        message: 'Employee not found',
        data: null,
        success: false
      };
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDTO) {
    try {
      const employee = await this.databaseService.employee.update({
        where: {
          id,
        },
        data: updateEmployeeDto
      });

      return {
        message: 'Employee updated successfully',
        data: employee,
        success: true
      };
    } catch {
      return {
        message: 'Employee not found or update failed',
        data: null,
        success: false
      };
    }
  }

  async remove(id: number) {
    try {
      await this.databaseService.employee.delete({
        where: {
          id
        }
      });

      return {
        message: 'Employee deleted successfully',
        success: true
      };
    } catch {
      return {
        message: 'Employee not found or deletion failed',
        success: false
      };
    }
  }
}
