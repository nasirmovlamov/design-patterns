enum CarType {
    Sedan,
    Coupe,
    SUV,
}

enum LocationType {
    Europe,
    USA,
    Japan,
}

abstract class AbstractCar {
    private type: CarType;
    private model: string;
    private location:LocationType

    constructor(type: CarType, model: string, location:LocationType) {
        this.type = type;
        this.model = model;
        this.location = location;
    }

    public getType(): CarType {
        return this.type;
    }

    public getModel(): string {
        return this.model;
    }

    public getLocation():LocationType{
        return this.location;
    }
    
    public setType(type: CarType): void {
        this.type = type;
    }

    public setModel(model: string): void {
        this.model = model;
    }

    public setLocation(location:LocationType):void{
        this.location = location;
    }
    
    public toString(): string{
        return `${this.getType()} ${this.getModel()}`;
    }
}

class Sedan extends AbstractCar {
    constructor(model: string, location:LocationType) {
        super(CarType.Sedan, model, location);
    }
}

class Coupe extends AbstractCar {
    constructor(model: string, location:LocationType) {
        super(CarType.Coupe, model, location);
    }
}

class SUV extends AbstractCar {
    constructor(model: string, location:LocationType) {
        super(CarType.SUV, model, location);
    }
}


class AbstractFactory {
    public location: LocationType;
    constructor(location: LocationType) {
        this.location = location;
    }
    createCar(type:CarType): (AbstractCar | null) {
        if (this.location === LocationType.USA) {
            return new USAFactory().buildCar(type)
        }
        else if(this.location === LocationType.Japan){
            return new JapanFactory().buildCar(type)
        }
        else if(this.location === LocationType.Europe){
            return new EuropeFactory().buildCar(type)
        }
        else{
            console.log("there is not such location");
            return null
        }
    }
}

class USAFactory {
    constructor(){
    }

    buildCar(model:CarType):AbstractCar|null {
        if(model === CarType.Sedan){
            return new Sedan('BMW',LocationType.USA);
        }
        else if(model === CarType.Coupe){
            return new Coupe('BMW',LocationType.USA);
        }
        else if(model === CarType.SUV){
            return new SUV('BMW',LocationType.USA);
        }else{
            return null
        }
    }

    
}


class EuropeFactory {
    constructor(){
    }

    buildCar(model:CarType): AbstractCar | null  {
        if(model === CarType.Sedan){
            return new Sedan('BMW',LocationType.Europe);
        }
        else if(model === CarType.Coupe){
            return new Coupe('BMW',LocationType.Europe);
        }
        else if(model === CarType.SUV){
            return new SUV('BMW',LocationType.Europe);
        }else{
            return null
        }
    }
}


class JapanFactory {
    constructor(){

    }

    buildCar(model:CarType): AbstractCar | null {
        if(model === CarType.Sedan){
            return new Sedan('BMW',LocationType.Japan);
        }
        else if(model === CarType.Coupe){
            return new Coupe('BMW',LocationType.Japan);
        }
        else if(model === CarType.SUV){
            return new SUV('BMW',LocationType.Japan);
        }else{
            return null
        }
    }
}

const product = new AbstractFactory(LocationType.Europe).createCar(CarType.SUV);


// Example applications of the Abstract Factory pattern:
// - Cross-platform UI libraries (creating Windows, Mac, Linux widgets/factories)
// - Vehicle manufacturing: building cars/trucks for different regions with local features
// - Database driver factories (producing connections/commands for different DB engines)
// - Theme engines (producing themed UI components via factories for each theme)
// - Game development: creating sets of related objects (e.g., units/buildings) for different factions or races
// - Internationalization: producing localized versions of UI components for different languages
// - In web applications: creating different versions of UI components for different devices and screen sizes
