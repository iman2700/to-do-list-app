import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import {TodoItemCreatedEvent} from "../events/todo-item-created.event";
import {UpdateTodoListItemCommand} from "../commands/update-todo-list-item.command";

@Injectable()
export class CreateTodoSaga {
    @Saga()
    createTodo = (events$: Observable<any>): Observable<any> => {
        return events$.pipe(
            ofType(TodoItemCreatedEvent),
            map((event) => new UpdateTodoListItemCommand(event.todoListId, event.todoItemId))
        );
    }
}