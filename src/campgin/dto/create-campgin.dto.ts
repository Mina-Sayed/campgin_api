// campaign.dto.ts
import { IsString, IsNotEmpty, IsIn, IsDate, IsOptional } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['SMS', 'Wtsapp', 'E-mail'])
  channel: string;

  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Scheduled', 'drafted', 'Sent', 'Failed'])
  status: string;

  @IsString()
  userId: string;
}
