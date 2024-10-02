import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
 
import { TodoListRepository } from '../repositories/todo-list.repository';
 
import { GetTodoListByIdQuery } from '../queries/get-todo-list-by-id.query';
import {TodoList} from "../../schemas/todolist.schema";

@QueryHandler(GetTodoListByIdQuery)
export class GetTodoListByIdHandler implements IQueryHandler<GetTodoListByIdQuery> {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(query: GetTodoListByIdQuery): Promise<TodoList> {
    const { todoListId } = query;
    return this.todoListRepository.findOne(todoListId);
  }
}
