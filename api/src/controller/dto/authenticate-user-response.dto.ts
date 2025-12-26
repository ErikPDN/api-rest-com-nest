import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserResponseDTO {
  @ApiProperty({
    description: 'The authentication token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}
