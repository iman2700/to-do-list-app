import { Controller, Post, Get, Param, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { UpdateTodoListCommand } from './commands/update-todo-list.command';
import { DeleteTodoListCommand } from './commands/delete-todo-list.command';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';
import {GetAllTodoListsForUserQuery} from "./queries/get-all-todo-lists-for-user.query";
import {TodoList} from "../schemas/todolist.schema";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
//@UseGuards(JwtAuthGuard)
@Controller('todo-lists')
@ApiTags('todo-lists')
 

export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

    @ApiOperation({ summary: 'Create a new Todo List' })   
    @ApiResponse({ status: 201, description: 'The Todo List has been successfully created.' })  // Successful response
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('create')
  async createTodoList(@Body() createTodoListDto: CreateTodoListCommand) {
    return this.commandBus.execute(new CreateTodoListCommand(createTodoListDto.userId, createTodoListDto.title));
  }

    @ApiOperation({summary: 'Update an existing Todo List'})
    @ApiResponse({status: 200, description: 'The Todo List has been successfully updated.'})
    @ApiResponse({status: 404, description: 'Todo List not found'})
    @ApiParam({name: 'id', required: true, description: 'The ID of the Todo List to update'})
    @Put('update/:id')
    async updateTodoList(@Param('id') id: string, @Body() updateTodoListDto: UpdateTodoListCommand) {
        return this.commandBus.execute(new UpdateTodoListCommand(id, updateTodoListDto.title, updateTodoListDto.todoListId));
    }

    @ApiOperation({summary: 'Delete a Todo List'})
    @ApiResponse({status: 200, description: 'The Todo List has been successfully deleted.'})
    @ApiResponse({status: 404, description: 'Todo List not found'})
    @ApiParam({name: 'id', required: true, description: 'The ID of the Todo List to delete'})
    @Delete(':id')
    async deleteTodoList(@Param('id') id: string) {
        return this.commandBus.execute(new DeleteTodoListCommand(id));
    }

    @ApiOperation({ summary: 'Get all Todo Lists for a user' })
    @ApiResponse({ status: 200, description: 'List of Todo Lists for the user', type: [TodoList] })   
    @ApiParam({ name: 'userId', required: true, description: 'The ID of the user to get Todo Lists for' })
    @Get(':userId')
    async getAllTodoLists(@Param('userId') userId: string): Promise<TodoList[]> {
        return this.queryBus.execute(new GetAllTodoListsForUserQuery(userId));
    }
}
