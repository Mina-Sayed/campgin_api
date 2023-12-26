import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { CampginService } from './campgin.service';
import { CreateCampaignDto } from './dto/create-campgin.dto';
import { UpdateCampginDto } from './dto/update-campgin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Campaign } from './entities/campgin.entity';

@Controller('campgin')
export class CampginController {
  constructor(private readonly campginService: CampginService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCampaignDto: CreateCampaignDto, @Req() req) {
    const userId = req.user.userId;
    return this.campginService.create(createCampaignDto, userId);
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

  async findOne(@Param('id') id: number, @Req() req) {
    return await this.campginService.findOne(+id, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campginService.remove(+id);
  }
}
