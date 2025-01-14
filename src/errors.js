export class AccessTokenExpired extends Error {
  constructor() {
    super("AccessTokenExpired");
    this.name = "AccessTokenExpired";
  }
}
