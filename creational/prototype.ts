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

// Example applications of the Prototype pattern:
// - Backend: Cloning database entity objects to avoid fetching and reloading from database repeatedly
// - Backend: Creating template request or response objects (e.g., for microservices that modify a "request" prototype per user)
// - Web: Duplicating DOM components or client-side data objects without re-instantiating entire classes
// - Web: Copying client-side settings, state, or form templates to quickly create similar UI blocks

