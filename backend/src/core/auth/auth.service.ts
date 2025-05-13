import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';
import { RegisterDto, LoginDto } from './auth.dto';
import { ErrorCode, ErrorMessages } from 'src/config/errors/error-codes';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { email } = registerDto;
    this.logger.info('Registering new user', { email });

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.error('Registration failed: email already exists', { email });
      throw new HttpException(
        {
          errorCode: ErrorCode.UNIQUE_CONSTRAINT_VIOLATION,
          message: `${email} already exists`,
          details: { field: 'email', value: email },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.userModel.create({
        ...registerDto,
        role: 'USER',
      });
      this.logger.debug('User registered', { userId: user._id });

      const payload = { sub: user._id };
      const token = this.jwtService.sign(payload);
      this.logger.debug('Token generated for user', { userId: user._id });

      return { token };
    } catch (error) {
      this.logger.error('Failed to register user', {
        error: error.message,
        stack: error.stack,
        email,
      });
      throw new HttpException(
        {
          errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
          message: ErrorMessages[ErrorCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    this.logger.info('User login attempt', { email });

    const user = await this.userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      this.logger.warn('Login failed: invalid credentials', { email });
      throw new HttpException(
        {
          errorCode: ErrorCode.INVALID_CREDENTIALS,
          message: ErrorMessages[ErrorCode.INVALID_CREDENTIALS],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    this.logger.debug('User logged in, token generated', { userId: user._id });

    return { token };
  }

  async validateUser(userId: string): Promise<UserDocument | null> {
    this.logger.debug('Validating user', { userId });
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      this.logger.warn('User not found during validation', { userId });
    } else {
      this.logger.debug('User validated', { userId });
    }
    return user;
  }
}
