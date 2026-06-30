# PHP Laravel Best Practices & Standards

Laravel is the standard PHP framework for rapid SaaS and monolithic web applications. This guide covers setup, project structure, Eloquent ORM, authentication, queues, and testing.

---

## Quick Start

```bash
# Install Laravel
composer create-project laravel/laravel my-app
cd my-app

# Install essential packages
composer require laravel/sanctum          # API authentication
composer require spatie/laravel-permission # Role & permission management
composer require --dev pestphp/pest pestphp/pest-plugin-laravel

# Initialize
php artisan migrate
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

---

## Essential Artisan Commands

```bash
# Generate
php artisan make:model Post -mfsc          # Model + migration + factory + seeder + controller
php artisan make:controller UserController --api --model=User
php artisan make:request StoreUserRequest
php artisan make:resource UserResource
php artisan make:action CreateUserAction
php artisan make:policy UserPolicy --model=User
php artisan make:job SendWelcomeEmailJob
php artisan make:event UserRegistered
php artisan make:listener SendWelcomeEmail --event=UserRegistered
php artisan make:middleware EnsureProfileComplete

# Database
php artisan migrate                         # Run pending migrations
php artisan migrate:fresh --seed           # Drop all + remigrate + seed (dev only)
php artisan db:seed --class=UserSeeder
php artisan tinker                          # REPL for testing code

# Queue
php artisan queue:work                     # Start queue worker
php artisan queue:work --queue=high,default  # Priority queues

# App
php artisan route:list                     # List all routes
php artisan optimize                       # Cache config, routes, views (production)
php artisan optimize:clear                 # Clear all caches (development)
```

---

## Project Structure

```text
app/
├── Actions/              # Single-responsibility business logic
│   └── CreateUserAction.php
├── Http/
│   ├── Controllers/      # HTTP layer only — receive request, return response
│   ├── Requests/         # Form validation and authorization
│   ├── Resources/        # API output transformers
│   └── Middleware/
├── Models/               # Eloquent models
├── Services/             # Multi-step orchestration (spans multiple Actions)
├── Jobs/                 # Background queue jobs
├── Events/ & Listeners/  # Event-driven decoupling
└── Policies/             # Model authorization rules
database/
├── migrations/
├── seeders/
└── factories/
routes/
├── api.php               # Stateless API routes
└── web.php               # Session-based web routes
tests/
├── Feature/              # HTTP / integration tests
└── Unit/                 # Pure unit tests
```

---

## Routing

```php
// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);   // Generates all 7 RESTful routes
    Route::apiResource('orders', OrderController::class)->except(['destroy']);

    // Nested resource
    Route::apiResource('users.orders', UserOrderController::class)->only(['index']);

    // Custom action on a resource
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
});

// Public routes
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);
```

---

## Form Requests — Always Use Them

Never validate inside a controller method. Always use `FormRequest` classes.

```php
// app/Http/Requests/StoreUserRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Simple authorization checks here — complex logic goes to Policies
        return $this->user()?->isAdmin() ?? true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'email', 'unique:users,email'],
            'password'   => ['required', 'string', 'min:8', 'confirmed'],
            'role'       => ['nullable', 'in:admin,user,viewer'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'This email address is already registered.',
        ];
    }
}
```

```php
// app/Http/Controllers/UserController.php — controller stays clean
public function store(StoreUserRequest $request): JsonResponse
{
    // $request->validated() contains only the validated, declared fields
    $user = (new CreateUserAction)->execute($request->validated());
    return new JsonResponse(new UserResource($user), 201);
}
```

---

## Action Classes

Extract business logic from controllers into `Action` classes. Each Action has a single `execute` method.

```php
// app/Actions/CreateUserAction.php
namespace App\Actions;

use App\Models\User;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Hash;

class CreateUserAction
{
    public function execute(array $data): User
    {
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
            'role'       => $data['role'] ?? 'user',
        ]);

        event(new UserRegistered($user));

        return $user;
    }
}
```

---

## API Resources — Control Your JSON Output

Never return raw Eloquent models. Always transform output through API Resources.

```php
// app/Http/Resources/UserResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'email'      => $this->email,
            'role'       => $this->role,
            'created_at' => $this->created_at->toISOString(),
            // ✅ password is NOT included — you control exactly what's exposed
            // ✅ Conditional fields — include orders only if loaded
            'orders'     => OrderResource::collection($this->whenLoaded('orders')),
        ];
    }
}
```

---

## Eloquent ORM

### Defining Models

```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'role',
    ];

    protected $hidden = ['password', 'remember_token'];  // Excluded from JSON/array

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at'        => 'datetime',
    ];

    // Relationships
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    // Scopes — reusable query constraints
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function scopeRole(Builder $query, string $role): Builder
    {
        return $query->where('role', $role);
    }
}
```

### Common Query Patterns

```php
// Always eager-load — prevent N+1
$users = User::active()
    ->with(['orders' => fn($q) => $q->latest()->limit(5), 'profile'])
    ->latest()
    ->paginate(20);

