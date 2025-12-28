import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { User } from '@root/domain/user.domain';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const {
  LOCAL_DEVELOPMENT = false,
  AWS_REGION = false,
  ENVIROMENT = 'dev',
} = process.env;

const client = new DynamoDBClient({
  region: AWS_REGION ? AWS_REGION : 'us-east-1',
  endpoint: LOCAL_DEVELOPMENT ? 'http://localhost:8000' : undefined,
});

interface UserRecord {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class UserRepository {
  public async createUser(user: User): Promise<void> {
    const command = new PutItemCommand({
      TableName: `${ENVIROMENT}-users`,
      Item: marshall({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
      ConditionExpression: 'attribute_not_exists(id)',
    });
    await client.send(command);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const command = new QueryCommand({
      TableName: `${ENVIROMENT}-users`,
      IndexName: 'email_index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: marshall({ ':email': email }),
    });

    const response = await client.send(command);
    if (response.Items?.length === 0) {
      return undefined;
    }

    const userRecord = unmarshall(response.Items![0]) as UserRecord;
    return this.mapUserFromRecord(userRecord);
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    const command = new GetItemCommand({
      TableName: `${ENVIROMENT}-users`,
      Key: marshall({ id: userId }),
    });

    const response = await client.send(command);
    if (!response.Item) {
      return undefined;
    }

    const userRecord = unmarshall(response.Item) as UserRecord;
    return this.mapUserFromRecord(userRecord);
  }

  private mapUserFromRecord(userRecord: UserRecord): User {
    return new User({
      id: userRecord.id,
      email: userRecord.email,
      password: userRecord.password,
      username: userRecord.username,
      createdAt: new Date(userRecord.createdAt),
      updatedAt: new Date(userRecord.updatedAt),
    });
  }
}
