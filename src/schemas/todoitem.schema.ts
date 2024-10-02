import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true, default: 1 })   
    priority: number;

    @Prop({ type: Types.ObjectId, ref: 'TodoList', required: true })   
    todoListId: Types.ObjectId;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);