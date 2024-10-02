//npm run test:e2e
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
            .send({ userId: '66fba9f1842063133e3bd5c8', title: 'New Todo List' })
            .expect(201)   
            .then(response => {
                expect(response.body).toHaveProperty('_id');  
                expect(response.body.title).toBe('New Todo List');
            });
    });

    it('/todo-lists/update/:id (PUT)', () => {
        return request(app.getHttpServer())
            .put('/todo-lists/update/66fd65d267570f0d5923be77')
            .send({ title: 'Updated Todo List', todoListId: '66fd65d267570f0d5923be77' })
            .expect(200)   
            .then(response => {
                expect(response.body.title).toBe('Updated Todo List');
            });
    });

    it('/todo-lists/:userId (GET)', () => {
        return request(app.getHttpServer())
            .get('/todo-lists/66fba9f1842063133e3bd5c8')
            .expect(200)   
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true);   
            });
    });

    it('/todo-lists/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/todo-lists/66fc0c29baf5b5098f943880')
            .expect(200)  // Expecting successful deletion
            .then(response => {
                expect(response.body).toEqual({});  
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
