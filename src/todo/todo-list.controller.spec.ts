import { Test, TestingModule } from '@nestjs/testing';
 
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {TodoListController} from "../src/todo/todo-list.controller";
import {CreateTodoListCommand} from "../src/todo/commands/create-todo-list.command";
import {UpdateTodoListCommand} from "../src/todo/commands/update-todo-list.command";
import {DeleteTodoListCommand} from "../src/todo/commands/delete-todo-list.command";
import {GetAllTodoListsForUserQuery} from "../src/todo/queries/get-all-todo-lists-for-user.query";
 

describe('TodoListController', () => {
    let controller: TodoListController;
    let commandBus: CommandBus;
    let queryBus: QueryBus;

    const mockCommandBus = {
        execute: jest.fn(),
    };

    const mockQueryBus = {
        execute: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TodoListController],
            providers: [
                {
                    provide: CommandBus,
                    useValue: mockCommandBus,
                },
                {
                    provide: QueryBus,
                    useValue: mockQueryBus,
                },
            ],
        }).compile();

        controller = module.get<TodoListController>(TodoListController);
        commandBus = module.get<CommandBus>(CommandBus);
        queryBus = module.get<QueryBus>(QueryBus);
    });

    describe('createTodoList', () => {
        it('should create a new Todo List', async () => {
            const createTodoListDto = new CreateTodoListCommand('userId123', 'My Todo List');
            jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(undefined); // Mocking the command execution

            await controller.createTodoList(createTodoListDto);

            expect(commandBus.execute).toHaveBeenCalledWith(createTodoListDto);
        });
    });

    describe('updateTodoList', () => {
        it('should update an existing Todo List', async () => {
            const updateTodoListDto = new UpdateTodoListCommand('todoListId123', 'Updated Title', 'todoListId123');
            jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(undefined);

            await controller.updateTodoList('todoListId123', updateTodoListDto);

            expect(commandBus.execute).toHaveBeenCalledWith(updateTodoListDto);
        });
    });

    describe('deleteTodoList', () => {
        it('should delete a Todo List', async () => {
            jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(undefined);

            await controller.deleteTodoList('todoListId123');

            expect(commandBus.execute).toHaveBeenCalledWith(new DeleteTodoListCommand('todoListId123'));
        });
    });

    describe('getAllTodoLists', () => {
        it('should return all Todo Lists for a user', async () => {
            const todoLists: TodoList[] = []; // Mock response
            jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(todoLists);

            const result = await controller.getAllTodoLists('userId123');

            expect(queryBus.execute).toHaveBeenCalledWith(new GetAllTodoListsForUserQuery('userId123'));
            expect(result).toBe(todoLists);
        });
    });
});
