import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CampginService } from './campgin.service';
import { CreateCampaignDto } from './dto/create-campgin.dto';
import { UpdateCampginDto } from './dto/update-campgin.dto';

@Controller('campgin')
export class CampginController {
  constructor(private readonly campginService: CampginService) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campginService.create(createCampaignDto);
  }

  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
    @Query('filter') filter: string,
    @Query('search') search: string,
  ) {
    return this.campginService.findAll(limit, page, sortBy, sortOrder, filter, search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampginDto: UpdateCampginDto) {
    return this.campginService.update(+id, updateCampginDto);
  }

  @Get('all')
  async findAllWithoutPagination() {
    return await this.campginService.findAllWithoutPagination();
  }

  @Get(':id')

  async findOne(@Param('id') id: number) {
    return await this.campginService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campginService.remove(+id);
  }
}
