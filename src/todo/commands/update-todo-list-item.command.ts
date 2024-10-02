export class UpdateTodoListItemCommand {
    constructor(
      public readonly todoListId: string,
      public readonly todoItemId: string,
    ) {}
  }
  