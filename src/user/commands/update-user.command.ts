export class UpdateUserCommand {
    constructor(
      public readonly id: string,
      public readonly username: string,
      public readonly password: string,
    ) {}
  }
  