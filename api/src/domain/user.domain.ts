import { v4 as uuid } from 'uuid';

interface UserProps {
  username: string;
  email: string;
  password: string;
}

type UserCreateInput = Partial<User> & UserProps;

export class User {
  public readonly id: string;
  public readonly username: string;
  public readonly email: string;
  public password: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(init: UserCreateInput) {
    Object.assign(
      this,
      {
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      init,
    );
  }
}
