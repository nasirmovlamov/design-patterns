// Step 1: Define the Implementor Interface
interface Device {
  powerOn(): void;
  powerOff(): void;
  setVolume(volume: number): void;
  mute(): void;
}

// Step 2: Concrete Implementations of the Device
class TV implements Device {
  public powerOn(): void {
    console.log('TV is now ON.');
  }
  public powerOff(): void {
    console.log('TV is now OFF.');
  }
  public setVolume(volume: number): void {
    console.log(`TV volume set to ${volume}.`);
  }
  public mute(): void {
    console.log('TV is muted.');
  }
}

class Radio implements Device {
  public powerOn(): void {
    console.log('Radio is now ON.');
  }
  public powerOff(): void {
    console.log('Radio is now OFF.');
  }
  public setVolume(volume: number): void {
    console.log(`Radio volume set to ${volume}.`);
  }
  public mute(): void {
    console.log('Radio is muted.');
  }
}

// Step 3: Define the Abstraction (RemoteControl)
abstract class RemoteControl {
  protected device: Device;  // This is the bridge between abstraction and implementation

  constructor(device: Device) {
    this.device = device;
  }

  abstract turnOn(): void;
  abstract turnOff(): void;
  abstract adjustVolume(volume: number): void;
  abstract toggleMute(): void;
}

// Step 4: Refined Abstraction (AdvancedRemoteControl)
class BasicRemoteControl extends RemoteControl {
  public turnOn(): void {
    this.device.powerOn();
  }
  public turnOff(): void {
    this.device.powerOff();
  }
  public adjustVolume(volume: number): void {
    this.device.setVolume(volume);
  }
  public toggleMute(): void {
    this.device.mute();
  }
}

// Step 5: Client Code (Using the Bridge Pattern)
const tv = new TV();
const radio = new Radio();

// Basic Remote Control for TV
const tvRemote = new BasicRemoteControl(tv);
tvRemote.turnOn();
tvRemote.adjustVolume(20);
tvRemote.toggleMute();

// Basic Remote Control for Radio
const radioRemote = new BasicRemoteControl(radio);
radioRemote.turnOn();
radioRemote.adjustVolume(15);
radioRemote.toggleMute();
