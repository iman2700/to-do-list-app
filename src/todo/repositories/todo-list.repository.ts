import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todolist.schema';
import { GenericRepository } from '../../infrastructure/database/generic.repository';

@Injectable()
export class TodoListRepository extends GenericRepository<TodoListDocument> {
  constructor(@InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>) {
    super(todoListModel);  
  }
  async findByUserId(userId: string): Promise<TodoList[]> {
    return this.todoListModel.find({ userId: new Types.ObjectId(userId) }).exec();
    
  }

  async addTodoItemToList(todoListId: string, todoItemId: string): Promise<TodoListDocument> {
    return this.todoListModel.findByIdAndUpdate(
        todoListId,
        { $push: { todoItems: todoItemId } },  // Add the new TodoItem reference
        { new: true }
    ).exec();
  }

  async getTodoListById(todoListId: string): Promise<TodoListDocument> {
    return this.todoListModel.findById(todoListId).populate('todoItems').exec();
  }
}
