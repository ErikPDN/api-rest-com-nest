import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDTO {
  @ApiProperty({
    description: 'The email address of the user to be created',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The password for the new user account',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: 'The username for the new user account',
    example: 'johndoe',
  })
  @IsNotEmpty()
  public username: string;
}
