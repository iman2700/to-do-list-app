import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { TodoItemRepository } from '../repositories/todo-item.repository';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(command: DeleteTodoItemCommand): Promise<any> {
    return this.todoItemRepository.delete(command.id);
  }
}
