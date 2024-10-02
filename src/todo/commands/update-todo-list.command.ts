export class UpdateTodoListCommand {
    constructor(
      public readonly todoListId: string,
      public readonly title: string,
      public readonly todoItems: string,
    ) {}
  }
  