import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Logger,
} from '@nestjs/common';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@root/service/user.service';
import { GetUserStatusResponseDTO } from './dto/get-user-status-response.dto';
import type { AuthenticatedRequest } from '@root/shared/types';
import { Public } from '@root/shared/public.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully.',
    type: CreateUserResponseDTO,
  })
  public async createUser(
    @Body() createUserBody: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const createdUserId = await this.userService.createUser({
      username: createUserBody.username,
      email: createUserBody.email,
      password: createUserBody.password,
    });
    return new CreateUserResponseDTO(createdUserId);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User endpoint is working.',
    type: GetUserStatusResponseDTO,
  })
  public async getStatus(
    @Param('id') userId: string,
  ): Promise<GetUserStatusResponseDTO> {
    const userResponse = await this.userService.getStatus(userId);
    return new GetUserStatusResponseDTO({
      id: userResponse.id,
      username: userResponse.username,
      email: userResponse.email,
      createdAt: userResponse.createdAt,
      updatedAt: userResponse.updatedAt,
    });
  }

  @Get('me')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get current authenticated user.',
    type: GetUserStatusResponseDTO,
  })
  public async getMe(
    @Req() request: AuthenticatedRequest,
  ): Promise<GetUserStatusResponseDTO> {
    return this.getStatus(request.userId);
  }
}
