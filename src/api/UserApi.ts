import type { BinaryLike } from 'node:crypto';
import { hash } from '../helpers/password-helpers';

export default class UserApi {
  server: any;

  local: any;

  constructor(server: any, local: any) {
    this.server = server;
    this.local = local;
  }

  login(email: string, password: BinaryLike) {
    let rt = this.server.login(email, hash(password));
    return rt;
  }

  logout() {
    return this;
  }

  signup(data: { password: BinaryLike }) {
    Object.assign(data, {
      password: hash(data.password),
    });
    return this.server.signup(data);
  }

  password(email: string) {
    return this.server.retrievePassword(email);
  }

  invite(data: any) {
    return this.server.inviteUser(data);
  }

  getInfo() {
    this.server.getBalance();
    return this.server.userInfo();
  }

  getBalance() {
    return this.server.getBalance();
  }

  requestNewToken() {
    return this.server.requestNewToken();
  }

  updateInfo(data: { oldPassword: string; newPassword: string }) {
    const userData = data;
    if (userData.oldPassword && userData.newPassword) {
      userData.oldPassword = hash(userData.oldPassword);
      userData.newPassword = hash(userData.newPassword);
    }

    return this.server.updateUserInfo(userData);
  }

  delete() {
    return this.server.deleteAccount();
  }
}
