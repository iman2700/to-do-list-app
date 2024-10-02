export class UpdateTodoItemCommand {
    constructor(
      public readonly todoItemId: string,
      public readonly title: string,
      public readonly description: string,
      public readonly priority: number,
    ) {}
  }
  