class User {
  constructor(public name: string) {
    this.name = name;
  }
}

class Admin extends User {
  constructor(name: string) {
    super(name);
  }
}

class Factory {
    createUser(name: string): User {
        return new User(name);
    }
    createAdmin(name: string): Admin {
        return new Admin(name);
    }
}

const user = new Factory().createUser('John');
const admin = new Factory().createAdmin('John');