// Conditional eager loading
$user = User::with($request->boolean('include_orders') ? 'orders' : [])
    ->findOrFail($id);

// Chunking large datasets — never load millions of rows into memory
User::chunk(500, function (Collection $users) {
    foreach ($users as $user) {
        ProcessUserJob::dispatch($user);
    }
});

// Atomic upsert
User::updateOrCreate(
    ['email' => $email],               // Lookup conditions
    ['first_name' => $name, 'role' => 'user']   // Values to set
);

// Count with grouping
$ordersByStatus = Order::selectRaw('status, COUNT(*) as count')
    ->groupBy('status')
    ->pluck('count', 'status');
```

### Migrations

```php
// database/migrations/2024_01_01_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('first_name', 100);
    $table->string('last_name', 100);
    $table->string('email', 255)->unique();
    $table->string('password');
    $table->string('role', 20)->default('user')->index();
    $table->timestamp('email_verified_at')->nullable();
    $table->rememberToken();
    $table->timestamps();
    $table->softDeletes();             // Adds deleted_at column

    $table->index(['role', 'created_at']);  // Composite index
});
```

---

## Authentication — Laravel Sanctum (API Tokens)

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

```php
// app/Http/Controllers/AuthController.php
class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('api', ['*'], now()->addDays(30))->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => new UserResource($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }
}
```

```php
// routes/api.php — protected with Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::apiResource('orders', OrderController::class);
});
```

---

## Authorization — Policies

```php
// app/Policies/OrderPolicy.php
class OrderPolicy
{
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id || $user->role === 'admin';
    }

    public function update(User $user, Order $order): bool
    {
        return $user->id === $order->user_id && $order->status === 'draft';
    }

    public function delete(User $user, Order $order): bool
    {
        return $user->role === 'admin';
    }
}
```

```php
// Controller — enforce policy
public function show(Order $order): OrderResource
{
    $this->authorize('view', $order);  // Throws 403 if unauthorized
    return new OrderResource($order->load('items'));
}

public function update(UpdateOrderRequest $request, Order $order): OrderResource
{
    $this->authorize('update', $order);
    $order->update($request->validated());
    return new OrderResource($order);
}
```

---

## Background Queues

Heavy operations (emails, PDFs, payments) must never block the HTTP response.

```php
// app/Jobs/GenerateInvoiceJob.php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class GenerateInvoiceJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    public int $tries = 3;
    public int $backoff = 60;    // Wait 60 seconds between retries

    public function __construct(private readonly Order $order) {}

    public function handle(): void
    {
        $pdf = PDF::loadView('invoices.template', ['order' => $this->order]);
        Storage::put("invoices/{$this->order->id}.pdf", $pdf->output());
        $this->order->update(['invoice_url' => "invoices/{$this->order->id}.pdf"]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error("Invoice generation failed for order {$this->order->id}", [
            'error' => $exception->getMessage(),
        ]);
    }
}

// Dispatch from controller
public function createOrder(StoreOrderRequest $request): JsonResponse
{
    $order = (new CreateOrderAction)->execute($request->validated());
    GenerateInvoiceJob::dispatch($order)->onQueue('invoices');  // Named queue
    return new JsonResponse(new OrderResource($order), 201);
}
```

```bash
# Run queue workers in production (via Supervisor)
php artisan queue:work redis --queue=high,invoices,default --sleep=3 --tries=3
```

---

## Rate Limiting

```php
// app/Providers/RouteServiceProvider.php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)
        ->by($request->input('email') . '|' . $request->ip())
        ->response(fn() => response()->json(['message' => 'Too many attempts.'], 429));
});

// Apply to routes
Route::middleware(['throttle:login'])->post('auth/login', [AuthController::class, 'login']);
```

---

## Testing with Pest PHP

```php
// tests/Pest.php
uses(Tests\TestCase::class, Illuminate\Foundation\Testing\RefreshDatabase::class)->in('Feature');
uses(Tests\TestCase::class)->in('Unit');

// tests/Feature/UserRegistrationTest.php
test('users can register', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'first_name'            => 'Jane',
        'last_name'             => 'Doe',
        'email'                 => 'jane@example.com',
        'password'              => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertStatus(201)->assertJsonStructure(['token', 'user' => ['id', 'email']]);
    $this->assertDatabaseHas('users', ['email' => 'jane@example.com']);
});

