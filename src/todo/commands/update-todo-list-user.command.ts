export class UpdateTodoListUserCommand {
    constructor(
        public readonly todoListId: string,
        public readonly userId: string,
    ) {}
}
  