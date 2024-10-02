import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { TodoItem, TodoItemSchema } from './todoitem.schema';
import mongoose from "mongoose";  
export type TodoListDocument = TodoList & Document;
@Schema()  
export class TodoList   {


    @Prop({ type: Types.ObjectId, ref: 'User', required: true })  
    userId: Types.ObjectId;
    
    @Prop({ required: true })  
    title: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoItem' }] })   
    todoItems: Types.ObjectId[];

}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
