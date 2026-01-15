// Bridge Design Pattern Example

// Abstraction
class RemoteControl {
    // 🔗 BRIDGE: This property holds the reference to the implementor (the bridge connection)
    protected device: DeviceImplementor;

    // 🔗 BRIDGE: Constructor establishes the bridge by accepting an implementor
    constructor(device: DeviceImplementor) {
        this.device = device; // Bridge is created here
    }

    togglePower(): void {
        // 🔗 BRIDGE: Using the bridge to call implementor methods
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeUp(): void {
        // 🔗 BRIDGE: Delegating to implementor through the bridge
        this.device.setVolume(this.device.getVolume() + 10);
    }

    volumeDown(): void {
        // 🔗 BRIDGE: Delegating to implementor through the bridge
        this.device.setVolume(this.device.getVolume() - 10);
    }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        // 🔗 BRIDGE: Using the inherited bridge to access implementor
        this.device.setVolume(0);
    }
}

// 🔗 BRIDGE INTERFACE: This interface IS the bridge - it defines the contract
// that connects the abstraction (RemoteControl) to implementations (TV, Radio)
interface DeviceImplementor {
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
}

// Concrete Implementors
class TV implements DeviceImplementor {
    private on: boolean = false;
    private volume: number = 20;

    enable(): void {
        this.on = true;
        console.log("TV is turned ON");
    }

    disable(): void {
        this.on = false;
        console.log("TV is turned OFF");
    }

    isEnabled(): boolean {
        return this.on;
    }
    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(100, volume));
        console.log(`TV volume set to ${this.volume}`);
    }
    getVolume(): number {
        return this.volume;
    }
}

class Radio implements DeviceImplementor {
    private on: boolean = false;
    private volume: number = 15;

    enable(): void {
        this.on = true;
        console.log("Radio is ON");
    }

    disable(): void {
        this.on = false;
        console.log("Radio is OFF");
    }

    isEnabled(): boolean {
        return this.on;
    }
    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(100, volume));
        console.log(`Radio volume: ${this.volume}`);
    }
    getVolume(): number {
        return this.volume;
    }
}

// Usage
function runBridgeDemo() {
    const tv = new TV();
    // 🔗 BRIDGE: Creating the bridge connection - passing implementor to abstraction
    const remote = new RemoteControl(tv);

    remote.togglePower(); // TV is turned ON
    remote.volumeUp();    // TV volume set to 30
    remote.volumeDown();  // TV volume set to 20

    const radio = new Radio();
    // 🔗 BRIDGE: Another bridge connection with different implementor
    const advancedRemote = new AdvancedRemoteControl(radio);

    advancedRemote.togglePower(); // Radio is ON
    advancedRemote.volumeUp();    // Radio volume: 25
    advancedRemote.mute();        // Radio volume: 0
}

runBridgeDemo();

/*
Example applications of the Bridge pattern:
- UI frameworks: separating abstractions like GUI windows from platform-dependent rendering APIs.
- Remotes for smart devices: allowing various kinds of remotes to control various kinds of devices.
- Persistence layer: decoupling repository interfaces from their underlying storage implementations (SQL, Mongo, file, etc).
*/
