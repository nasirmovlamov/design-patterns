// Step 1: Define the subsystems that will be used by the facade

// Subsystem 1: Account Service
class AccountService {
  public login(user: string, password: string): boolean {
    console.log('Logging in with user:', user);
    // Simulate a successful login
    return true;
  }
  public logout(user: string): void {
    console.log('Logging out user:', user);
  }
}

// Subsystem 2: Payment Service
class PaymentService {
  public processPayment(amount: number): boolean {
    console.log(`Processing payment of amount: $${amount}`);
    // Simulate a successful payment
    return true;
  }
}

// Subsystem 3: Notification Service
class NotificationService {
  public sendNotification(message: string): void {
    console.log(`Sending notification: ${message}`);
  }
}

// Step 2: Create the Facade that will simplify interactions with the subsystems

class ECommerceFacade {
  private accountService: AccountService;
  private paymentService: PaymentService;
  private notificationService: NotificationService;

  constructor() {
    this.accountService = new AccountService();
    this.paymentService = new PaymentService();
    this.notificationService = new NotificationService();
  }

  // A simple login, purchase, and logout process bundled in the facade
  public makePurchase(user: string, password: string, amount: number): void {
    if (this.accountService.login(user, password)) {
      console.log('Login successful!');
      if (this.paymentService.processPayment(amount)) {
        console.log('Payment processed successfully.');
        this.notificationService.sendNotification(`Purchase of $${amount} was successful.`);
      }
      this.accountService.logout(user);
      console.log('Logged out.');
    } else {
      console.log('Login failed.');
    }
  }
}

// Step 3: Using the Facade in client code

// Instantiate the facade
const ecommerceFacade = new ECommerceFacade();

// Perform a purchase with all the subsystems abstracted by the facade
ecommerceFacade.makePurchase('john_doe', 'password123', 100);

