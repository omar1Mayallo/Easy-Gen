import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { MongoIdPipe } from 'src/config/errors/pipes/mongoId-pipe';
import { AuthGuard } from '../auth/auth.guard';
import { RestrictTo } from '../auth/restrictTo.decorator';
import { RoleEnum } from './user.schema';

@ApiTags('users')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @RestrictTo(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or email already exists',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.info('Create user endpoint called', {
      email: createUserDto.email,
    });
    return this.userService.create(createUserDto);
  }

  @Get()
  @RestrictTo(RoleEnum.ADMIN, RoleEnum.USER)
  @ApiOperation({ summary: 'Get all users (Admin or User)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users',
    type: [CreateUserDto],
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User or Admin role required',
  })
  async findAll() {
    this.logger.info('Get all users endpoint called');
    return this.userService.findAll();
  }

  @Get(':id')
  @RestrictTo(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get a user by ID (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB user ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  async findOne(@Param('id', MongoIdPipe) id: string) {
    this.logger.info('Get user by ID endpoint called', { userId: id });
    return this.userService.findOne(id);
  }

  @Put(':id')
  @RestrictTo(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update a user by ID (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB user ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.info('Update user endpoint called', { userId: id });
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RestrictTo(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user by ID (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB user ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  async remove(@Param('id', MongoIdPipe) id: string) {
    this.logger.info('Delete user endpoint called', { userId: id });
    return this.userService.delete(id);
  }
}
