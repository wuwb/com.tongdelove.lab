import { Controller, Get, Param, Post, Delete, Body, Query } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDTO } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(
    private linksService: LinksService,
  ) { }

  @Get()
  async getLinks() {
  }

  @Get(':linkID')
  async getLink(@Param('linkId') linkID) {
  }

  @Post()
  async addBook(@Body() createLinkDTO: CreateLinkDTO) {
  }

  @Delete()
  async deleteBook(@Query() query) {
  }

}
