import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { TodoListRepository } from '../repositories/todo-list.repository';
import {TodoList} from "../../schemas/todolist.schema";
import {TodoListCreatedEvent} from "../events/todo-list-created-event";
import {Types} from "mongoose";
 

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoListRepository: TodoListRepository,
              private readonly eventBus: EventBus,) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const { userId, title, } = command;
    const todo=new TodoList();
    todo.title=title;
    todo.userId = new Types.ObjectId(userId);
    const todoList = await this.todoListRepository.create(todo);
    this.eventBus.publish(new TodoListCreatedEvent(todoList._id.toString(), userId));
    return todoList;
  }
}
