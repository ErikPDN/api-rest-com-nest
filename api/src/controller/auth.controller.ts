export class AuthController {
  public async login() {
    return {
      token: 'sample-jwt-token',
    };
  }
}
