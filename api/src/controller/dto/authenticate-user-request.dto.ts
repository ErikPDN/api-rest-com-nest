import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateUserRequestDTO {
  @ApiProperty({
    name: 'email',
    description: 'The email address of the user to be created',
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password for the new user account',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
