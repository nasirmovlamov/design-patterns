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


class UserAdapter extends User {
    constructor(name:any) {
        super(name);
    }
    getFullName() {
        return `${this.getName()}`;
    }
}


