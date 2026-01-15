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
    public object:User
    constructor() {
        this.object = new User("");
    }
    
    fullName = (): string => {
      return this.object.name;
    }
    
    createUser(name: string): Factory {
        this.object = new User(name);
        return this;
    }
    
    createAdmin(name: string): Factory {
        this.object = new Admin(name);
        return this;
    }
}

const user = new Factory().createUser('John').fullName();
const admin = new Factory().createAdmin('Alovset').fullName();

// Example applications of the Factory pattern:
// - Object creation: creating different types of objects (e.g., users, admins, products) 
// - Object pooling: reusing objects instead of creating new ones (e.g., database connections, file handles)
// - Dependency injection: injecting objects into classes instead of creating them directly (e.g., services, repositories)
