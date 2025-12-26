import { ApiProperty } from '@nestjs/swagger';

export class GetUserStatusResponseDTO {
  @ApiProperty({
    description: 'The unique identifier of the created user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  public username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@gmail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2024-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the user was last updated',
    example: '2024-01-01T12:00:00Z',
  })
  public updatedAt: Date;

  constructor(user: GetUserStatusResponseDTO) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
