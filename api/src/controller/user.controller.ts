import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateUserResponseDTO } from './dto/CreateUserResponse.dto';
import { CreateUserRequestDTO } from './dto/CreateUserRequest.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@root/service/user.service';
import { GetUserStatusResponseDTO } from './dto/GetUserStatusResponse.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
    return new GetUserStatusResponseDTO(userResponse);
  }
}
