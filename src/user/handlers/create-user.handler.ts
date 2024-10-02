import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../repositories/user.repository';
import {User} from "../../schemas/user.schema";
 

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUserCommand): Promise<User> {
    const { username, password } = command;
    const user = new User();
    user.username=username;
    user.password=password;
    return this.userRepository.create(user);
  }
}
