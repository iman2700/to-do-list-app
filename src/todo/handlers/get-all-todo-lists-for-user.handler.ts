import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTodoListsForUserQuery } from '../queries/get-all-todo-lists-for-user.query';
import { TodoListRepository } from '../repositories/todo-list.repository';
import {TodoList} from "../../schemas/todolist.schema";
@QueryHandler(GetAllTodoListsForUserQuery)
export class GetAllTodoListsForUserHandler implements IQueryHandler<GetAllTodoListsForUserQuery> {
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async execute(query: GetAllTodoListsForUserQuery): Promise<TodoList[]> {
    const { userId } = query;
    return this.todoListRepository.findByUserId(userId);
  }
}
