import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
 
import config from './config/config';
import { DatabaseModule } from './infrastructure/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }), // Global config
    DatabaseModule,  
    TodoModule,
    AuthModule,
    UserModule  
  ],
})
export class AppModule {}
