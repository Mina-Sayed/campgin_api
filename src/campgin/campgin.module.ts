import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampginService } from './campgin.service';
import { CampginController } from './campgin.controller';
import { Campaign } from './entities/campgin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampginController],
  providers: [CampginService],
})
export class CampginModule {}