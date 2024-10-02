import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { TodoItemRepository } from '../repositories/todo-item.repository';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: UpdateTodoItemCommand): Promise<any> {
    const { todoItemId, title, description, priority } = command;
    return this.todoItemRepository.updateTodoItem(todoItemId, title, description, priority);
  }
}
