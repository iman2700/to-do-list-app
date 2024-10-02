import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
 
 

describe('TodoListController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/todo-lists/create (POST)', () => {
        return request(app.getHttpServer())
            .post('/todo-lists/create')
            .send({ userId: 'userId123', title: 'New Todo List' })
            .expect(201)  // Expecting a successful creation
            .then(response => {
                expect(response.body).toHaveProperty('id'); // Check that response has an ID
                expect(response.body.title).toBe('New Todo List');
            });
    });

    it('/todo-lists/update/:id (PUT)', () => {
        return request(app.getHttpServer())
            .put('/todo-lists/update/todoListId123')
            .send({ title: 'Updated Todo List', todoListId: 'todoListId123' })
            .expect(200)  // Expecting a successful update
            .then(response => {
                expect(response.body.title).toBe('Updated Todo List');
            });
    });

    it('/todo-lists/:userId (GET)', () => {
        return request(app.getHttpServer())
            .get('/todo-lists/userId123')
            .expect(200)  // Expecting a successful retrieval
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true); // Check that the response is an array
            });
    });

    it('/todo-lists/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/todo-lists/todoListId123')
            .expect(200)  // Expecting successful deletion
            .then(response => {
                expect(response.body).toEqual({}); // Depending on your response structure
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