test('login fails with wrong password', function () {
    User::factory()->create(['email' => 'jane@example.com', 'password' => Hash::make('correct')]);

    $this->postJson('/api/v1/auth/login', ['email' => 'jane@example.com', 'password' => 'wrong'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('users cannot view other users orders', function () {
    $owner  = User::factory()->create();
    $viewer = User::factory()->create();
    $order  = Order::factory()->for($owner)->create();

    $this->actingAs($viewer)
        ->getJson("/api/v1/orders/{$order->id}")
        ->assertForbidden();
});
```

---

## Events & Listeners

Use Events and Listeners to decouple side effects from business logic. An `Action` fires an event; multiple listeners react independently.

```php
// app/Events/UserRegistered.php
namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;

class UserRegistered
{
    use Dispatchable;

    public function __construct(public readonly User $user) {}
}
```

```php
// app/Listeners/SendWelcomeEmail.php
namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail
{
    public function handle(UserRegistered $event): void
    {
        Mail::to($event->user->email)->send(new WelcomeEmail($event->user));
    }
}

// app/Listeners/CreateDefaultSettings.php
class CreateDefaultSettings
{
    public function handle(UserRegistered $event): void
    {
        $event->user->settings()->create(UserSettings::defaults());
    }
}
```

```php
// app/Providers/EventServiceProvider.php — register the event → listeners map
protected $listen = [
    UserRegistered::class => [
        SendWelcomeEmail::class,
        CreateDefaultSettings::class,
    ],
];
```

```php
// Fire from Action — multiple side effects, zero coupling
class CreateUserAction
{
    public function execute(array $data): User
    {
        $user = User::create([...]);
        UserRegistered::dispatch($user);  // Both listeners fire automatically
        return $user;
    }
}
```

---

## Mail

Mailable classes define the email structure. Keep logic out of blade templates.

```bash
php artisan make:mail WelcomeEmail --markdown=emails.welcome
```

```php
// app/Mail/WelcomeEmail.php
namespace App\Mail;

use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class WelcomeEmail extends Mailable
{
    public function __construct(public readonly User $user) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Welcome to My App!');
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.welcome',
            with: ['loginUrl' => route('login')],
        );
    }
}
```

```blade
{{-- resources/views/emails/welcome.blade.php --}}
@component('mail::message')
# Welcome, {{ $user->first_name }}!

Your account is ready. Click below to sign in.

@component('mail::button', ['url' => $loginUrl])
Sign In
@endcomponent

Thanks, **My App Team**
@endcomponent
```

```php
// Sending mail (sync or queued)
Mail::to($user->email)->send(new WelcomeEmail($user));

// Queued — non-blocking, use in production
Mail::to($user->email)->queue(new WelcomeEmail($user));
```

---

## Notifications

Notifications are like Mailable but multi-channel (email, Slack, database, SMS).

```bash
php artisan make:notification OrderShipped
```

```php
// app/Notifications/OrderShipped.php
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderShipped extends Notification
{
    public function __construct(private readonly Order $order) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];  // Send via email AND store in DB
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Order #{$this->order->reference} shipped")
            ->line("Your order is on its way!")
            ->action('Track Order', route('orders.show', $this->order))
            ->line('Thank you for your business.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'order_id'  => $this->order->id,
            'reference' => $this->order->reference,
        ];
    }
}

// Send to a user
$user->notify(new OrderShipped($order));

// Fetch unread in-app notifications
$notifications = $user->unreadNotifications;
$user->unreadNotifications->markAsRead();
```

---

## Model Observers

Use an Observer to react to Eloquent lifecycle events without cluttering the model itself.

```bash
php artisan make:observer OrderObserver --model=Order
```

```php
// app/Observers/OrderObserver.php
namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    public function created(Order $order): void
    {
        // Auto-generate reference number on creation
        $order->update(['reference' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT)]);
    }

    public function updating(Order $order): void
    {
        if ($order->isDirty('status') && $order->status === 'shipped') {
            $order->user->notify(new \App\Notifications\OrderShipped($order));
        }
    }

    public function deleted(Order $order): void
    {
        \Log::info("Order {$order->id} soft-deleted by user {$order->user_id}");
    }
}

// Register in AppServiceProvider
public function boot(): void
{
    Order::observe(OrderObserver::class);
}
```

---

## Quick Reference Checklist

- [ ] Input validation always uses `FormRequest` classes
- [ ] Business logic is in `Action` classes, not controllers
- [ ] API output always uses `Resource` classes — never raw model
- [ ] Eager loading used — `Model::preventLazyLoading()` enabled in `AppServiceProvider` (dev)
- [ ] `env()` called only in `config/` files — use `config()` helper in app code
- [ ] Background jobs used for emails, PDF generation, payment processing
- [ ] Rate limiting applied to auth endpoints
- [ ] Authorization enforced via Policies — no inline `if ($user->role === 'admin')`
- [ ] `RefreshDatabase` used in all feature tests
- [ ] Migrations are reversible with a `down()` method
