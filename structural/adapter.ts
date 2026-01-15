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

// Another example: SOAP to REST Adapter

class SoapApi {
    getResponse(): string {
        return 'SOAP response';
    }
}

class RestApi {
    getResponse(): string {
        return 'REST response';
    }
}

class SoapToRestAdapter extends RestApi {
    private soapApi: SoapApi;
    constructor(soapApi: SoapApi) {
        super();
        this.soapApi = soapApi;
    }
    getResponse(): string {
        // Convert SOAP response to REST format if needed
        const soapResponse = this.soapApi.getResponse();
        // For demonstration, map SOAP to REST (could add mapping logic here)
        return `Adapted to REST: ${soapResponse}`;
    }
}

/*
Example applications of the Adapter pattern:
- Allowing new systems to interact with legacy APIs (e.g., connecting a new RESTful client to an old SOAP backend)
- Enabling interoperability between different data formats (e.g., adapting XML-based data sources to JSON consumers)
- Integrating third-party libraries with incompatible interfaces (e.g., using a third-party logging framework in an app expecting a specific logging interface)
- Adapting hardware interfaces (e.g., using a USB-to-serial adapter for legacy equipment)
- Supporting multiple authentication providers by adapting their responses to a common user model
- Wrapping APIs to comply with required interface contracts in test environments
*/
