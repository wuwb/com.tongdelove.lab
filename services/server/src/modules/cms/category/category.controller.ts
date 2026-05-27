import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto, MoveCategoryDto } from './dto/create-categories.dto'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取所有分类（平级列表）' })
  @ApiResponse({ status: 200, description: '返回所有分类列表' })
  async findAll() {
    return this.categoryService.findAll()
  }

  @Get('tree')
  @ApiOperation({ summary: '获取分类树结构' })
  @ApiResponse({ status: 200, description: '返回树形结构的分类数据' })
  async findTree() {
    return this.categoryService.findTree()
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 ID 获取单个分类' })
  @ApiResponse({ status: 200, description: '返回分类详情，包含子分类和父分类' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '分类创建成功' })
  @ApiResponse({ status: 400, description: '父分类不存在' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '分类更新成功' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Patch(':id/move')
  @ApiOperation({ summary: '移动分类到新的父分类' })
  @ApiResponse({ status: 200, description: '分类移动成功' })
  @ApiResponse({ status: 400, description: '不能移动到自身或子分类' })
  async move(@Param('id') id: string, @Body() moveCategoryDto: MoveCategoryDto) {
    return this.categoryService.move(id, moveCategoryDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 204, description: '分类删除成功' })
  @ApiResponse({ status: 400, description: '有子分类需要使用 recursive=true' })
  async remove(@Param('id') id: string, @Query('recursive') recursive?: string) {
    const isRecursive = recursive === 'true'
    return this.categoryService.remove(id, isRecursive)
  }
}
