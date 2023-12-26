import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampginModule } from './campgin/campgin.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './auth/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mina',
      database: 'camp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CampginModule,
    UserModule,
    JwtAuthModule
  ],
})
export class AppModule {}