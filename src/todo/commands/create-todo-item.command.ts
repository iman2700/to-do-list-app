export class CreateTodoItemCommand {
    constructor(
      public readonly title: string,
      public readonly description: string,
      public readonly priority: number,
      public readonly todoListId: string,
    ) {}
  }
  