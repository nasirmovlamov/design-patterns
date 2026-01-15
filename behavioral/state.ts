// State Design Pattern - Backend Example
// Used for: Workflow management, state machines, order processing, user status

// State Interface
interface OrderState {
    process(order: Order): void;
    cancel(order: Order): void;
    ship(order: Order): void;
    deliver(order: Order): void;
}

// Concrete States
class PendingState implements OrderState {
    process(order: Order): void {
        console.log('✅ Processing order...');
        order.setState(new ProcessingState());
    }

    cancel(order: Order): void {
        console.log('❌ Order cancelled');
        order.setState(new CancelledState());
    }

    ship(order: Order): void {
        console.log('⚠️ Cannot ship pending order');
    }

    deliver(order: Order): void {
        console.log('⚠️ Cannot deliver pending order');
    }
}

class ProcessingState implements OrderState {
    process(order: Order): void {
        console.log('⚠️ Order already being processed');
    }

    cancel(order: Order): void {
        console.log('❌ Cancelling order...');
        order.setState(new CancelledState());
    }

    ship(order: Order): void {
        console.log('📦 Shipping order...');
        order.setState(new ShippedState());
    }

    deliver(order: Order): void {
        console.log('⚠️ Cannot deliver order that hasn\'t been shipped');
    }
}

class ShippedState implements OrderState {
    process(order: Order): void {
        console.log('⚠️ Order already shipped');
    }

    cancel(order: Order): void {
        console.log('⚠️ Cannot cancel shipped order');
    }

    ship(order: Order): void {
        console.log('⚠️ Order already shipped');
    }

    deliver(order: Order): void {
        console.log('🚚 Delivering order...');
        order.setState(new DeliveredState());
    }
}

class DeliveredState implements OrderState {
    process(order: Order): void {
        console.log('⚠️ Order already delivered');
    }

    cancel(order: Order): void {
        console.log('⚠️ Cannot cancel delivered order');
    }

    ship(order: Order): void {
        console.log('⚠️ Order already delivered');
    }

    deliver(order: Order): void {
        console.log('⚠️ Order already delivered');
    }
}

class CancelledState implements OrderState {
    process(order: Order): void {
        console.log('⚠️ Cannot process cancelled order');
    }

    cancel(order: Order): void {
        console.log('⚠️ Order already cancelled');
    }

    ship(order: Order): void {
        console.log('⚠️ Cannot ship cancelled order');
    }

    deliver(order: Order): void {
        console.log('⚠️ Cannot deliver cancelled order');
    }
}

// Context - Order
class Order {
    private state: OrderState;
    public id: string;
    public items: string[];
    public total: number;

    constructor(id: string, items: string[], total: number) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.state = new PendingState();
    }

    setState(state: OrderState): void {
        this.state = state;
    }

    getState(): string {
        return this.state.constructor.name;
    }

    process(): void {
        this.state.process(this);
    }

    cancel(): void {
        this.state.cancel(this);
    }

    ship(): void {
        this.state.ship(this);
    }

    deliver(): void {
        this.state.deliver(this);
    }
}

// Backend Order Service
class OrderService {
    processOrder(order: Order): void {
        console.log(`\n--- Processing Order #${order.id} ---`);
        console.log(`Current state: ${order.getState()}`);
        order.process();
    }

    shipOrder(order: Order): void {
        console.log(`\n--- Shipping Order #${order.id} ---`);
        console.log(`Current state: ${order.getState()}`);
        order.ship();
    }

    deliverOrder(order: Order): void {
        console.log(`\n--- Delivering Order #${order.id} ---`);
        console.log(`Current state: ${order.getState()}`);
        order.deliver();
    }

    cancelOrder(order: Order): void {
        console.log(`\n--- Cancelling Order #${order.id} ---`);
        console.log(`Current state: ${order.getState()}`);
        order.cancel();
    }
}

// Demo
function runStateDemo() {
    console.log('=== State Pattern Demo ===\n');

    const orderService = new OrderService();
    const order = new Order('ORD-001', ['Laptop', 'Mouse'], 1299.99);

    // Normal flow
    orderService.processOrder(order);
    orderService.shipOrder(order);
    orderService.deliverOrder(order);

    // Try invalid operations
    console.log('\n--- Attempting invalid operations ---');
    order.process();
    order.cancel();

    // Cancelled order flow
    console.log('\n--- New Order (Cancelled) ---');
    const cancelledOrder = new Order('ORD-002', ['Keyboard'], 99.99);
    orderService.processOrder(cancelledOrder);
    orderService.cancelOrder(cancelledOrder);
    orderService.shipOrder(cancelledOrder); // Should fail
}

runStateDemo();

/*
Backend Use Cases:
- Order processing: Pending -> Processing -> Shipped -> Delivered
- User account status: Active -> Suspended -> Banned
- Payment processing: Pending -> Processing -> Completed -> Failed
- Document workflow: Draft -> Review -> Approved -> Published
- Job processing: Queued -> Running -> Completed -> Failed
- Subscription states: Trial -> Active -> Cancelled -> Expired
*/

