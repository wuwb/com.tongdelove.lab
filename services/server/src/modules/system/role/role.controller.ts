import {
  Controller,
  UseGuards,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '@/common/guards/auth.guard'
import { RoleService } from './services/role.service'
import { CreateRoleDto } from './dto/create.role.dto'
import { UpdateRoleDto } from './dto/update.role.dto'
import { RoleResDto, RoleListResDto } from './dto/role.res.dto'
import { RoleReqDto } from './dto/role.req.dto'
import { ApiAuth } from '@/common/decorators/api.auth'

@ApiTags('system/role')
@ApiBearerAuth()
@Controller(`api/system/role`)
export class RoleController {
  private readonly logger = new Logger(RoleController.name)

  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '查询角色列表',
    description: '查询角色',
    externalDocs: {
      url: 'xx?page=10&limit=1&name=x&status=0',
    },
  })
  @ApiCreatedResponse({
    type: RoleResDto,
    isArray: true,
    description: '分页查询角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findRoles(@Query() roleReqDto: RoleReqDto) {
    this.logger.debug(JSON.stringify(roleReqDto))
    return this.roleService.findRoles(roleReqDto)
  }

  @ApiOperation({
    summary: '创建角色',
    description: '创建角色',
  })
  @ApiCreatedResponse({
    type: String,
    description: '创建角色返回值',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto)
  }

  @ApiOperation({ summary: '删除角色', description: '根据角色id删除角色' })
  @ApiCreatedResponse({
    type: String,
    description: '删除角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyRoleById(@Param('id') id: string) {
    return this.roleService.destroyRoleById(id)
  }

  @ApiOperation({ summary: '修改角色', description: '根据角色id修改角色' })
  @ApiCreatedResponse({
    type: String,
    description: '修改角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyRoleById(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.roleService.modifyRoleById(id, updateRoleDto)
  }

  @ApiOperation({ summary: '查询角色', description: '根据角色id查询角色' })
  @ApiCreatedResponse({
    type: RoleResDto,
    description: '查询单条角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async roleById(@Param('id') id: string) {
    return this.roleService.roleById(id)
  }
}
