// The Decorator pattern lets you add new behavior to objects by wrapping them
// in special wrapper objects. Think of it like Russian nesting dolls - each
// decorator wraps around the previous one, adding its own functionality.
//
// HOW IT WORKS:
// 1. You have a base object (like a simple HTTP handler)
// 2. You wrap it with decorators (like adding logging, auth, caching)
// 3. Each decorator can do something BEFORE and/or AFTER calling the wrapped object
// 4. The decorators form a chain: Request → Decorator1 → Decorator2 → Base Handler
//
// REAL-WORLD EXAMPLE:
// Like adding layers to a cake:
// - Base cake = BasicHttpHandler
// - Frosting = LoggingDecorator
// - Sprinkles = CachingDecorator
// - Candles = AuthenticationDecorator
// Each layer adds something, but the cake is still a cake!
//
// ============================================================================

// Types - Custom types to avoid conflicts with built-in Request/Response
interface HttpRequest {
    method: string;
    path: string;
    body?: any;
    headers?: {
        authorization?: string;
        clientId?: string;
    };
}

interface HttpResponse {
    status: number;
    body: any;
}

// STEP 1: Define the interface that both the base object and decorators will implement
interface HttpHandler {
    handle(request: HttpRequest): Promise<HttpResponse>;
}

// STEP 2: Create the BASE object (the simplest version, no decorations)
class BasicHttpHandler implements HttpHandler {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        console.log('🍰 [BASE] Processing request:', request.path);
        // This is the actual work - just return a simple response
        return {
            status: 200,
            body: { message: 'Success', data: request.body }
        };
    }
}

// STEP 3: Create the BASE DECORATOR class
// This is the "wrapper" that all decorators extend
abstract class HttpHandlerDecorator implements HttpHandler {
    // 🔗 DECORATOR: This holds the reference to what we're wrapping
    protected handler: HttpHandler;

    // 🔗 DECORATOR: Constructor receives the handler to wrap
    constructor(handler: HttpHandler) {
        this.handler = handler; // Store what we're wrapping
    }

    // 🔗 DECORATOR: Default behavior - just pass through to the wrapped handler
    async handle(request: HttpRequest): Promise<HttpResponse> {
        return await this.handler.handle(request);
    }
}

// STEP 4: Create CONCRETE DECORATORS (each adds specific functionality)

// Decorator 1: Logging - adds logging BEFORE and AFTER the request
class LoggingDecorator extends HttpHandlerDecorator {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        // 🔗 DECORATOR: Do something BEFORE calling the wrapped handler
        const startTime = Date.now();
        console.log(`📝 [LOG] ${new Date().toISOString()} ${request.method} ${request.path}`);
        
        // 🔗 DECORATOR: Call the wrapped handler (this goes down the chain)
        const response = await super.handle(request);
        
        // 🔗 DECORATOR: Do something AFTER getting the response
        const duration = Date.now() - startTime;
        console.log(`📝 [LOG] Response: ${response.status} (${duration}ms)`);
        
        return response;
    }
}

// Decorator 2: Authentication - checks auth BEFORE allowing the request
class AuthenticationDecorator extends HttpHandlerDecorator {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        // 🔗 DECORATOR: Check authentication FIRST
        if (!request.headers?.authorization) {
            console.log('❌ [AUTH] Unauthorized - blocking request');
            return { status: 401, body: { error: 'Unauthorized' } };
        }
        
        console.log('✅ [AUTH] Authentication passed - continuing...');
        
        // 🔗 DECORATOR: If auth passes, call the wrapped handler
        return await super.handle(request);
    }
}

// Decorator 3: Caching - checks cache BEFORE, stores result AFTER
class CachingDecorator extends HttpHandlerDecorator {
    private cache: Map<string, { response: HttpResponse; timestamp: number }> = new Map();
    private ttl: number = 60000; // 1 minute

