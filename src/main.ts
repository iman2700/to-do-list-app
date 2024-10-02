import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('Todo List API')
      .setDescription('API documentation for the Todo List')
      .setVersion('1.0')
      .addTag('todos')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'todo_queue',
      queueOptions: {
        durable: true  // Changed to true
      },
     
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
