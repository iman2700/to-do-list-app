import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTodoItemsForTodoListQuery } from '../queries/get-all-todo-items-for-todo-list.query';
import { TodoItemRepository } from '../repositories/todo-item.repository';
import {TodoItem} from "../../schemas/todoitem.schema";
 

@QueryHandler(GetAllTodoItemsForTodoListQuery)
export class GetAllTodoItemsForTodoListHandler implements IQueryHandler<GetAllTodoItemsForTodoListQuery> {
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(query: GetAllTodoItemsForTodoListQuery): Promise<TodoItem[]> {
    const { todoListId } = query;
    return this.todoItemRepository.getTodoItemsByList(todoListId);
  }
}
