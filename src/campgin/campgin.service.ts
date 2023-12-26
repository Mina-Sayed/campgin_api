import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campgin.dto';
import { UpdateCampginDto } from './dto/update-campgin.dto';
import { Campaign } from './entities/campgin.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; // Import the InjectRepository decorator

@Injectable()
export class CampginService {

  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}
  async create(createCampaignDto: CreateCampaignDto, userId: number) {
    const campaign = new Campaign();
    // Set the properties of the campaign from the DTO
    campaign.userId = userId;
    return this.campaignRepository.save(campaign);
  }
  async findAll(
    limit: number,
    page: number,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
    filter: string,
    search: string,
  ) {
    try {
      // Validate input parameters
      if (isNaN(limit) || isNaN(page) || !['ASC', 'DESC'].includes(sortOrder)) {
        throw new BadRequestException('Invalid input parameters');
      }

      const queryBuilder = this.campaignRepository.createQueryBuilder('campaign');

      // Sorting
      if (sortBy) {
        queryBuilder.orderBy(`campaign.${sortBy}`, sortOrder);
      }

      // Pagination
      queryBuilder.take(limit).skip((page - 1) * limit);

      // Filtering
      if (filter) {
        queryBuilder.andWhere(
          'campaign.name LIKE :filter OR campaign.channel LIKE :filter OR campaign.status LIKE :filter',
          { filter: `%${filter}%` },
        );
      }

      // Search
      if (search) {
        queryBuilder.andWhere(
          'campaign.name LIKE :search OR campaign.channel LIKE :search OR campaign.status LIKE :search',
          { search: `%${search}%` },
        );
      }

      return queryBuilder.getMany();
    } catch (error) {
      // Handle the error appropriately (e.g., log it or rethrow a custom exception)
      console.error(error);
      throw new InternalServerErrorException('Error processing the request');
    }
  }

  // find all without pagination
  async findAllWithoutPagination() {
    return this.campaignRepository.find();
  }


  async findOne(id: number, userId: number) {
    return this.campaignRepository.findOne({ where: { id, userId } });
  }
  
  

  // find one by id
  async update(id: number, updateCampginDto: UpdateCampginDto) {
    const { userId, ...rest } = updateCampginDto;
    const updatedCampaign = { userId: Number(userId), ...rest };
    return this.campaignRepository.update(id, updatedCampaign);
  }

  async remove(id: number) {
    return this.campaignRepository.delete(id);
  }
}
