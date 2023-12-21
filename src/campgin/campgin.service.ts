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

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = this.campaignRepository.create(createCampaignDto);
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

  // find one by id
  async findOne(id: number) {
    return this.campaignRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCampginDto: UpdateCampginDto) {
    return this.campaignRepository.update(id, updateCampginDto);
  }

  async remove(id: number) {
    return this.campaignRepository.delete(id);
  }
}
