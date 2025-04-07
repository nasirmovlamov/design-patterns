// Step 1: Component Interface
interface Action {
  perform(): void;
}

// Step 2: Concrete Component - User
class User implements Action {
  constructor(private name: string) {}

  perform(): void {
    console.log(`${this.name} performed an action.`);
  }
}

// Step 3: Decorator Class
class ActionDecorator implements Action {
  constructor(private action: Action) {}

  perform(): void {
    this.action.perform(); // Call the original action
  }
}

// Concrete Decorator - Logging
class LoggingDecorator extends ActionDecorator {
  perform(): void {
    console.log('Logging: Action started.');
    super.perform(); // Call the original perform
    console.log('Logging: Action finished.');
  }
}

// Concrete Decorator - Notification
class NotificationDecorator extends ActionDecorator {
  perform(): void {
    super.perform(); // Call the original perform
    console.log('Notification: Action performed successfully!');
  }
}

// Usage

const user = new User("John Doe");

// Applying decorators
const loggedUser = new LoggingDecorator(user);
const notifiedUser = new NotificationDecorator(loggedUser);

// The final decorated object that has both logging and notification behavior
notifiedUser.perform();
