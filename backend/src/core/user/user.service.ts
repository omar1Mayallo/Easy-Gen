import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    this.logger.info('Creating new user', { email: createUserDto.email });
    try {
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      this.logger.debug('User created successfully', { userId: user._id });
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', {
        error: error.message,
        stack: error.stack,
        email: createUserDto.email,
      });
      throw error; // Let the GlobalExceptionFilter handle
    }
  }

  async findAll(): Promise<UserDocument[]> {
    this.logger.info('Fetching all users');
    const users = await this.userModel.find().exec();
    this.logger.debug('Users fetched', { count: users.length });
    return users;
  }

  async findOne(id: string): Promise<UserDocument> {
    this.logger.debug('Fetching user by ID', { userId: id });
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      this.logger.warn('User not found', { userId: id });
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.debug('User fetched', { userId: id });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    this.logger.info('Updating user', { userId: id });
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      this.logger.warn('User not found for update', { userId: id });
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.debug('User updated', { userId: id });
    return existingUser;
  }

  async delete(id: string): Promise<void> {
    this.logger.info('Deleting user', { userId: id });
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      this.logger.warn('User not found for deletion', { userId: id });
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.debug('User deleted', { userId: id });
  }
}
