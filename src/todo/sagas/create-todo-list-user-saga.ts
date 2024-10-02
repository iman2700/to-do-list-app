import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import {UpdateTodoListUserCommand} from "../commands/update-todo-list-user.command";
import {TodoListCreatedEvent} from "../events/todo-list-created-event";

@Injectable()
export class CreateTodoListUserSaga {
    @Saga()
    createTodo = (events$: Observable<any>): Observable<any> => {
        return events$.pipe(
            ofType(TodoListCreatedEvent),
            map((event) => new UpdateTodoListUserCommand(event.todoListId, event.userId))
        );
    }
}