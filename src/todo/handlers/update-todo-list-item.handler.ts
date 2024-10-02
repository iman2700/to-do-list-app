import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
 
import {UpdateTodoListItemCommand} from "../commands/update-todo-list-item.command";
import {TodoListRepository} from "../repositories/todo-list.repository";
 

@CommandHandler(UpdateTodoListItemCommand)
export class UpdateTodoListItemHandler implements ICommandHandler<UpdateTodoListItemCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository
    ) {}

    async execute(command: UpdateTodoListItemCommand): Promise<any> {
        const { todoListId,todoItemId } = command;
        return await this.todoListRepository.addTodoItemToList(todoListId, todoItemId);
    }
}
