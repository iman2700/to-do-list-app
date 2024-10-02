import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {GetUserByIdQuery} from "./queries/get-user-by-id.query";

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserCommand) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto.username, createUserDto.password));
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
     return this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserCommand) {
    return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto.username, updateUserDto.password));
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
