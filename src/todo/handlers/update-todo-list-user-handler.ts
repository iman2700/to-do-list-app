import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateTodoListUserCommand} from "../commands/update-todo-list-user.command";
import {UserRepository} from "../../user/repositories/user.repository";
 

@CommandHandler(UpdateTodoListUserCommand)
export class UpdateTodoListUserHandler implements ICommandHandler<UpdateTodoListUserCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(command: UpdateTodoListUserCommand): Promise<any> {
        const { todoListId,userId } = command;
        return await this.userRepository.addTodoListToUser(todoListId, userId);
    }
}
