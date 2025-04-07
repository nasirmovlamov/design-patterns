class User {
  constructor(private name: string) {}

  sayHi() {
    console.log(`Hi, ${this.name}`);
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }
}

// Adapter Pattern
class UserAdapter {
  constructor(private user: User) {}

  getFullName() {
    return `${this.user.getName()}`;
  }
}

// Example Usage:
const user = new User('John Doe');
const userAdapter = new UserAdapter(user);

console.log(userAdapter.getFullName()); // "John Doe"
