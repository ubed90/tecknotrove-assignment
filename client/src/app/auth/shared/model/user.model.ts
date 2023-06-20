export class User {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public tokenId: string,
    public expiryDate: Date
  ) {}

  get token() {
    if (!this.expiryDate || new Date() > this.expiryDate) {
      return null;
    }
    return this.tokenId;
  }

  get isAuthenticated() {
    if (!this.expiryDate || new Date() > this.expiryDate) {
      return false;
    }
    return true;
  } 
}
