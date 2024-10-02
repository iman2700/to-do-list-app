import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todoitem.schema';
import { GenericRepository } from '../../infrastructure/database/generic.repository';

@Injectable()
export class TodoItemRepository extends GenericRepository<TodoItemDocument> {
  constructor(@InjectModel(TodoItem.name) private readonly todoItemModel: Model<TodoItemDocument>) {
    super(todoItemModel);  
  }
  async findByTodoListId(todoListId: string): Promise<TodoItem[]> {
    return this.todoItemModel.find({ todoListId }).exec();
  }
  async createTodoItem(todoListId: string, title: string, description: string, priority: number): Promise<TodoItemDocument> {
    const newItem = new this.todoItemModel({
      todoListId: new Types.ObjectId(todoListId),
      title,
      description,
      priority,
    });
    return newItem.save();
  }

  async updateTodoItem(todoItemId: string, title: string, description: string, priority: number): Promise<TodoItemDocument> {
    return this.todoItemModel.findByIdAndUpdate(
        todoItemId,
        { title, description, priority },
        { new: true }   
    ).exec();
  }
  async getTodoItemsByList(todoListId: string): Promise<TodoItem[]> {
    return this.todoItemModel.find({ todoListId: new Types.ObjectId(todoListId) })
        .sort({ priority: 1 })   
        .exec();
  }
}
