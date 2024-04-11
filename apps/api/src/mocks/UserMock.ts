export class UserMock {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;

  constructor(id: string, name: string, nickname: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }
}
