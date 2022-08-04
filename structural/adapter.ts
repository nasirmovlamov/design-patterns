// Adapter Design Pattern Example

interface IIphone {
    useLightning(): string;
}

interface IAndroid {
    useMicroUsb(): string;
}

class Iphone12 implements IIphone {
    useLightning(): string {
        return 'Lightning is enabled';
    }
}

class GooglePixel implements IAndroid {
    useMicroUsb(): string {
        return 'Micro USB is enabled';
    }
}

// Adapter Pattern - Adapts iPhone to work with Android charger
class LightningToMicroUsbAdapter implements IAndroid {
    private iphone: IIphone;

    constructor(iphone: IIphone) {
        this.iphone = iphone;
    }

    useMicroUsb(): string {
        return this.iphone.useLightning();
    }
}

// Example Usage:
const iphone = new Iphone12();
const android = new GooglePixel();

// iPhone uses Lightning
console.log(iphone.useLightning());

// Android uses Micro USB
console.log(android.useMicroUsb());

// Adapter allows iPhone to work with Micro USB charger
const adapter = new LightningToMicroUsbAdapter(iphone);
console.log(adapter.useMicroUsb()); // Uses Lightning internally but exposes Micro USB interface
