import {Controller, Post, Put, Delete, Param, Body, Get, UseGuards} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { UpdateTodoItemCommand } from './commands/update-todo-item.command';
import { DeleteTodoItemCommand } from './commands/delete-todo-item.command';
import {GetTodoItemByIdQuery} from "./queries/get-todo-item-by-id.query";
import {GetAllTodoItemsForTodoListQuery} from "./queries/get-all-todo-items-for-todo-list.query";
import {JwtAuthGuard} from "../config/jwt-auth.guard";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
//@UseGuards(JwtAuthGuard)
@Controller('todo-items')
export class TodoItemController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Add a new Todo Item to a Todo List' })
  @ApiResponse({ status: 201, description: 'The Todo Item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'todoListId', required: true, description: 'The ID of the Todo List to add the Todo Item to' })

  @Post(':todoListId')
  async addTodoItem(
      @Param('todoListId') todoListId: string,
      @Body() createTodoItemDto: { title: string; description: string; priority: number },
  ) {
    const { title, description, priority } = createTodoItemDto;
    return this.commandBus.execute(
        new CreateTodoItemCommand( title, description, priority, todoListId,),
    );
  }
  
  @Put(':todoItemId')
  @ApiOperation({ summary: 'Update an existing Todo Item' })
  @ApiResponse({ status: 200, description: 'The Todo Item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Todo Item not found' })
  @ApiParam({ name: 'todoItemId', required: true, description: 'The ID of the Todo Item to update' })
  async updateTodoItem(
      @Param('todoItemId') todoItemId: string,
      @Body() updateTodoItemDto: { title: string; description: string; priority: number },
  ) {
    const { title, description, priority } = updateTodoItemDto;
    return this.commandBus.execute(
        new UpdateTodoItemCommand(todoItemId, title, description, priority),
    );
  }

  @ApiOperation({ summary: 'Delete a Todo Item' })
  @ApiResponse({ status: 200, description: 'The Todo Item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo Item not found' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the Todo Item to delete' })
  @Delete(':id')
  async deleteTodoItem(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteTodoItemCommand(id));
  }

  @ApiOperation({ summary: 'Get all Todo Items for a Todo List' })
  @ApiResponse({ status: 200, description: 'List of Todo Items for the Todo List' })  
  @ApiParam({ name: 'todoListId', required: true, description: 'The ID of the Todo List to get Todo Items from' })
  @Get(':todoListId')
  async getTodoItems(@Param('todoListId') todoListId: string) {
    return this.queryBus.execute(new GetAllTodoItemsForTodoListQuery(todoListId));
  }
}