    async handle(request: HttpRequest): Promise<HttpResponse> {
        // 🔗 DECORATOR: Check cache BEFORE processing
        const cacheKey = `${request.method}:${request.path}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.ttl) {
            console.log('💾 [CACHE] Serving from cache - skipping handler');
            return cached.response; // Return cached, don't call wrapped handler
        }

        // 🔗 DECORATOR: Cache miss - call the wrapped handler
        const response = await super.handle(request);
        
        // 🔗 DECORATOR: Store in cache AFTER getting response
        this.cache.set(cacheKey, { response, timestamp: Date.now() });
        console.log('💾 [CACHE] Stored in cache');
        
        return response;
    }
}

// Decorator 4: Rate Limiting - checks rate limit BEFORE allowing request
class RateLimitingDecorator extends HttpHandlerDecorator {
    private requests: Map<string, number[]> = new Map();
    private maxRequests: number = 5;
    private windowMs: number = 60000; // 1 minute

    async handle(request: HttpRequest): Promise<HttpResponse> {
        // 🔗 DECORATOR: Check rate limit FIRST
        const clientId = request.headers?.clientId || 'anonymous';
        const now = Date.now();
        
        if (!this.requests.has(clientId)) {
            this.requests.set(clientId, []);
        }

        const clientRequests = this.requests.get(clientId)!;
        const recentRequests = clientRequests.filter(time => now - time < this.windowMs);
        
        if (recentRequests.length >= this.maxRequests) {
            console.log(`⛔ [RATE LIMIT] Blocked - too many requests (${recentRequests.length}/${this.maxRequests})`);
            return { status: 429, body: { error: 'Too many requests' } };
        }

        recentRequests.push(now);
        this.requests.set(clientId, recentRequests);
        
        console.log(`✅ [RATE LIMIT] Passed (${recentRequests.length}/${this.maxRequests})`);
        
        // 🔗 DECORATOR: Rate limit OK - call the wrapped handler
        return await super.handle(request);
    }
}

// Decorator 5: Validation - validates request BEFORE processing
class ValidationDecorator extends HttpHandlerDecorator {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        // 🔗 DECORATOR: Validate request FIRST
        if (request.method === 'POST' && !request.body) {
            console.log('❌ [VALIDATION] Missing body - blocking request');
            return { status: 400, body: { error: 'Request body is required' } };
        }
        
        console.log('✅ [VALIDATION] Request valid - continuing...');
        
        // 🔗 DECORATOR: Validation passed - call the wrapped handler
        return await super.handle(request);
    }
}


// ============================================================================
// HOW TO BUILD THE DECORATOR CHAIN
// ============================================================================
//
// Think of it like wrapping a gift:
// 1. Start with the base object (the gift)
// 2. Wrap it with the first decorator (first layer of wrapping paper)
// 3. Wrap that with the second decorator (second layer)
// 4. Continue wrapping...
//
// The order matters! The LAST decorator you add is the FIRST one that runs.
//
// Example chain:
// ValidationDecorator wraps
//   AuthenticationDecorator wraps
//     RateLimitingDecorator wraps
//       CachingDecorator wraps
//         LoggingDecorator wraps
//           BasicHttpHandler
//
// Execution flow when request comes in:
// Request → Validation → Auth → RateLimit → Cache → Logging → Base Handler
// Response ← Validation ← Auth ← RateLimit ← Cache ← Logging ← Base Handler
//
// ============================================================================

function createApiHandler(): HttpHandler {
    console.log('\n🔨 Building decorator chain...\n');
    
    // Start with the base handler (the core functionality)
    let handler: HttpHandler = new BasicHttpHandler();
    console.log('1. Created BasicHttpHandler (base)');
    
    // Wrap it with Logging (innermost decorator, runs last)
    handler = new LoggingDecorator(handler);
    console.log('2. Wrapped with LoggingDecorator');
    
    // Wrap that with Caching
    handler = new CachingDecorator(handler);
    console.log('3. Wrapped with CachingDecorator');
    
    // Wrap that with Rate Limiting
    handler = new RateLimitingDecorator(handler);
    console.log('4. Wrapped with RateLimitingDecorator');
    
    // Wrap that with Authentication
    handler = new AuthenticationDecorator(handler);
    console.log('5. Wrapped with AuthenticationDecorator');
    
    // Wrap that with Validation (outermost decorator, runs first)
    handler = new ValidationDecorator(handler);
    console.log('6. Wrapped with ValidationDecorator (outermost)\n');
    
    console.log('📦 Final chain structure:');
    console.log('   Validation → Auth → RateLimit → Cache → Logging → Base\n');
    
    return handler;
}

// ============================================================================
// DEMO: See the decorator pattern in action
// ============================================================================
async function runDecoratorDemo() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('           DECORATOR PATTERN DEMO');
    console.log('═══════════════════════════════════════════════════════════\n');

    const handler = createApiHandler();

    // Request 1: Valid request - goes through all decorators
    console.log('═══════════════════════════════════════════════════════════');
    console.log('REQUEST 1: Valid request (should pass all checks)');
    console.log('═══════════════════════════════════════════════════════════');
    await handler.handle({
        method: 'POST',
        path: '/api/users',
        body: { name: 'John' },
        headers: { authorization: 'Bearer token123', clientId: 'client-1' }
    });

    // Request 2: Same request - should be served from cache
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('REQUEST 2: Same request (should hit cache)');
    console.log('═══════════════════════════════════════════════════════════');
    await handler.handle({
        method: 'POST',
        path: '/api/users',
        body: { name: 'John' },
        headers: { authorization: 'Bearer token123', clientId: 'client-1' }
    });

    // Request 3: Missing authorization - should be blocked by Auth decorator
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('REQUEST 3: Missing authorization (should be blocked)');
    console.log('═══════════════════════════════════════════════════════════');
    await handler.handle({
        method: 'POST',
        path: '/api/users',
        body: { name: 'John' },
        headers: { clientId: 'client-1' }
    });

    // Request 4: Missing body - should be blocked by Validation decorator
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('REQUEST 4: Missing body (should be blocked by validation)');
    console.log('═══════════════════════════════════════════════════════════');
    await handler.handle({
        method: 'POST',
        path: '/api/users',
        headers: { authorization: 'Bearer token123', clientId: 'client-1' }
    });
}

runDecoratorDemo();

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================
//
// 1. DECORATOR = WRAPPER: Each decorator wraps another handler
// 2. CHAIN OF RESPONSIBILITY: Request flows through decorators in order
// 3. FLEXIBLE: Add/remove decorators without changing base code
// 4. SINGLE RESPONSIBILITY: Each decorator does ONE thing
// 5. COMPOSABLE: Mix and match decorators as needed
//
// ============================================================================
// BACKEND USE CASES
// ============================================================================
//
// - Middleware: Express.js, Koa.js middleware chains
// - Request processing: Authentication, authorization, validation
// - Response processing: Compression, encryption, formatting
// - Caching: Response caching, query result caching
// - Logging: Request/response logging, error logging
// - Rate limiting: API rate limiting per client
// - Monitoring: Performance metrics, error tracking
//
// ============================================================================
