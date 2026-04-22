export interface AdvancedJavaScriptLesson {
  id: string;
  title: string;
  description: string;
  objectives: [string, string, string];
  deepDiveTheory: string;
  practicalExercise: string;
}

export const advancedJavaScriptLessonsDetailed: AdvancedJavaScriptLesson[] = [
  {
    id: 'adv-js-1',
    title:
      'How JavaScript Runs (Compiler vs Interpreter, JIT, Call Stack, Hoisting)',
    description:
      'Build a clear runtime model: why compilers and interpreters exist, how JIT boosts JavaScript, how call stack frames execute, and how hoisting really works.',
    objectives: [
      'Explain the purpose of compilers and interpreters and compare their trade-offs in real execution.',
      'Describe how JavaScript engines use JIT (profiling, optimization, and de-optimization) during runtime.',
      'Trace call stack behavior in detail and predict hoisting outcomes for var, let, const, and functions.',
    ],
    deepDiveTheory: `
### Why this lesson matters
Many JavaScript bugs are not syntax mistakes. They are execution-model mistakes. If you know what the engine does before and during execution, debugging becomes much easier and your code becomes more predictable.

### Purpose of a compiler and an interpreter
Both exist to turn human-readable code into actions the machine can run.
- **Compiler purpose**: Translate code to a lower-level form ahead of execution (or before a specific section runs) so execution can be fast and optimized.
- **Interpreter purpose**: Execute code step-by-step from an internal representation so code can run immediately and stay flexible.

In modern JavaScript engines, these ideas are combined, not mutually exclusive.

### Compiler vs interpreter: key differences
1. **When translation happens**:
- Compiler: before execution of a unit (or before optimized re-run).
- Interpreter: while executing instructions.
2. **Startup speed**:
- Interpreter path usually starts faster.
- Heavy compilation can cost startup time.
3. **Peak performance**:
- Compiled optimized code is usually faster on hot paths.
- Pure interpreted execution is typically slower for repeated heavy loops.
4. **Adaptability**:
- Interpreters are easier to run immediately.
- Optimizing compilers need runtime feedback to produce best machine code.

<PhotoRenderer imageUrl="/images/advanced-js/engine-pipeline.png" altText="JavaScript pipeline from source code through parsing, interpreted execution, and JIT optimization" caption="Modern JavaScript engines combine interpretation and compilation through a JIT pipeline." />

### How JIT works in JavaScript engines
JavaScript engines (like V8, SpiderMonkey, and JavaScriptCore) typically use this runtime strategy:
1. **Parse** source code into an AST.
2. **Generate bytecode** and start executing quickly (interpreter/baseline tier).
3. **Profile runtime behavior** (types seen, frequently called functions, hot loops).
4. **Optimize hot code** by compiling it into faster machine code.
5. **De-optimize when assumptions break** (for example, function expected numbers but receives strings), then fall back and re-optimize later.

This is why JavaScript can have fast startup and still reach strong performance after warm-up.

<CodeBlock language="javascript">
function add(a, b) {
  return a + b;
}

// First runs: engine gathers type feedback.
console.log(add(2, 3));
console.log(add(4, 7));

// Hot path stays numeric -> likely optimization candidate.
for (let i = 0; i < 100000; i += 1) {
  add(i, i + 1);
}

// New type shape can invalidate assumptions and trigger de-optimization.
console.log(add('2', 3)); // "23"
</CodeBlock>

### Call stack in detail
JavaScript executes one call frame at a time on the main thread.

Each frame contains:
- Function identity and current line/instruction.
- Local bindings and parameter values.
- Reference to outer lexical environment.
- Return address (where execution continues after return).

Execution flow:
1. Global execution context is created and pushed first.
2. Every function call pushes a new frame.
3. The top frame runs until it returns or throws.
4. On return, the frame is popped and control continues in the previous frame.
5. Too many nested calls without unwinding can cause stack overflow.

<CodeBlock language="javascript">
function c() {
  console.log('c start');
  console.log('c end');
}

function b() {
  console.log('b start');
  c(); // push c frame
  console.log('b end');
}

function a() {
  console.log('a start');
  b(); // push b frame
  console.log('a end');
}

console.log('global start');
a(); // push a frame
console.log('global end');
</CodeBlock>

### Hoisting explained correctly
Hoisting does **not** move code upward. It means bindings are created during the creation phase of an execution context.

- **function declaration**: binding is created and initialized with the function object.
- **var**: binding is created and initialized to \`undefined\`.
- **let / const**: binding is created but uninitialized (Temporal Dead Zone) until declaration executes.
- **function expression / arrow in variable**: behaves like its variable binding (\`var\` or \`let/const\`).

<InfoCallout type="warning" title="Most common hoisting bug">
Developers often confuse "binding exists" with "value is usable". In TDZ, the binding exists but is not initialized, so access throws ReferenceError.
</InfoCallout>

<CodeBlock language="javascript">
console.log(total); // undefined (var initialized during creation)
// console.log(rate); // ReferenceError (TDZ)
console.log(sum(2, 3)); // 5 (function declaration is callable)

var total = 10;
let rate = 0.2;

function sum(x, y) {
  return x + y;
}

// console.log(multiply(2, 3));
// TypeError if var multiply is read before assignment.
var multiply = function (x, y) {
  return x * y;
};
</CodeBlock>
`,
    practicalExercise: `
Build a "mini engine notebook" script that demonstrates compiler vs interpreter thinking, JIT warm-up, call stack transitions, and hoisting behavior.

Requirements:
- Add a short section in comments: purpose of compiler vs interpreter and one real trade-off for each.
- Create one function called many times with consistent argument types, then one call with a different type to discuss possible JIT de-optimization.
- Write 5 nested function calls and record stack push/pop order before running.
- Add hoisting examples for var, let, const, function declaration, and function expression.
- For each hoisting line, classify expected result: value, undefined, ReferenceError, or TypeError.

Success criteria:
- You can explain compiler vs interpreter purpose and differences in your own words.
- Your runtime notes correctly describe where JIT helps and when de-optimization can happen.
- Your predicted call stack and hoisting outcomes match actual execution.
`,
  },
  {
    id: 'adv-js-2',
    title: 'The Browser Environment & The Window Object (DOM, Web APIs)',
    description:
      'Learn the runtime contract between JavaScript and browser APIs including DOM, BOM, and window.',
    objectives: [
      'Distinguish between JavaScript language runtime and browser-provided APIs.',
      'Explain the role of window, document, and Web APIs in client-side execution.',
      'Use browser objects safely while avoiding common global-state and performance pitfalls.',
    ],
    deepDiveTheory: `
### JavaScript is the language, browser is the host
JavaScript itself does not define document, fetch, localStorage, or setTimeout. These come from the **host environment**. In browsers, the host exposes APIs through the global object, which is window (and aliased by globalThis in modern code).

<PhotoRenderer imageUrl="/images/advanced-js/browser-host-model.png" altText="Diagram separating JavaScript engine from browser host APIs like DOM, fetch, and timers" caption="The engine executes language semantics while the browser host provides platform APIs." />

### window as global namespace and runtime gateway
window combines:
- Global variables/functions in script scope.
- Browser APIs (timers, storage, history, location).
- UI hooks (alert, confirm, requestAnimationFrame).

In modules, top-level declarations are module-scoped, not attached to window by default.

<CodeBlock language="javascript">
// Step 1: In classic script mode, this may attach to window.
var scriptScoped = 'visible on window in non-module scripts';

// Step 2: In module context, top-level bindings are module-scoped.
const moduleScoped = 'not a window property by default';

// Step 3: Access host APIs from the browser global.
console.log(window.location.href);
console.log(document.title);

// Step 4: globalThis works across environments.
console.log(globalThis === window); // true in browser main thread
</CodeBlock>

### DOM: structured representation of the document
The browser parses HTML into a tree of nodes. JavaScript manipulates that tree through DOM interfaces. Important implications:
- Querying repeatedly can be expensive in large trees.
- Layout-affecting reads/writes can cause reflow/repaint costs.
- Event listeners retain references, affecting memory.

### Web APIs and asynchronous boundaries
When you call fetch or setTimeout, the browser schedules work outside the synchronous call stack and returns control. Completion callbacks later re-enter JavaScript via event loop queues.

<CodeBlock language="javascript">
// Step 1: Synchronous execution starts.
console.log('Start');

// Step 2: Timer API belongs to browser host, not language core.
setTimeout(function () {
  // Step 5: callback re-enters JS later through task queue.
  console.log('Timer finished');
}, 0);

// Step 3: fetch delegates network work to browser networking layer.
fetch('/api/health')
  .then(function (response) {
    // Step 6: Promise continuation runs in microtask queue.
    return response.text();
  })
  .then(function (text) {
    console.log('Fetch result:', text);
  });

// Step 4: synchronous code completes first.
console.log('End');
</CodeBlock>

<InfoCallout type="info" title="Pitfall: accidental globals">
Implicit globals (assigning to undeclared identifiers in sloppy mode) leak state onto window and create hard-to-debug coupling. Use strict mode and modules to avoid polluting the global namespace.
</InfoCallout>

### Why DOM + Web API understanding improves architecture
Once you separate language from host, your code becomes portable and testable:
- Core logic can run without browser dependencies.
- Browser adapters can be isolated behind small interfaces.
- Unit tests become easier because host APIs are mocked at boundaries.
`,
    practicalExercise: `
Create a "host boundaries" mini app:
- A pure function module that formats user records.
- A browser adapter module that fetches records and renders to DOM.
- A global diagnostics panel showing window.location, navigator.userAgent, and document.visibilityState.

Challenge rules:
- Keep business logic independent from document and window.
- Use one delegated click listener for all row actions.
- Log every async boundary (timer start/end, fetch start/end).

Success criteria:
- You can swap DOM rendering with console rendering without touching core logic.
- No accidental globals are created.
- The app remains responsive while network requests run.
`,
  },
  {
    id: 'adv-js-3',
    title:
      'Advanced Functions & Closures (Lexical Scope, Currying, Debouncing)',
    description:
      'Master function-level abstractions and closure behavior for reusable, high-performance JavaScript.',
    objectives: [
      'Model lexical scope and closure retention at runtime.',
      'Apply currying and partial application to build composable APIs.',
      'Implement production-safe debounce logic and reason about timer lifecycles.',
    ],
    deepDiveTheory: `
### Lexical scope is defined by where code is written
JavaScript uses lexical scoping: variable access is resolved based on source-code nesting, not call site.

A closure is a function plus references to outer lexical bindings. This is powerful, but retained references can keep memory alive longer than expected.

<PhotoRenderer imageUrl="/images/advanced-js/closure-scope-chain.png" altText="Nested lexical scopes showing inner function retaining outer variables" caption="Closures preserve access to outer lexical environments after outer function returns." />

<CodeBlock language="javascript">
function createCounter(start) {
  // Step 1: this binding is captured by returned functions.
  let value = start;

  return {
    increment: function () {
      // Step 2: closure reads and mutates retained variable.
      value += 1;
      return value;
    },
    reset: function () {
      // Step 3: same closure scope shared across methods.
      value = start;
      return value;
    },
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.reset()); // 10
</CodeBlock>

### Currying for composability
Currying transforms a function of multiple arguments into nested unary functions. It helps produce configurable behavior once and reuse many times.

<CodeBlock language="javascript">
function multiply(a) {
  // Step 1: return function waiting for next argument.
  return function (b) {
    // Step 2: closure captures a.
    return a * b;
  };
}

const double = multiply(2); // Step 3: specialized function
const triple = multiply(3);

console.log(double(8)); // 16
console.log(triple(8)); // 24
</CodeBlock>

### Debouncing to control event storms
Debounce delays execution until a quiet period. Typical use cases: search inputs, resize handlers, auto-save.

<CodeBlock language="javascript">
function debounce(fn, delayMs) {
  // Step 1: timerId is retained in closure across invocations.
  let timerId = null;

  return function debouncedHandler() {
    // Step 2: keep call-time arguments and this value.
    const args = arguments;
    const context = this;

    // Step 3: clear previous scheduled run.
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // Step 4: schedule new execution after quiet period.
    timerId = setTimeout(function () {
      // Step 5: invoke original function with preserved context.
      fn.apply(context, args);
    }, delayMs);
  };
}

const onSearch = debounce(function (query) {
  console.log('Searching for:', query);
}, 300);

onSearch('ja');
onSearch('jav');
onSearch('javascript'); // only this one executes after 300ms silence
</CodeBlock>

<InfoCallout type="warning" title="Closure memory leak pattern">
If a closure captures large structures (DOM nodes, large arrays, cache maps) and is attached to long-lived listeners, those structures may never be garbage collected. Always detach listeners and null out stale references in teardown flows.
</InfoCallout>

### Design principle
Use closures intentionally:
- Great for encapsulation and private state.
- Great for factory functions.
- Risky when lifetime is not bounded.
`,
    practicalExercise: `
Build an auto-complete search box with performance guarantees.

Requirements:
- Implement a generic debounce utility from scratch.
- Use currying to preconfigure API base URL and query key.
- Track in-flight request IDs and ignore stale responses.
- Render "typing", "loading", "results", and "error" states.

Success criteria:
- At fast typing speed, network requests remain bounded.
- No stale response overwrites a newer query.
- You can explain closure variables and their lifetime.
`,
  },
  {
    id: 'adv-js-4',
    title: 'Advanced DOM & Event Delegation (Bubbling, Capturing)',
    description:
      'Use event propagation internals to build scalable, maintainable interaction layers in dynamic UIs.',
    objectives: [
      'Explain capture, target, and bubble phases in browser event dispatch.',
      'Implement event delegation for dynamic DOM trees without per-node handlers.',
      'Handle propagation control APIs correctly without breaking unrelated features.',
    ],
    deepDiveTheory: `
### Event propagation model
For most DOM events, dispatch occurs in ordered phases:
1. **Capturing phase**: window -> document -> ancestors toward target.
2. **Target phase**: event reaches target node.
3. **Bubbling phase**: event bubbles from target back up ancestors.

<PhotoRenderer imageUrl="/images/advanced-js/event-propagation-phases.png" altText="Capture phase down tree and bubble phase up tree" caption="DOM events propagate through capture and bubble paths around the target node." />

### Why delegation is a scaling strategy
Attaching listeners to each row/button scales poorly in dynamic lists and can create teardown complexity. Delegation attaches one listener to a stable ancestor and resolves action via event.target.closest.

<CodeBlock language="javascript">
const todoList = document.querySelector('[data-todo-list]');

// Step 1: attach one listener to parent container.
todoList.addEventListener('click', function (event) {
  // Step 2: find nearest actionable element.
  const actionButton = event.target.closest('[data-action]');

  // Step 3: ignore clicks outside actionable descendants.
  if (!actionButton || !todoList.contains(actionButton)) {
    return;
  }

  // Step 4: read semantic action and row identity.
  const action = actionButton.dataset.action;
  const row = actionButton.closest('[data-row-id]');
  const rowId = row ? row.dataset.rowId : null;

  if (!rowId) return;

  // Step 5: route behavior by action type.
  if (action === 'toggle') {
    row.classList.toggle('is-done');
  } else if (action === 'remove') {
    row.remove();
  }
});
</CodeBlock>

### Capturing listeners and advanced control
Some use cases need capture listeners (third argument or options.capture = true), e.g., global instrumentation or early interception before bubbling handlers.

<CodeBlock language="javascript">
document.addEventListener(
  'click',
  function (event) {
    // Step 1: this runs during capture before target/bubble handlers.
    console.log('Capture phase click at:', event.target);
  },
  { capture: true }
);
</CodeBlock>

### stopPropagation vs preventDefault
- stopPropagation: stops event traversal to further ancestors.
- preventDefault: cancels default browser behavior if event is cancelable.
Use sparingly; broad propagation blocking can break analytics, accessibility handlers, and parent workflows.

<InfoCallout type="warning" title="Delegation edge case">
Not all events bubble (for example, focus and blur do not bubble traditionally; use focusin/focusout or capture listeners). Know event behavior before designing delegated systems.
</InfoCallout>
`,
    practicalExercise: `
Build a dynamic Kanban column interaction layer using a single delegated listener.

Requirements:
- Cards are created and removed dynamically.
- Actions: edit title, archive card, toggle priority, open details modal.
- Use data-* attributes for action routing.
- Add keyboard support (Enter/Space) for action elements.

Success criteria:
- No per-card event listener attachments.
- Newly added cards work without additional setup.
- You can explain propagation flow for one click from window to target and back.
`,
  },
  {
    id: 'adv-js-5',
    title:
      'Prototypes & Prototypal Inheritance (Constructor functions, this binding)',
    description:
      'Understand object linkage, prototype chain lookup, and this-binding rules across invocation styles.',
    objectives: [
      'Explain how property lookup traverses the prototype chain.',
      'Use constructor functions and prototypes without duplicating methods per instance.',
      'Reason about this across regular calls, method calls, constructors, and bound functions.',
    ],
    deepDiveTheory: `
### Objects inherit via links, not class copies
In JavaScript, objects can delegate property access to another object through internal [[Prototype]] linkage. If property not found on object itself, engine climbs prototype chain.

<PhotoRenderer imageUrl="/images/advanced-js/prototype-chain-map.png" altText="Prototype chain from instance to constructor prototype to Object.prototype" caption="Property lookup walks upward through linked prototypes until found or null reached." />

### Constructor function pattern
Before class syntax, constructor functions + prototypes were standard. Still critical to understand because classes compile to this model conceptually.

<CodeBlock language="javascript">
function User(name) {
  // Step 1: with new, this points to fresh object linked to User.prototype.
  this.name = name;
  this.createdAt = Date.now();
}

// Step 2: method stored once on prototype, shared by all instances.
User.prototype.describe = function () {
  return 'User(' + this.name + ')';
};

const a = new User('Nora');
const b = new User('Salem');

console.log(a.describe());
console.log(a.describe === b.describe); // true (shared method)
</CodeBlock>

### this binding rules
this is determined by call-site style, not declaration location (except arrow functions).
- Plain call: this is undefined in strict mode.
- Method call obj.fn(): this is obj.
- Constructor call new Fn(): this is new instance.
- call/apply/bind: explicit this.
- Arrow function: lexical this from enclosing context.

<CodeBlock language="javascript">
'use strict';

const profile = {
  name: 'Lina',
  regular: function () {
    // Step 1: method call -> this is profile.
    return this.name;
  },
  arrowFactory: function () {
    // Step 2: arrow captures lexical this from arrowFactory call context.
    return () => this.name;
  },
};

const detached = profile.regular;
// console.log(detached()); // undefined in strict mode due to plain call

const bound = detached.bind(profile); // Step 3: permanently bind this
console.log(bound()); // Lina
console.log(profile.arrowFactory()()); // Lina
</CodeBlock>

<InfoCallout type="info" title="Prototype mutation caveat">
Changing Constructor.prototype after creating instances can produce inconsistent behavior across old/new objects. Prefer defining prototype methods once during initialization.
</InfoCallout>

### Why this matters in modern apps
Even when using classes and frameworks, understanding prototype lookup and this prevents subtle bugs in callbacks, event handlers, and inheritance-heavy code paths.
`,
    practicalExercise: `
Implement a lightweight model layer without classes.

Requirements:
- Create constructor functions: User, Teacher, Student.
- Share common methods through prototypes (describe, toJSON).
- Add specialized prototype methods for Teacher and Student.
- Demonstrate correct this handling in detached callbacks using bind.

Success criteria:
- Methods are shared (not duplicated per instance).
- Prototype chain relationships are correct and verifiable.
- No this-related runtime errors in callback scenarios.
`,
  },
  {
    id: 'adv-js-6',
    title: 'Modern OOP with ES6 Classes (Encapsulation, Extends)',
    description:
      'Use class syntax intentionally while understanding its prototype-based foundations and tradeoffs.',
    objectives: [
      'Design classes with meaningful boundaries and encapsulated state.',
      'Use inheritance via extends/super and evaluate when composition is a better option.',
      'Apply private fields, static methods, and instance methods appropriately.',
    ],
    deepDiveTheory: `
### Class syntax: ergonomics over prototype system
class provides cleaner syntax, but methods still live on prototypes under the hood. Knowing this avoids magical thinking around inheritance and method sharing.

<PhotoRenderer imageUrl="/images/advanced-js/class-to-prototype.png" altText="Class declaration mapped to constructor and prototype methods" caption="Class syntax compiles conceptually to constructor + prototype method definitions." />

### Encapsulation with private fields
Private fields (#name) enforce access constraints at language level.

<CodeBlock language="javascript">
class BankAccount {
  // Step 1: private fields are not reachable outside class body.
  #balance;

  constructor(owner, initialBalance) {
    // Step 2: instance state initialization.
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    // Step 3: guard business rules inside class method.
    if (amount <= 0) throw new Error('Amount must be positive');
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    // Step 4: controlled read access.
    return this.#balance;
  }

  static fromJSON(payload) {
    // Step 5: static factory method for data hydration.
    return new BankAccount(payload.owner, payload.balance);
  }
}
</CodeBlock>

### Inheritance and super
Use extends when subtype truly is a specialized version with substitutable behavior.

<CodeBlock language="javascript">
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + ' makes a sound.';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // Step 1: must call super before using this.
    super(name);
    this.breed = breed;
  }

  speak() {
    // Step 2: override while optionally reusing parent behavior.
    return super.speak() + ' Woof!';
  }
}

const d = new Dog('Milo', 'Border Collie');
console.log(d.speak());
</CodeBlock>

### Composition over inheritance
Prefer composition when behavior can be mixed modularly. Deep inheritance chains often increase coupling and fragility.

<InfoCallout type="warning" title="Common class pitfall">
Do not put mutable object/array defaults on prototype accidentally. Keep per-instance mutable state inside constructor or private fields.
</InfoCallout>

### Production mindset
- Keep classes small and domain-focused.
- Expose minimal public API.
- Validate invariants at mutation points.
- Use static constructors for parsing external data.
`,
    practicalExercise: `
Build a plugin-based notification system.

Requirements:
- Base class NotificationChannel with send(message).
- Derived classes: EmailChannel, SMSChannel, PushChannel.
- Private queue field in each instance for pending payloads.
- Static factory that builds channels from config objects.

Success criteria:
- Shared behavior lives in base class, specialized behavior in derived classes.
- Invalid message payloads are rejected with explicit errors.
- You can replace inheritance with composition for one feature and compare both designs.
`,
  },
  {
    id: 'adv-js-7',
    title: 'The Event Loop & Callbacks (Task Queue, single-threaded execution)',
    description:
      'Build a precise model of scheduling, callback execution order, and UI responsiveness in single-threaded JavaScript.',
    objectives: [
      'Explain event loop responsibilities and the relationship between call stack and task queues.',
      'Differentiate synchronous blocking work from deferred callback execution.',
      'Diagnose UI freezes and ordering surprises caused by scheduling assumptions.',
    ],
    deepDiveTheory: `
### Single-threaded does not mean only one thing happens overall
JavaScript execution in the main thread is single-call-stack, but browser subsystems (timers, network, rendering) run outside that stack and enqueue callbacks back into JavaScript.

<PhotoRenderer imageUrl="/images/advanced-js/event-loop-callback-cycle.png" altText="Call stack, Web APIs, task queue, and event loop cycle" caption="The event loop moves eligible callbacks into execution when stack becomes empty." />

### Core scheduling rule
A queued callback can execute **only when the call stack is empty**. If synchronous code blocks for 2 seconds, no queued UI click callback can run during that time.

<CodeBlock language="javascript">
console.log('A: start');

setTimeout(function () {
  // Step 4: enters task queue after timer threshold.
  console.log('D: timer callback');
}, 0);

// Step 2: expensive synchronous loop blocks stack.
const start = Date.now();
while (Date.now() - start < 200) {
  // busy wait for demonstration only
}

console.log('C: end sync work'); // Step 3
// Step 5: event loop sees empty stack, executes timer callback.
</CodeBlock>

### Callback architecture implications
- Long synchronous handlers delay all other interactions.
- Large loops should be chunked.
- UI rendering waits for JavaScript to yield control.

One strategy: split heavy work into chunks with scheduling breaks.

<CodeBlock language="javascript">
function processInChunks(items, chunkSize) {
  let index = 0;

  function runChunk() {
    // Step 1: process a slice to keep frame budget manageable.
    const end = Math.min(index + chunkSize, items.length);
    while (index < end) {
      items[index] = items[index] * 2;
      index += 1;
    }

    // Step 2: if work remains, yield and reschedule.
    if (index < items.length) {
      setTimeout(runChunk, 0);
    }
  }

  runChunk();
}
</CodeBlock>

<InfoCallout type="warning" title="Long Task warning">
A single long task can block input handling and paint, creating perceived app "lag". Break CPU-heavy work, offload to Web Workers, or preprocess on server when possible.
</InfoCallout>

### Practical debugging lens
When behavior appears "out of order", inspect:
- Is stack currently busy?
- Which queue is callback in?
- Did rendering need a yield point?
`,
    practicalExercise: `
Create a "responsiveness lab" page that demonstrates scheduling behavior.

Requirements:
- Button A runs blocking loop for 500ms.
- Button B schedules setTimeout callback.
- Button C schedules Promise callback.
- Display timeline logs with timestamps and execution order.

Success criteria:
- You can explain why callbacks run after blocking work finishes.
- UI visibly freezes during long task, then recovers.
- You implement chunked processing version and compare perceived responsiveness.
`,
  },
  {
    id: 'adv-js-8',
    title: 'Promises & The Fetch API (Microtask queue, API requests)',
    description:
      'Develop robust promise chains and network handling with accurate microtask queue mental models.',
    objectives: [
      'Explain promise state transitions and chaining semantics.',
      'Understand microtask scheduling and ordering relative to tasks.',
      'Build resilient fetch flows with explicit error normalization.',
    ],
    deepDiveTheory: `
### Promise as eventual value container
A Promise represents an asynchronous computation that is pending, fulfilled, or rejected. Consumers register continuations with then/catch/finally.

### Microtasks vs tasks
Promise reactions run in the microtask queue, which is drained after current synchronous execution and before next task callback.

<PhotoRenderer imageUrl="/images/advanced-js/microtask-vs-task.png" altText="Timeline showing synchronous code, microtasks, then tasks" caption="Promise then handlers (microtasks) run before timer callbacks (tasks) after current stack clears." />

<CodeBlock language="javascript">
console.log('1: sync start');

setTimeout(function () {
  // Step 4: task queue callback
  console.log('4: timeout task');
}, 0);

Promise.resolve()
  .then(function () {
    // Step 3: microtask runs before tasks
    console.log('3: promise microtask');
  });

console.log('2: sync end');
</CodeBlock>

### fetch specifics that often surprise developers
fetch rejects only on network failure or abort, not on HTTP error status. 404 and 500 still resolve with Response objects where ok is false.

<CodeBlock language="javascript">
function fetchJSON(url, options) {
  // Step 1: start request.
  return fetch(url, options)
    .then(function (response) {
      // Step 2: normalize HTTP failure into rejection.
      if (!response.ok) {
        const error = new Error('HTTP ' + response.status);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then(function (data) {
      // Step 3: data available to caller chain.
      return data;
    });
}

fetchJSON('/api/students')
  .then(function (students) {
    console.log('Students:', students.length);
  })
  .catch(function (error) {
    console.error('Request failed:', error.message);
  });
</CodeBlock>

### Promise composition patterns
- Promise.all: fail-fast parallel aggregation.
- Promise.allSettled: collect outcomes regardless of failure.
- Promise.race: first settled wins.
- Promise.any: first fulfilled wins.

<InfoCallout type="info" title="Chaining discipline">
Always return values or promises inside then callbacks. Missing return creates undefined flows and makes chains harder to reason about.
</InfoCallout>
`,
    practicalExercise: `
Build a data dashboard loader with robust network handling.

Requirements:
- Fetch 3 endpoints in parallel.
- Use Promise.allSettled to render partial successes.
- Normalize HTTP errors to structured objects.
- Add retry-with-backoff for transient failures.

Success criteria:
- UI renders successful sections even when one endpoint fails.
- Error panel distinguishes network failure vs HTTP status failure.
- Logs show microtask ordering for each chain step.
`,
  },
  {
    id: 'adv-js-9',
    title: 'Async/Await & Error Handling (try/catch blocks)',
    description:
      'Write readable asynchronous code while preserving precise control over failure paths and concurrency.',
    objectives: [
      'Translate promise chains into async/await without losing semantics.',
      'Implement layered error handling with try/catch/finally and domain-specific errors.',
      'Choose between sequential and parallel async execution intentionally.',
    ],
    deepDiveTheory: `
### async/await is syntax over promises
An async function returns a Promise automatically. await pauses inside async function until awaited Promise settles, then resumes execution.

### Sequential vs parallel awaits
Independent async operations should run in parallel to reduce latency.

<CodeBlock language="javascript">
async function loadSequential(api) {
  // Step 1: waits fully before starting next call.
  const user = await api.getUser();
  const courses = await api.getCourses();
  return { user: user, courses: courses };
}

async function loadParallel(api) {
  // Step 2: start both immediately.
  const userPromise = api.getUser();
  const coursesPromise = api.getCourses();

  // Step 3: await both together.
  const results = await Promise.all([userPromise, coursesPromise]);
  return { user: results[0], courses: results[1] };
}
</CodeBlock>

<PhotoRenderer imageUrl="/images/advanced-js/async-await-flow.png" altText="Sequential vs parallel await flow comparison" caption="Parallel dispatch often reduces end-to-end latency when operations are independent." />

### Structured error handling
Wrap boundary operations with try/catch, then map low-level errors to user-facing domain errors.

<CodeBlock language="javascript">
class DataLoadError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'DataLoadError';
    this.cause = cause;
  }
}

async function fetchProfile(id) {
  try {
    // Step 1: network request may reject or return !ok.
    const response = await fetch('/api/profile/' + id);

    // Step 2: normalize HTTP failure.
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    // Step 3: parse body.
    return await response.json();
  } catch (error) {
    // Step 4: wrap low-level failure with domain context.
    throw new DataLoadError('Failed to load profile', error);
  } finally {
    // Step 5: always-run cleanup section.
    console.log('fetchProfile completed');
  }
}
</CodeBlock>

### Abort and cancellation control
Use AbortController to cancel stale requests when user input changes rapidly.

<InfoCallout type="warning" title="Unhandled rejection risk">
If you call async functions without awaiting or attaching catch handlers, rejected promises can become unhandled rejections and destabilize application behavior. Always consume async results deliberately.
</InfoCallout>
`,
    practicalExercise: `
Implement a profile page loader with cancellation and resilient error UX.

Requirements:
- Load user profile, activity feed, and notifications.
- Parallelize independent requests.
- Cancel prior in-flight requests on route/user change.
- Show domain-specific error messages while preserving original error context for logs.

Success criteria:
- No stale results appear after fast user switching.
- Error boundary receives meaningful wrapped errors.
- finally block correctly updates loading indicators in all paths.
`,
  },
  {
    id: 'adv-js-10',
    title: 'Web APIs & Local Storage (Data persistence, JSON serialization)',
    description:
      'Persist client state safely with serialization discipline, schema evolution, and storage constraints in mind.',
    objectives: [
      'Use localStorage API correctly with explicit serialization boundaries.',
      'Design storage keys, schema versions, and migration logic for long-lived data.',
      'Identify security, performance, and consistency limitations of browser persistence APIs.',
    ],
    deepDiveTheory: `
### localStorage characteristics
localStorage is synchronous, string-only, origin-scoped persistent storage. It is simple but has constraints:
- Blocking API: large writes can pause main thread.
- Limited capacity: browser-dependent quota.
- No built-in TTL/versioning/transactions.

<PhotoRenderer imageUrl="/images/advanced-js/storage-lifecycle.png" altText="Flow of state serialize save load parse migrate" caption="Reliable persistence requires serialize/validate/migrate steps, not raw setItem/getItem usage." />

### JSON serialization boundary
You must convert objects to strings and parse on retrieval.

<CodeBlock language="javascript">
const STORAGE_KEY = 'app:user-preferences:v2';

function savePreferences(prefs) {
  // Step 1: wrap payload with metadata for migrations.
  const payload = {
    version: 2,
    updatedAt: Date.now(),
    data: prefs,
  };

  // Step 2: stringify before storing.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadPreferences() {
  // Step 3: read raw string; null if key absent.
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    // Step 4: parse and validate shape.
    const payload = JSON.parse(raw);
    if (!payload || payload.version !== 2 || !payload.data) {
      return null;
    }
    return payload.data;
  } catch (error) {
    // Step 5: corrupted JSON fallback.
    return null;
  }
}
</CodeBlock>

### Schema migration strategy
When structure changes, migrate old payloads instead of dropping data silently.

<CodeBlock language="javascript">
function migratePreferences(rawPayload) {
  // Step 1: normalize unknown payloads.
  const payload = rawPayload || {};

  // Step 2: migrate v1 -> v2 if needed.
  if (payload.version === 1) {
    return {
      version: 2,
      updatedAt: Date.now(),
      data: {
        theme: payload.data && payload.data.theme ? payload.data.theme : 'light',
        language: payload.data && payload.data.language ? payload.data.language : 'en',
      },
    };
  }

  // Step 3: keep v2 as-is.
  if (payload.version === 2) {
    return payload;
  }

  // Step 4: unknown schema fallback.
  return {
    version: 2,
    updatedAt: Date.now(),
    data: { theme: 'light', language: 'en' },
  };
}
</CodeBlock>

<InfoCallout type="warning" title="Security boundary">
Never store secrets, auth tokens requiring strong protection, or sensitive personal data in localStorage. Data is readable by any script running on your origin, including malicious injected scripts in XSS scenarios.
</InfoCallout>

### API selection guidance
- localStorage: small persistent settings.
- sessionStorage: tab-scoped temporary state.
- IndexedDB: large structured client databases.
`,
    practicalExercise: `
Build a persistent lesson-progress cache.

Requirements:
- Store progress per lesson with timestamps.
- Add schema version and migration path from v1 to v2.
- Recover gracefully from corrupted JSON values.
- Add clear-cache control in settings panel.

Success criteria:
- Refreshing page preserves progress.
- Migration runs automatically for old payloads.
- Corrupted entries do not crash app and are replaced safely.
`,
  },
  {
    id: 'adv-js-11',
    title: 'ES6 Modules & Code Organization (import/export, file splitting)',
    description:
      'Build maintainable architecture using ESM boundaries, explicit dependencies, and scalable file organization.',
    objectives: [
      'Use named/default exports and imports with clear dependency direction.',
      'Apply code splitting and dynamic import for performance-aware loading.',
      'Prevent module anti-patterns such as circular dependencies and side-effect-heavy entry points.',
    ],
    deepDiveTheory: `
### ESM gives static structure
ECMAScript Modules are statically analyzable. This enables tree shaking, better tooling, and predictable dependency graphs.

<PhotoRenderer imageUrl="/images/advanced-js/module-graph.png" altText="Dependency graph between UI, domain, and infra modules" caption="Healthy module graphs flow inward toward domain logic with minimal circular edges." />

### Export/import patterns
Prefer named exports for discoverability and refactor safety. Use default exports when module has one primary abstraction.

<CodeBlock language="javascript">
// math.js
// Step 1: named exports for explicit API surface.
export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// formatter.js
// Step 2: default export when module centers around one function.
export default function formatCurrency(value) {
  return '$' + value.toFixed(2);
}

// consumer.js
import formatCurrency from './formatter.js';
import { sum, multiply } from './math.js';

console.log(formatCurrency(sum(2, 3)));
console.log(multiply(4, 5));
</CodeBlock>

### Dynamic imports for code splitting
Load heavy modules only when needed.

<CodeBlock language="javascript">
async function openAnalyticsPanel() {
  // Step 1: defer loading until user opens panel.
  const module = await import('./analyticsPanel.js');

  // Step 2: execute module function after chunk loads.
  module.renderAnalyticsPanel();
}

document
  .querySelector('[data-open-analytics]')
  .addEventListener('click', openAnalyticsPanel);
</CodeBlock>

### Organizational strategy
Layer modules by responsibility:
- domain: pure business rules.
- application: orchestrates use cases.
- infrastructure: network/storage adapters.
- presentation: UI rendering and event wiring.

<InfoCallout type="warning" title="Circular dependency trap">
Circular imports can yield partially initialized bindings and surprising undefined behaviors at module evaluation time. Keep dependencies directional and move shared contracts to lower-level modules.
</InfoCallout>

### Side effects and entry points
Keep side effects (listeners, global mutations, startup) in explicit bootstrap files. Avoid hidden side effects in utility modules.
`,
    practicalExercise: `
Refactor an existing feature into a modular architecture.

Requirements:
- Split a single large file into at least 5 modules by responsibility.
- Add one lazy-loaded module using dynamic import.
- Remove all implicit side effects from utility modules.
- Document dependency direction in a small module graph note.

Success criteria:
- Build output shows separate chunk for lazy module.
- Unit-testable domain functions have no DOM dependency.
- No circular import warnings and no runtime undefined exports.
`,
  },
  {
    id: 'adv-js-12',
    title: 'Capstone Integration Project (Building a complete SPA)',
    description:
      'Integrate runtime, async, storage, DOM, and module architecture into a production-style single page application.',
    objectives: [
      'Synthesize all advanced JavaScript concepts into one coherent SPA architecture.',
      'Implement robust async/data/state flows with clear error handling and persistence.',
      'Evaluate maintainability, performance, and reliability using concrete acceptance criteria.',
    ],
    deepDiveTheory: `
### Capstone goal
Build a complete single page application that demonstrates runtime understanding, modular architecture, async data flows, resilient error handling, and persistent state.

<PhotoRenderer imageUrl="/images/advanced-js/spa-architecture-capstone.png" altText="SPA architecture showing router, state, API client, storage, and UI modules" caption="A production-style SPA architecture with clear boundaries and data flow contracts." />

### Suggested architecture blueprint
1. **Router layer**: maps URL/state to screens.
2. **State layer**: centralized store or composable state modules.
3. **API layer**: fetch wrappers with normalized errors.
4. **Persistence layer**: localStorage cache with versioning.
5. **UI layer**: delegated events + rendering components.

### Core startup flow

<CodeBlock language="javascript">
// appBootstrap.js
import { createRouter } from './router.js';
import { createStore } from './store.js';
import { createApiClient } from './apiClient.js';
import { createPersistence } from './persistence.js';
import { renderApp } from './ui/renderApp.js';

export async function bootstrap() {
  // Step 1: initialize infrastructure.
  const api = createApiClient({ baseUrl: '/api' });
  const persistence = createPersistence({ key: 'spa:state:v1' });

  // Step 2: hydrate persisted state with validation.
  const initialState = persistence.load() || { user: null, items: [], filter: '' };

  // Step 3: create application store.
  const store = createStore(initialState);

  // Step 4: wire route changes to render cycle.
  const router = createRouter(function onRouteChange(route) {
    renderApp({ route: route, store: store, api: api });
  });

  // Step 5: subscribe persistence to state updates.
  store.subscribe(function (nextState) {
    persistence.save(nextState);
  });

  // Step 6: initial render and route sync.
  router.start();
}
</CodeBlock>

### Reliability checklist
- Every network boundary wraps errors into domain-specific failures.
- Every async action has loading, success, and failure UI states.
- Stale in-flight responses are ignored or canceled.
- Render updates are efficient and avoid full-tree rewrites when possible.

### Performance checklist
- Lazy-load heavy views.
- Debounce noisy inputs.
- Avoid long synchronous tasks in interaction handlers.
- Cache safe API responses with versioning strategy.

<InfoCallout type="info" title="Capstone quality bar">
Treat this project as portfolio-grade engineering: clear module boundaries, explicit contracts, comprehensive error handling, and documented tradeoffs are as important as visual output.
</InfoCallout>
`,
    practicalExercise: `
Build a complete student learning tracker SPA.

Required feature set:
- Authentication mock flow (login/logout state handling).
- Course list with searchable/filterable lessons.
- Lesson details page with async content loading.
- Progress tracking persisted to localStorage with schema version.
- Dashboard analytics section loaded lazily.
- Global error banner and retry controls for failed requests.

Technical constraints:
- Use modular ESM file structure.
- Use delegated DOM events for list interactions.
- Use async/await with cancellation for route changes.
- Include one debounced search input and one Promise.all parallel load.

Success criteria:
- App remains responsive under rapid navigation and typing.
- No unhandled promise rejections.
- Persisted state survives refresh and migrates safely when schema changes.
- You can explain how each previous lesson concept appears in your implementation.
`,
  },
];
