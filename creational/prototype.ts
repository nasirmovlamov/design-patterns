class CustomerPrototype {
    constructor(public proto:any){
        this.proto = proto;
    }
    clone(name:string):CustomerPrototype {
        return new CustomerPrototype(Object.assign({}, this.proto, {name:name}));
    }
}

class Customer {
    constructor(public first: string, public last: string, public status: string) {
        this.first = first;
        this.last = last;
        this.status = status;
    }
    
    say(): string {
        console.log(`${this.first} ${this.last} is ${this.status}`);
        return `${this.first} ${this.last} is ${this.status}`;
    }
}

function run() {
    var protoCustomer = new Customer("n/a", "n/a", "pending");
    var newCustomer = new CustomerPrototype(protoCustomer).clone("John");
    console.log(newCustomer.proto);
    console.log(newCustomer);
}

run()