export class Usuario {
  email: string = '';
  password: string = '';

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
