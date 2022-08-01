interface AbstractFactory {
    createCar(options:any): Car
    createBikeFactory(options:any): Bike
}

class CarFactory implements AbstractFactory {
    constructor(){
        
    }
    public createCar(options: any): Car {
        return new Car(options);
    }
}

class BikeFactory extends AbstractFactory {
  public createVehicle(options: any): Vehicle {
    return new Bike(options);
  }
}




class Vehicle {
    public name: string;
    public type: string;
    public engine: string;
    public wheels: string;
    public color: string;
    public constructor(name: string, type: string, engine: string, wheels: string, color: string) {
        this.name = name;
        this.type = type;
        this.engine = engine;
        this.wheels = wheels;
        this.color = color;
    }
}


class Car extends Vehicle {
    public constructor(options: any) {
        super(options.name, options.type, options.engine, options.wheels, options.color);
    }
}

class Bike extends Vehicle {
    public constructor(options: any) {
        super(options.name, options.type, options.engine, options.wheels, options.color);
    }
}

const carFactory = AbstractFactory.createFactory("car");

const car = carFactory.createVehicle({
    name: "BMW",
    type: "sedan",
    engine: "V8",
    wheels: "4",
    color: "red"
});

const bikeFactory = AbstractFactory.createFactory("bike");
const bike = bikeFactory.createVehicle({
    name: "Yamaha",
    type: "scooter",
    engine: "V2",
    wheels: "2",
    color: "blue"
});