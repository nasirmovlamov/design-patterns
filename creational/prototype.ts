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
    var proto = new Customer("n/a", "n/a", "pending");
    var prototype = new CustomerPrototype(proto);
    var customer2 = prototype.clone("John");
    customer2.proto.first = "John2";
    console.log(proto);
    console.log(prototype);
    console.log(customer2);
    console.log(proto);
    console.log(prototype);
}

run()