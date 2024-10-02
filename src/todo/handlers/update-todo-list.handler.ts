import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';
import { TodoListRepository } from '../repositories/todo-list.repository';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async execute(command: UpdateTodoListCommand): Promise<any> {
    const { todoListId,title } = command;
    return await this.todoListRepository.update(todoListId,{title} );
  }
}
