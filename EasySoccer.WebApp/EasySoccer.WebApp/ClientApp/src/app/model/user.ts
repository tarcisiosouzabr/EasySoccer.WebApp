export class User {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdFromWeb: boolean;

  constructor(id: string, name: string, phoneNumber: string, email: string) {
    this.id = id;
    this.name = name;
    this.phone = phoneNumber;
    this.email = email;
  }
}
