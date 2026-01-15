
class Wall {
  constructor() {
    console.log('Wall built');
  }
}
class Roof {
  constructor() {
    console.log('Roof built');
  }
}
class Door {
  constructor() {
    console.log('Door built');
  }
}
class homeWindow {
  constructor() {
    console.log('Window built');
  }
}


class Home {
  public wall?: Wall;
  public roof?: Roof;
  public door?: Door;
  public homeWindow?: homeWindow;
  constructor() {
    
  }
}
class HomeBuilder {
  private home: Home;

  constructor() {
    this.home = new Home();
  }

  public buildWall(): HomeBuilder {
    this.home.wall = new Wall();
    return this;
  }

  public buildRoof(): HomeBuilder {
    this.home.roof = new Roof();
    return this;
  }

  public buildDoor(): HomeBuilder {
    this.home.door = new Door();
    return this;
  }

  public buildWindow(): HomeBuilder {
    this.home.homeWindow = new homeWindow();
    return this;
  }

  public build(): Home {
    return this.home;
  }
}





const newHome = new HomeBuilder();
newHome.buildWall().buildDoor().build();


// The Builder pattern can be used in various types of applications, including:
// - GUI builders (for building complex UI elements step by step)
// - Game development (for constructing complex game objects, levels, or assets)
// - Document and report generation (for assembling documents with lots of optional sections or components)
// - Configuration or setup wizards (where the setup process can have many steps and optional parts)
// - Construction/architecture software (modeling homes, vehicles, or other structures as shown in the example above)
// - Serialization/deserialization frameworks (for building objects from data in a flexible, stepwise manner)
// - Data processing pipelines (where different steps are composed to process data objects)
// - In general, any app that needs to build complex objects in a controlled, step-by-step, and/or customizable way may benefit from using the Builder pattern.
