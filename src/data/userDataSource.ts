import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import User from '../models/user';

export class UserDataSource extends DataSource {
  private users: User[];
  private userLoader: DataLoader<string, User>;

  constructor(users: User[]) {
    super();
    this.users = users;
    this.userLoader = new DataLoader<string, User>(this.batchLoadUsers.bind(this));
  }

  initialize() {
    // Optional: Add any initialization logic here
  }

  async batchLoadUsers(userIds: string[]): Promise<User[]> {
    const filteredUsers = this.users.filter((user) => userIds.includes(user.id));

    // Arrange the users in the same order as the userIds array
    const userMap = filteredUsers.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    return userIds.map((userId) => userMap[userId]);
  }

  async getUser(userId: string): Promise<User> {
   return await this.userLoader.load(userId);
  }
  
  getAllUsers(): User[] {
    return this.users;
  }
}
