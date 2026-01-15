// Command Design Pattern - Backend Example
// Used for: CQRS, task queues, undo/redo, request queuing, job processing

// Command Interface
interface Command {
    execute(): Promise<void>;
    undo?(): Promise<void>;
}

// Concrete Commands
class CreateUserCommand implements Command {
    constructor(
        private userService: UserService,
        private userData: { email: string; name: string }
    ) {}

    async execute(): Promise<void> {
        console.log(`Creating user: ${this.userData.email}`);
        await this.userService.createUser(this.userData);
    }

    async undo(): Promise<void> {
        console.log(`Rolling back user creation: ${this.userData.email}`);
        await this.userService.deleteUser(this.userData.email);
    }
}

class UpdateUserCommand implements Command {
    private previousData: any;

    constructor(
        private userService: UserService,
        private email: string,
        private newData: { name?: string }
    ) {}

    async execute(): Promise<void> {
        this.previousData = await this.userService.getUser(this.email);
        console.log(`Updating user: ${this.email}`);
        await this.userService.updateUser(this.email, this.newData);
    }

    async undo(): Promise<void> {
        if (this.previousData) {
            console.log(`Rolling back user update: ${this.email}`);
            await this.userService.updateUser(this.email, this.previousData);
        }
    }
}

class DeleteUserCommand implements Command {
    private deletedUser: any;

    constructor(
        private userService: UserService,
        private email: string
    ) {}

    async execute(): Promise<void> {
        this.deletedUser = await this.userService.getUser(this.email);
        console.log(`Deleting user: ${this.email}`);
        await this.userService.deleteUser(this.email);
    }

    async undo(): Promise<void> {
        if (this.deletedUser) {
            console.log(`Restoring user: ${this.email}`);
            await this.userService.createUser(this.deletedUser);
        }
    }
}

// Invoker - Command Queue/Processor
class CommandQueue {
    private commands: Command[] = [];
    private history: Command[] = [];

    async addCommand(command: Command): Promise<void> {
        this.commands.push(command);
    }

    async processQueue(): Promise<void> {
        while (this.commands.length > 0) {
            const command = this.commands.shift()!;
            try {
                await command.execute();
                this.history.push(command);
            } catch (error) {
                console.error('Command failed:', error);
                // Could implement retry logic here
            }
        }
    }

    async undoLast(): Promise<void> {
        const command = this.history.pop();
        if (command && command.undo) {
            await command.undo();
        }
    }
}

// Mock User Service
class UserService {
    private users: Map<string, any> = new Map();

    async createUser(userData: { email: string; name: string }): Promise<void> {
        this.users.set(userData.email, userData);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    async getUser(email: string): Promise<any> {
        return this.users.get(email);
    }

    async updateUser(email: string, data: any): Promise<void> {
        const user = this.users.get(email);
        if (user) {
            this.users.set(email, { ...user, ...data });
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    async deleteUser(email: string): Promise<void> {
        this.users.delete(email);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Usage - Backend API with Command Pattern
async function runCommandDemo() {
    console.log('=== Command Pattern Demo ===\n');

    const userService = new UserService();
    const commandQueue = new CommandQueue();

    // Queue multiple commands
    await commandQueue.addCommand(
        new CreateUserCommand(userService, { email: 'john@example.com', name: 'John Doe' })
    );
    await commandQueue.addCommand(
        new UpdateUserCommand(userService, 'john@example.com', { name: 'John Smith' })
    );
    await commandQueue.addCommand(
        new CreateUserCommand(userService, { email: 'jane@example.com', name: 'Jane Doe' })
    );

    // Process all commands
    console.log('Processing command queue...\n');
    await commandQueue.processQueue();

    console.log('\n--- Undo last command ---\n');
    await commandQueue.undoLast();
}

runCommandDemo();

/*
Backend Use Cases:
- CQRS (Command Query Responsibility Segregation): Separate write and read operations
- Task queues: Background job processing (Bull, RabbitMQ)
- Undo/Redo: Database transactions, document editing
- Request queuing: Rate limiting, request batching
- Job scheduling: Cron jobs, delayed tasks
- API request handling: Wrapping HTTP requests as commands
*/

