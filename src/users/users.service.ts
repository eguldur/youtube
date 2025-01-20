import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: string[] = [];

  getUsers() {
    return this.users;
  }

  getUser(index: string) {
    return this.users[index];
  }

  createUser(username: string) {
    this.users.push(username);
    return 'Kullanıcı oluşturuldu';
  }

  updateUser(index: string, username: string) {
    this.users[index] = username;
    return 'Kullanıcı güncellendi';
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    return 'Kullanıcı silindi';
  }
}
