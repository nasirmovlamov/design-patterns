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
