import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {TodoList, TodoListDocument} from "./todolist.schema";
import * as mongoose from "mongoose";

 
export type UserDocument = User & Document;

@Schema()  
export class User {
    @Prop({ required: true, unique: true })   
    username: string;

    @Prop({ required: true }) 
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoList' }] })   
    todoLists: Types.ObjectId[];
    
    _id:string;
   
    
}

 
export const UserSchema = SchemaFactory.createForClass(User);
