import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campgin.dto';

export class UpdateCampginDto extends PartialType(CreateCampaignDto) {}
