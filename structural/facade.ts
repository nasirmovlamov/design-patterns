// Facade Design Pattern - Backend Example
// Used for: API gateways, service orchestration, simplifying complex subsystems

// Complex Subsystem Classes
class AuthenticationService {
    async authenticate(token: string): Promise<{ userId: string; email: string }> {
        console.log('🔐 Authenticating user...');
        // Simulate token validation
        await new Promise(resolve => setTimeout(resolve, 50));
        return { userId: 'user-123', email: 'user@example.com' };
    }
}

class UserService {
    async getUser(userId: string): Promise<any> {
        console.log(`👤 Fetching user ${userId}...`);
        await new Promise(resolve => setTimeout(resolve, 30));
        return { id: userId, name: 'John Doe', email: 'user@example.com' };
    }
}

class OrderService {
    async getUserOrders(userId: string): Promise<any[]> {
        console.log(`📦 Fetching orders for user ${userId}...`);
        await new Promise(resolve => setTimeout(resolve, 40));
        return [
            { id: 'order-1', total: 99.99 },
            { id: 'order-2', total: 149.99 }
        ];
    }
}

class PaymentService {
    async getPaymentHistory(userId: string): Promise<any[]> {
        console.log(`💳 Fetching payment history for user ${userId}...`);
        await new Promise(resolve => setTimeout(resolve, 35));
        return [
            { id: 'payment-1', amount: 99.99, status: 'completed' },
            { id: 'payment-2', amount: 149.99, status: 'completed' }
        ];
    }
}

class NotificationService {
    async sendWelcomeEmail(email: string): Promise<void> {
        console.log(`📧 Sending welcome email to ${email}...`);
        await new Promise(resolve => setTimeout(resolve, 25));
    }
}

// Facade - Simplifies interaction with complex subsystem
class UserProfileFacade {
    private authService: AuthenticationService;
    private userService: UserService;
    private orderService: OrderService;
    private paymentService: PaymentService;
    private notificationService: NotificationService;

    constructor() {
        this.authService = new AuthenticationService();
        this.userService = new UserService();
        this.orderService = new OrderService();
        this.paymentService = new PaymentService();
        this.notificationService = new NotificationService();
    }

    // Simple interface for complex operation
    async getUserProfile(token: string): Promise<UserProfile> {
        // 1. Authenticate
        const auth = await this.authService.authenticate(token);
        
        // 2. Fetch user data
        const user = await this.userService.getUser(auth.userId);
        
        // 3. Fetch related data
        const [orders, payments] = await Promise.all([
            this.orderService.getUserOrders(auth.userId),
            this.paymentService.getPaymentHistory(auth.userId)
        ]);

        return {
            user,
            orders,
            payments,
            summary: {
                totalOrders: orders.length,
                totalSpent: payments.reduce((sum, p) => sum + p.amount, 0)
            }
        };
    }

    async registerNewUser(userData: { email: string; name: string }): Promise<void> {
        // Orchestrate multiple services
        console.log('📝 Registering new user...');
        
        // In real app: create user, send verification, etc.
        await this.notificationService.sendWelcomeEmail(userData.email);
        
        console.log('✅ User registered successfully');
    }
}

// Types
interface UserProfile {
    user: any;
    orders: any[];
    payments: any[];
    summary: {
        totalOrders: number;
        totalSpent: number;
    };
}

// Usage - Backend API endpoint
async function getUserProfileEndpoint(token: string) {
    const facade = new UserProfileFacade();
    return await facade.getUserProfile(token);
}

// Demo
async function runFacadeDemo() {
    console.log('=== Facade Pattern Demo ===\n');

    const facade = new UserProfileFacade();

    console.log('--- Getting User Profile ---\n');
    const profile = await facade.getUserProfile('auth-token-123');
    
    console.log('\n--- Profile Summary ---');
    console.log(JSON.stringify(profile.summary, null, 2));

    console.log('\n--- Registering New User ---\n');
    await facade.registerNewUser({
        email: 'newuser@example.com',
        name: 'New User'
    });
}

runFacadeDemo();

/*
Backend Use Cases:
- API Gateway: Simplifying multiple microservices behind single endpoint
- Service orchestration: Coordinating multiple services for complex operations
- Legacy system integration: Wrapping old systems with modern interface
- Third-party API aggregation: Combining multiple external APIs
- Database access: Simplifying complex database operations
- Authentication flows: OAuth, JWT, session management
*/

