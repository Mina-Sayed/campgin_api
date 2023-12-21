import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampginModule } from './campgin/campgin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'viaduct.proxy.rlwy.net',
      port: 49949,
      username: 'postgres',
      password: '4fA5g*26EAbAGe3D6-1DACdf2EDd5a2f',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CampginModule,
  ],
})
export class AppModule {}