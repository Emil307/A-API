import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PostsModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    CacheModule.register({ isGlobal: true, ttl: 60 * 1000 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
