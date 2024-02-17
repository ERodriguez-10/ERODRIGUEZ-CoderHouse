export default class UserDto {
  constructor(user) {
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.password = user.password;
    this.cart = user.cart;
    this.registerWith = user.registerWith;
    this.role = user.role;
    this.githubId = user.github_id;
    this.googleId = user.google_id;
  }
}
