// Strategy Design Pattern - Backend Example
// Used for: Payment processing, validation, authentication, data transformation

// Strategy Interface
interface PaymentStrategy {
    processPayment(amount: number): Promise<PaymentResult>;
}

// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
    async processPayment(amount: number): Promise<PaymentResult> {
        console.log(`Processing $${amount} via Credit Card...`);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        return { success: true, method: 'Credit Card', amount };
    }
}

class PayPalPayment implements PaymentStrategy {
    async processPayment(amount: number): Promise<PaymentResult> {
        console.log(`Processing $${amount} via PayPal...`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return { success: true, method: 'PayPal', amount };
    }
}

class CryptoPayment implements PaymentStrategy {
    async processPayment(amount: number): Promise<PaymentResult> {
        console.log(`Processing $${amount} via Cryptocurrency...`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return { success: true, method: 'Crypto', amount };
    }
}

// Context - Payment Service
class PaymentService {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    async executePayment(amount: number): Promise<PaymentResult> {
        return await this.strategy.processPayment(amount);
    }
}

// Types
interface PaymentResult {
    success: boolean;
    method: string;
    amount: number;
}

// Usage - Backend API endpoint simulation
async function processUserPayment(paymentMethod: string, amount: number) {
    let strategy: PaymentStrategy;

    // Strategy selection based on user input
    switch (paymentMethod) {
        case 'credit_card':
            strategy = new CreditCardPayment();
            break;
        case 'paypal':
            strategy = new PayPalPayment();
            break;
        case 'crypto':
            strategy = new CryptoPayment();
            break;
        default:
            throw new Error('Invalid payment method');
    }

    const paymentService = new PaymentService(strategy);
    return await paymentService.executePayment(amount);
}

// Demo
async function runStrategyDemo() {
    console.log('=== Strategy Pattern Demo ===\n');
    
    await processUserPayment('credit_card', 100);
    await processUserPayment('paypal', 50);
    await processUserPayment('crypto', 200);
}

runStrategyDemo();

/*
Backend Use Cases:
- Payment processing: Different payment gateways (Stripe, PayPal, Square)
- Validation: Different validation rules for different data types
- Authentication: OAuth, JWT, API keys
- Data serialization: JSON, XML, Protocol Buffers
- Caching strategies: Redis, Memcached, In-memory
*/

