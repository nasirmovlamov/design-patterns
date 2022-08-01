class CustomerPrototype {
    constructor(public proto:any){
        this.proto = proto;
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
    console.log(proto);
    console.log(prototype);
}

run()