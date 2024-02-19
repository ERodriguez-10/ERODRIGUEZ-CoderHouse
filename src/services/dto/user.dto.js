export default class UserDto {
  constructor(user, avatar) {
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.avatar = avatar;
    this.registerWith = user.registerWith;
    this.role = user.role;
  }
}
