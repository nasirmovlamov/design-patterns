// Observer Design Pattern - Backend Example
// Used for: Event-driven systems, notifications, pub/sub, logging

// Observer Interface
interface Observer {
    update(event: string, data: any): void;
}

// Subject (Observable)
class EventEmitter {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(event: string, data: any): void {
        this.observers.forEach(observer => observer.update(event, data));
    }
}

// Concrete Observers
class EmailNotificationService implements Observer {
    update(event: string, data: any): void {
        if (event === 'user_registered' || event === 'order_placed') {
            console.log(`📧 Email sent to ${data.email}: ${event} notification`);
        }
    }
}

class SMSNotificationService implements Observer {
    update(event: string, data: any): void {
        if (event === 'order_placed') {
            console.log(`📱 SMS sent to ${data.phone}: Order #${data.orderId} confirmed`);
        }
    }
}

class AuditLogger implements Observer {
    update(event: string, data: any): void {
        console.log(`📝 [AUDIT] ${new Date().toISOString()} - Event: ${event}`, data);
    }
}

class AnalyticsService implements Observer {
    update(event: string, data: any): void {
        console.log(`📊 [ANALYTICS] Tracking event: ${event}`, {
            userId: data.userId,
            timestamp: new Date().toISOString()
        });
    }
}

// Backend Service using Observer Pattern
class UserService {
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    registerUser(userData: { email: string; name: string; userId: string }): void {
        // Business logic
        console.log(`User ${userData.name} registered successfully`);
        
        // Notify all observers
        this.eventEmitter.notify('user_registered', userData);
    }
}

class OrderService {
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    placeOrder(orderData: { orderId: string; userId: string; email: string; phone: string; amount: number }): void {
        // Business logic
        console.log(`Order #${orderData.orderId} placed`);
        
        // Notify all observers
        this.eventEmitter.notify('order_placed', orderData);
    }
}

// Usage - Backend setup
function setupBackendServices() {
    const eventEmitter = new EventEmitter();

    // Register observers
    eventEmitter.attach(new EmailNotificationService());
    eventEmitter.attach(new SMSNotificationService());
    eventEmitter.attach(new AuditLogger());
    eventEmitter.attach(new AnalyticsService());

    return { eventEmitter };
}

// Demo
function runObserverDemo() {
    console.log('=== Observer Pattern Demo ===\n');

    const { eventEmitter } = setupBackendServices();

    const userService = new UserService(eventEmitter);
    const orderService = new OrderService(eventEmitter);

    userService.registerUser({
        email: 'user@example.com',
        name: 'John Doe',
        userId: 'user-123'
    });

    console.log('\n---\n');

    orderService.placeOrder({
        orderId: 'order-456',
        userId: 'user-123',
        email: 'user@example.com',
        phone: '+1234567890',
        amount: 99.99
    });
}

runObserverDemo();

/*
Backend Use Cases:
- Event-driven architecture: Microservices communication
- Notifications: Email, SMS, Push notifications
- Logging: Centralized logging systems
- Analytics: Event tracking and metrics
- Caching invalidation: Notify cache when data changes
- Webhooks: Notify external systems of events
*/

