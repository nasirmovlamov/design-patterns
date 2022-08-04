
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
