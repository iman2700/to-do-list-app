import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../commands/create-todo-item.command';
import { TodoItemRepository } from '../repositories/todo-item.repository';
import {TodoItem} from "../../schemas/todoitem.schema";
import {TodoListRepository} from "../repositories/todo-list.repository";
import {TodoItemCreatedEvent} from "../events/todo-item-created.event";
@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(private readonly todoItemRepository: TodoItemRepository,
              private readonly todoListRepository: TodoListRepository,
              private readonly eventBus: EventBus,
             
  ) {}
  async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
    const { title, description, priority, todoListId } = command;
    const todoItem = await this.todoItemRepository.createTodoItem(
        todoListId,
        title,
        description,
        priority,
    );

    this.eventBus.publish(new TodoItemCreatedEvent(todoItem._id.toString(), todoListId));
    return todoItem;
  }
}
