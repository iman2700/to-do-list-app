import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema'; // Use the schema and document type
import { GenericRepository } from '../../infrastructure/database/generic.repository'; // Generic repo

@Injectable()
export class UserRepository extends GenericRepository<UserDocument> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    super(userModel);  
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
  async findByUseID(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).populate('todoLists').exec();
    
    return user;
  }
  async addTodoListToUser(userId: string, todoListId: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
        userId,
        { $push: { todoLists: todoListId } },  
        { new: true }  
    ).exec();
  }
}
