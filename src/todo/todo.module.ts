import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListController } from './todo-list.controller';
import { TodoItemController } from './todo-item.controller';
import { TodoListRepository } from './repositories/todo-list.repository';
import { TodoItemRepository } from './repositories/todo-item.repository';
import { CreateTodoListHandler } from './handlers/create-todo-list.handler';
import { UpdateTodoListHandler } from './handlers/update-todo-list.handler';
import { DeleteTodoListHandler } from './handlers/delete-todo-list.handler';
import { GetAllTodoListsForUserHandler } from './handlers/get-all-todo-lists-for-user.handler';
 
import { CreateTodoItemHandler } from './handlers/create-todo-item.handler';
import { UpdateTodoItemHandler } from './handlers/update-todo-item.handler';
import { DeleteTodoItemHandler } from './handlers/delete-todo-item.handler';
import { GetAllTodoItemsForTodoListHandler } from './handlers/get-all-todo-items-for-todo-list.handler';
 
import { GetTodoListByIdHandler } from './handlers/get-todo-list-by-id.handler';
import {TodoList, TodoListSchema} from "../schemas/todolist.schema";
import {TodoItem, TodoItemSchema} from "../schemas/todoitem.schema";
import {UserModule} from "../user/user.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {CreateTodoSaga} from "./sagas/create-todo.saga";
import {UpdateTodoListItemHandler} from "./handlers/update-todo-list-item.handler";
import {UpdateTodoListUserHandler} from "./handlers/update-todo-list-user-handler";
import {CreateTodoListUserSaga} from "./sagas/create-todo-list-user-saga";
 
 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }, { name: TodoItem.name, schema: TodoItemSchema }]),
    CqrsModule,UserModule,

    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'todo_queue',
          queueOptions: {
            durable: true
          },
         
        },
      },
    ]),
  ],
  providers: [
    TodoListRepository,
    TodoItemRepository,
    // Command Handlers
    CreateTodoListHandler,
    UpdateTodoListHandler,
    DeleteTodoListHandler,
    CreateTodoItemHandler,
    UpdateTodoItemHandler,
    DeleteTodoItemHandler,
    // Query Handlers
    GetAllTodoListsForUserHandler,
    GetTodoListByIdHandler,
    GetAllTodoItemsForTodoListHandler,
    GetTodoListByIdHandler,
    UpdateTodoListHandler,
    UpdateTodoListItemHandler,
    UpdateTodoListUserHandler,
    CreateTodoSaga,
    CreateTodoListUserSaga
      
  ],
  
  controllers: [TodoListController, TodoItemController],
  exports: [TodoListRepository,TodoItemRepository]
})
export class TodoModule {}
