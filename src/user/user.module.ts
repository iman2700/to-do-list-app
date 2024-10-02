import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
 
import { CreateUserHandler } from './handlers/create-user.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { DeleteUserHandler } from './handlers/delete-user.handler';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import {User, UserSchema} from "../schemas/user.schema";
import {UserRepository} from "./repositories/user.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,  
  ],
  providers: [
    UserRepository,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    GetUserByIdHandler,   
  ],
  controllers: [UserController],
  exports: [UserRepository],  
})
export class UserModule {}
