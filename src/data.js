export const ROADMAP_DATA = [
  {
    day: 1, date: "Sun, 21 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS | Project A Setup",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session – weights/cardio", "Post-gym nutrition"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Two Sum (Easy)", "Contains Duplicate (Easy)", "Best Time to Buy/Sell Stock (Easy)"], detail: {
        type: "dsa", items: [
          { name: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/", solution: `// Java - HashMap approach, O(n) time, O(n) space
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}
// For each num, check if (target - num) was already seen.
// Brute force is O(n^2); the hashmap trades space for a single pass.` },
          { name: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", solution: `// Java - HashSet, O(n) time, O(n) space
public boolean containsDuplicate(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int num : nums) {
        if (!set.add(num)) return true; // add() returns false if already present
    }
    return false;
}` },
          { name: "Best Time to Buy/Sell Stock", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", solution: `// Java - one pass, track running minimum, O(n) time, O(1) space
public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
// Only one transaction allowed - track the lowest price seen so far.` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch & Rest", color: "break", tasks: ["Full break, no screens", "Walk 10 min"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS", color: "cs", tasks: ["Processes vs Threads", "Context switching", "CPU Scheduling: FCFS, SJF, Round Robin"], detail: {
        type: "cs", topic: "OS: Processes, Threads & CPU Scheduling",
        notes: `PROCESSES vs THREADS:
• Process = program in execution. Owns its own memory space, PID, file descriptors, and heap.
• Thread = lightweight unit of execution within a process. Threads in the same process share memory, but each has its own stack and registers.
• Why threads are cheaper: creating a thread skips allocating a fresh address space, so context switches between threads of the same process are faster than between processes.

CONTEXT SWITCHING:
• OS saves the state of the running process/thread (registers, program counter, stack pointer) into its PCB/TCB, then loads another's.
• Cost: roughly 1–10 microseconds, but indirect costs (cache/TLB misses) can dominate.
• Triggers: timer interrupt (time slice expiry), I/O wait, higher-priority process becoming ready, or explicit yield.

CPU SCHEDULING ALGORITHMS:
• FCFS (First Come First Serve): non-preemptive, simple, but suffers from the "convoy effect" — short jobs queue behind one long job.
• SJF (Shortest Job First): provably optimal average waiting time, but requires knowing burst time in advance and can starve long jobs.
• Round Robin: each process gets a fixed time quantum, then goes to the back of the queue. Great for interactive/time-sharing systems; quantum size is a key tuning knob (too small = overhead, too large = degrades to FCFS).
• Priority Scheduling: highest priority runs first; low-priority jobs can starve — fixed with "aging" (gradually increasing priority over time).

TOP INTERVIEW QUESTIONS:
1. Process vs Thread? → Memory isolation (process) vs shared memory (threads in a process).
2. How does a context switch work? → Save/restore PCB/TCB state; happens on interrupt, syscall, or scheduler decision.
3. What is a zombie process? → Child finished executing but parent hasn't called wait() to reap its exit status.
4. What is a race condition? → Two threads access shared data concurrently and the result depends on timing/interleaving.
5. Mutex vs Semaphore? → Mutex is a binary lock owned and released by the same thread. Semaphore is a counting signal that any thread can increment/decrement.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Short Break", color: "break", tasks: ["Stretch, hydrate"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Setup", color: "project", tasks: ["Init FastAPI repo on GitHub", "Setup project structure", "Install dependencies: fastapi, uvicorn, sqlalchemy, psycopg2"], detail: {
        type: "project", project: "Project A: AI Code Review Agent — Setup",
        steps: `GOAL: Scaffold the FastAPI backend that will receive GitHub PR webhooks and run agent-based code review.

STEP 1: Create GitHub repo 'ai-code-reviewer' (public, MIT license, .gitignore: Python).

STEP 2: Project structure:
  ai-code-reviewer/
  ├── app/
  │   ├── main.py          # FastAPI entry point
  │   ├── models.py        # SQLAlchemy models
  │   ├── database.py      # DB connection/session
  │   └── webhook.py       # GitHub webhook handler (built Day 2)
  ├── requirements.txt
  ├── Dockerfile
  ├── docker-compose.yml
  └── .env.example

STEP 3: main.py skeleton:
from fastapi import FastAPI
app = FastAPI(title="AI Code Reviewer")

@app.get("/health")
def health():
    return {"status": "ok"}

STEP 4: requirements.txt — pin versions for reproducibility:
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
langchain==0.1.0
langgraph==0.0.40
python-dotenv==1.0.0

STEP 5: Run locally: uvicorn app.main:app --reload
STEP 6: Hit http://localhost:8000/health and confirm {"status": "ok"}
STEP 7: Commit + push: "chore: scaffold FastAPI project structure" `
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Relax, walk"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – REST API", color: "sd", tasks: ["REST API design principles", "HTTP methods, status codes", "Idempotency, versioning"], detail: {
        type: "sd", topic: "REST API Design",
        notes: `REST API FUNDAMENTALS:
• GET: read (idempotent, cacheable, no body). POST: create (NOT idempotent — calling twice creates two resources). PUT: full replace (idempotent). PATCH: partial update. DELETE: remove (idempotent).

STATUS CODES THAT MATTER:
• 200 OK, 201 Created, 204 No Content • 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity • 500 Internal Server Error, 503 Service Unavailable

IDEMPOTENCY: same request called N times produces the same end state as calling it once. GET/PUT/DELETE are idempotent by design; POST is not (unless you add an idempotency key — relevant for Project A's webhook handling, since GitHub may redeliver the same webhook event).

VERSIONING STRATEGIES:
• URI versioning: /api/v1/users (simplest, most common, what you'll use for Project A/B).
• Header versioning: Accept: application/vnd.api+json;version=1 — cleaner URLs but harder to test/share via browser.

RESOURCE DESIGN — use nouns, not verbs:
• ✅ GET /users/:id  ❌ GET /getUser/:id
• ✅ POST /reviews/:id/comments (nested resource under a parent)`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["No screens, family time"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies (Wellfound/LinkedIn/Naukri)", "Send 10 referral DMs to VIT alumni", "Target: Razorpay, Freshworks, Postman"], detail: null },
    ]
  },
  {
    day: 2, date: "Mon, 22 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS | Project A Setup",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Product of Array Except Self (Medium)", "Maximum Subarray – Kadane's (Medium)", "3Sum (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Product of Array Except Self", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/", solution: `// Java - O(n) time, O(1) extra space (output array doesn't count)
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    result[0] = 1;
    for (int i = 1; i < n; i++) result[i] = result[i-1] * nums[i-1]; // left products
    int right = 1;
    for (int i = n-1; i >= 0; i--) {
        result[i] *= right; // multiply by running right product
        right *= nums[i];
    }
    return result;
}` },
          { name: "Maximum Subarray – Kadane's", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/", solution: `// Java - Kadane's algorithm, O(n) time, O(1) space
public int maxSubArray(int[] nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
// Key: if currentSum goes negative, it's better to restart from the current element.` },
          { name: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/", solution: `// Java - Sort + Two Pointers, O(n^2) time, O(1) extra space
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue; // skip duplicate anchors
        int left = i+1, right = nums.length-1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Full break"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS", color: "cs", tasks: ["CPU Scheduling deep dive", "Virtual Memory & Paging", "Page replacement algorithms"], detail: {
        type: "cs", topic: "OS: CPU Scheduling Deep Dive & Virtual Memory",
        notes: `CPU SCHEDULING DEEP DIVE:
• Multilevel Feedback Queue: multiple queues with different priorities/quanta; processes move between queues based on behavior (CPU-bound jobs sink to lower-priority queues, I/O-bound jobs stay responsive).
• Turnaround time = completion time − arrival time. Waiting time = turnaround time − burst time. SJF minimizes average waiting time among non-preemptive algorithms.

VIRTUAL MEMORY & PAGING:
• Virtual memory gives each process the illusion of a large, contiguous, private address space, backed by physical RAM + disk (swap).
• Paging splits memory into fixed-size pages (commonly 4KB) and frames; a page table maps virtual pages → physical frames.
• TLB (Translation Lookaside Buffer): a cache of recent page table lookups — TLB miss means a costly page table walk.
• Page fault: requested page isn't in physical memory; OS loads it from disk. Thrashing happens when the system spends more time paging than executing.

PAGE REPLACEMENT ALGORITHMS:
• FIFO: evict the oldest page. Simple but can suffer Belady's Anomaly (more frames → more faults, counter-intuitively).
• LRU (Least Recently Used): evict the page unused for the longest time — good real-world performance, but requires tracking access history (expensive in pure hardware).
• Optimal (Belady's): evict the page that won't be used for the longest time in the future — theoretical best, used as a benchmark since it needs future knowledge.
• Clock algorithm: practical approximation of LRU using a reference bit and circular scan.

TOP INTERVIEW QUESTIONS:
1. What is thrashing and how do you fix it? → Excessive paging; fix by reducing the degree of multiprogramming or adding RAM.
2. Why is a page table needed if we have virtual memory? → It performs the actual virtual→physical address translation.
3. What's Belady's Anomaly? → FIFO can have MORE page faults with MORE frames, which is counter-intuitive.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – GitHub OAuth + DB", color: "project", tasks: ["Register GitHub OAuth App", "Parse PR webhook payload", "Setup PostgreSQL + SQLAlchemy models"], detail: {
        type: "project", project: "Project A: GitHub OAuth + Webhook Parsing + DB Setup",
        steps: `GOAL: Authenticate with GitHub, receive PR webhook events, and set up the database layer.

STEP 1: Register a GitHub OAuth App (Settings → Developer settings → OAuth Apps). Note the Client ID/Secret — store in .env, never commit them.

STEP 2: webhook.py — parse the GitHub PR webhook payload:
from fastapi import APIRouter, Request, Header
router = APIRouter()

@router.post("/webhook/github")
async def github_webhook(request: Request, x_github_event: str = Header(None)):
    payload = await request.json()
    if x_github_event == "pull_request":
        action = payload["action"]  # opened, synchronize, closed...
        pr_number = payload["pull_request"]["number"]
        repo = payload["repository"]["full_name"]
        diff_url = payload["pull_request"]["diff_url"]
        # queue this PR for review (built out Day 5-6)
    return {"received": True}

STEP 3: Verify webhook signatures using the webhook secret (HMAC-SHA256 over the raw body) — critical so random internet traffic can't trigger fake "reviews."

STEP 4: models.py — SQLAlchemy models:
class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True)
    repo = Column(String)
    pr_number = Column(Integer)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

STEP 5: database.py — engine + session setup using SQLAlchemy 2.0 style (create_engine, sessionmaker).

STEP 6: Run a local migration (Base.metadata.create_all or Alembic if you want versioned migrations) and confirm the \`reviews\` table exists in PostgreSQL.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – DB Indexing", color: "sd", tasks: ["B-tree indexes", "Composite & covering indexes", "Caching layers"], detail: {
        type: "sd", topic: "Database Indexing & Caching Layers",
        notes: `B-TREE INDEXES:
• Keep data sorted, O(log n) lookups, support range queries and ORDER BY efficiently — the default index type in PostgreSQL/MySQL.
• Without an index, every WHERE/JOIN on that column means a full table scan.

COMPOSITE & COVERING INDEXES:
• Composite index on (a, b): usable for filters on (a) or (a, b), NOT (b) alone — leftmost-prefix rule.
• Covering index: includes every column the query needs, so the DB satisfies the query entirely from the index without touching the table.

CACHING LAYERS:
• Cache-aside (lazy loading): app checks cache first; on miss, reads from DB and populates cache. Most common pattern, used for Project A's "Redis caching for unchanged files."
• Write-through: write goes to cache AND DB synchronously — keeps cache fresh but adds write latency.
• Write-behind (write-back): write goes to cache immediately, DB is updated asynchronously — fast writes, risk of data loss if the cache crashes before flushing.
• Cache invalidation strategies: TTL-based expiry (simple, can serve slightly stale data) vs explicit invalidation on write (fresher, more code complexity).`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 VIT alumni referral DMs", "Fintech focus: Razorpay, CRED, Groww"], detail: null },
    ]
  },
  {
    day: 3, date: "Tue, 23 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS | Project A Setup",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Merge Intervals (Medium)", "Rotate Array (Medium)", "Valid Palindrome (Easy)"], detail: {
        type: "dsa", items: [
          { name: "Merge Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/merge-intervals/", solution: `// Java - Sort by start, then merge overlapping, O(n log n) time
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}` },
          { name: "Rotate Array", difficulty: "Medium", link: "https://leetcode.com/problems/rotate-array/", solution: `// Java - reverse trick, O(n) time, O(1) space
public void rotate(int[] nums, int k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}
private void reverse(int[] nums, int left, int right) {
    while (left < right) {
        int tmp = nums[left]; nums[left] = nums[right]; nums[right] = tmp;
        left++; right--;
    }
}
// Reverse whole array, then reverse the two segments separately.` },
          { name: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", solution: `// Java - two pointers, skip non-alphanumeric, O(n) time, O(1) space
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
        left++; right--;
    }
    return true;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS", color: "cs", tasks: ["Deadlocks – 4 Coffman conditions", "Banker's Algorithm", "Mutex vs Semaphore"], detail: {
        type: "cs", topic: "OS: Deadlocks & Synchronization",
        notes: `DEADLOCKS — THE 4 COFFMAN CONDITIONS (all must hold simultaneously):
1. Mutual Exclusion — at least one resource is held in a non-shareable mode.
2. Hold and Wait — a process holds a resource while waiting for another.
3. No Preemption — resources can't be forcibly taken away.
4. Circular Wait — a cycle of processes each waiting on the next.
• Breaking ANY one of these prevents deadlock — this is the basis of deadlock prevention strategies.

BANKER'S ALGORITHM:
• A deadlock AVOIDANCE algorithm (not prevention). Before granting a resource request, it checks if the resulting state is "safe" — i.e., there exists some order in which all processes can finish.
• Requires advance knowledge of each process's maximum resource need.
• Time complexity O(n²·m) per request check (n processes, m resource types) — rarely used in production OSes due to this overhead and the need for advance declarations, but a classic interview topic.

MUTEX vs SEMAPHORE:
• Mutex: binary lock (locked/unlocked), ownership matters — only the thread that locked it can unlock it. Used for protecting a critical section.
• Semaphore: an integer counter with atomic increment (signal/V) and decrement (wait/P). A counting semaphore can allow N threads into a section; a binary semaphore (0/1) behaves like a mutex but without ownership — any thread can release it.
• Use mutex for "only one thread in this critical section." Use semaphore for "at most N threads" (e.g., connection pool limiting).

TOP INTERVIEW QUESTIONS:
1. Name the 4 Coffman conditions. → Mutual exclusion, hold-and-wait, no preemption, circular wait.
2. Deadlock prevention vs avoidance vs detection? → Prevention breaks a Coffman condition structurally; avoidance (Banker's) checks safety dynamically; detection lets deadlocks happen and recovers (kill/rollback a process).
3. Can a semaphore be negative? → Conceptually yes (count of waiting threads), though implementations often clamp at 0.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Docker", color: "project", tasks: ["Dockerize FastAPI + PostgreSQL", "docker-compose.yml setup", "Test locally with ngrok"], detail: {
        type: "project", project: "Project A: Dockerize + Local Webhook Testing",
        steps: `GOAL: Containerize the app and test the full webhook flow locally using ngrok to expose localhost to GitHub.

STEP 1: Dockerfile:
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

STEP 2: docker-compose.yml — app + PostgreSQL:
services:
  app:
    build: .
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/reviewer
    depends_on: [db]
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=reviewer
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes:
  pgdata:

STEP 3: docker-compose up --build — confirm both containers start and /health responds.

STEP 4: Install ngrok, run \`ngrok http 8000\` to get a public HTTPS URL tunneling to your local container.

STEP 5: In the GitHub repo you're testing against, add a webhook pointing to https://<ngrok-id>.ngrok.io/webhook/github, content type application/json, with your webhook secret.

STEP 6: Open a test PR, confirm the webhook fires and your FastAPI logs show the parsed payload. This local-tunnel-test loop is what you'll reuse all week before the real deploy on Day 12.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – JWT + Kafka", color: "sd", tasks: ["JWT structure & refresh tokens", "Kafka: partitions, consumer groups"], detail: {
        type: "sd", topic: "JWT & Kafka",
        notes: `JWT STRUCTURE & REFRESH TOKENS:
• JWT = header.payload.signature, base64-encoded. Header specifies algorithm (e.g., HS256/RS256); payload holds claims (user id, role, exp); signature verifies it hasn't been tampered with.
• Access token: short-lived (minutes), sent on every request. Refresh token: long-lived, stored securely (httpOnly cookie), used ONLY to get a new access token — minimizes the damage window if an access token leaks.
• RS256 (asymmetric) vs HS256 (symmetric): RS256 lets you verify a token with a public key without holding the private signing key — useful when multiple services need to verify tokens but only one auth service should issue them.

KAFKA — PARTITIONS & CONSUMER GROUPS:
• A Kafka topic is split into partitions for parallelism; each partition is an ordered, append-only log.
• Ordering is only guaranteed WITHIN a partition, not across the whole topic — a key design implication: if you need ordered processing for a given entity (e.g., all events for one PR), hash that entity's ID to consistently land in the same partition.
• Consumer group: a set of consumers that split partitions among themselves — each partition is read by exactly ONE consumer in the group at a time, enabling horizontal scaling of message processing while ensuring no partition is double-processed within that group.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies (FAANG priority)", "10 referral DMs", "Follow up Day 1 applications"], detail: null },
    ]
  },
  {
    day: 4, date: "Wed, 24 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS | Project A LangGraph",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Valid Anagram (Easy)", "Group Anagrams (Medium)", "Longest Palindromic Substring (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", solution: `// Java - char frequency count, O(n) time, O(1) space (fixed alphabet)
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}` },
          { name: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/", solution: `// Java - bucket by sorted-char key, O(n * k log k) time
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(groups.values());
}` },
          { name: "Longest Palindromic Substring", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/", solution: `// Java - expand around center, O(n^2) time, O(1) space
public String longestPalindrome(String s) {
    if (s.length() < 1) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expand(s, i, i);     // odd length
        int len2 = expand(s, i, i + 1); // even length
        int len = Math.max(len1, len2);
        if (len > end - start + 1) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}
private int expand(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--; right++;
    }
    return right - left - 1;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS", color: "cs", tasks: ["File Systems: inodes, ext4", "System Calls: fork, exec, signals", "IPC: pipes, sockets"], detail: {
        type: "cs", topic: "OS: File Systems, System Calls & IPC",
        notes: `FILE SYSTEMS — INODES & EXT4:
• An inode stores file metadata (permissions, owner, size, timestamps, pointers to data blocks) — NOT the filename. Filenames live in directory entries that map name → inode number.
• ext4 (Linux's default for years): uses extents (contiguous block ranges) instead of pure block pointers for efficiency, plus journaling for crash consistency.
• Journaling: writes are first logged to a journal before being committed to the main filesystem, so a crash mid-write can be recovered/replayed cleanly.

SYSTEM CALLS:
• fork(): creates a near-exact copy of the calling process (child gets a new PID but a logical copy of memory via copy-on-write).
• exec(): replaces the current process image with a new program (commonly used right after fork() to launch a different program in the child).
• signals: async notifications to a process (SIGKILL, SIGTERM, SIGINT, SIGSEGV). SIGKILL can't be caught or ignored; SIGTERM can be handled for graceful shutdown.

IPC (Inter-Process Communication):
• Pipes: unidirectional byte stream between related processes (e.g., parent-child); anonymous pipes don't persist beyond the processes.
• Named pipes (FIFOs): like pipes but have a filesystem path, so unrelated processes can use them.
• Sockets: bidirectional, can communicate across machines (network) or locally (Unix domain sockets) — the general-purpose IPC mechanism.
• Shared memory: fastest IPC (no copying through the kernel), but requires explicit synchronization (semaphores/mutexes) since multiple processes access the same memory.

TOP INTERVIEW QUESTIONS:
1. fork() vs exec()? → fork() duplicates the process; exec() replaces the process image. Commonly used together.
2. Pipe vs socket? → Pipes are typically local and unidirectional; sockets can be bidirectional and network-capable.
3. What does an inode NOT store? → The filename.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – LangGraph State", color: "project", tasks: ["Define AgentState with LangGraph", "PR diff + findings state graph"], detail: {
        type: "project", project: "Project A: LangGraph Agent State Design",
        steps: `GOAL: Define the shared state object that will flow through your multi-agent pipeline, and sketch the graph structure.

STEP 1: Define AgentState (the data every agent reads/writes as it flows through the graph):
from typing import TypedDict, List
class AgentState(TypedDict):
    pr_diff: str
    files_changed: List[str]
    bug_findings: List[dict]
    security_findings: List[dict]
    style_findings: List[dict]
    final_comment: str

STEP 2: Sketch the graph shape (built out over the coming days):
  fetch_diff → [bug_finder, security_agent, style_agent] (parallel, Day 9) → synthesizer (Day 10) → comment_poster (Day 11)

STEP 3: Build the skeleton graph with LangGraph:
from langgraph.graph import StateGraph, END
graph = StateGraph(AgentState)
graph.add_node("fetch_diff", fetch_diff_node)
graph.set_entry_point("fetch_diff")
graph.add_edge("fetch_diff", END)  # more nodes added in coming days
app_graph = graph.compile()

STEP 4: Write fetch_diff_node — given a PR's diff_url, download the raw diff text and populate pr_diff + files_changed in state.

STEP 5: Run the graph skeleton end-to-end with a sample PR diff and confirm state flows through correctly (print state at each node for now — proper logging comes later).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Microservices", color: "sd", tasks: ["API Gateway pattern", "Service mesh, sidecar", "SOLID principles"], detail: {
        type: "sd", topic: "Microservices: API Gateway & SOLID",
        notes: `API GATEWAY PATTERN:
• A single entry point that routes requests to the appropriate backend service, often also handling auth, rate limiting, request/response transformation, and logging — so individual services don't duplicate that cross-cutting logic.
• Trade-off: centralizes a useful chokepoint for cross-cutting concerns, but becomes a potential single point of failure/bottleneck if not made highly available.

SERVICE MESH & SIDECAR:
• Sidecar: a helper process deployed alongside each service instance (same pod in Kubernetes) handling networking concerns (retries, mTLS, observability) — the service code itself stays unaware of this infrastructure.
• Service mesh (e.g., Istio, Linkerd): the network of sidecars + a control plane, providing service-to-service traffic management, security, and observability uniformly across all services without each one reimplementing it.

SOLID PRINCIPLES (quick recap, foundational for Project A/B's agent architecture):
• Single Responsibility: a class/module should have one reason to change (each of your LangGraph agents — Bug Finder, Security, Code Style — should do ONE job).
• Open/Closed: open for extension, closed for modification (adding a new agent shouldn't require rewriting the orchestrator).
• Liskov Substitution: subtypes must be substitutable for their base type without breaking behavior.
• Interface Segregation: don't force a class to implement methods it doesn't need.
• Dependency Inversion: depend on abstractions, not concrete implementations (e.g., your agents should depend on an LLM client interface, not a specific provider's SDK directly).`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs", "Follow up Day 1-2 applications"], detail: null },
    ]
  },
  {
    day: 5, date: "Thu, 25 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS | Project A Agents",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Longest Substring Without Repeating (Medium)", "Min Window Substring (Hard)", "Find All Anagrams (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Longest Substring Without Repeating", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", solution: `// Java - sliding window with last-seen index map, O(n) time
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int maxLen = 0, windowStart = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (lastSeen.containsKey(c) && lastSeen.get(c) >= windowStart) {
            windowStart = lastSeen.get(c) + 1; // jump window start past the duplicate
        }
        lastSeen.put(c, i);
        maxLen = Math.max(maxLen, i - windowStart + 1);
    }
    return maxLen;
}` },
          { name: "Min Window Substring", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring/", solution: `// Java - sliding window with need/have counters, O(n) time
public String minWindow(String s, String t) {
    if (s.isEmpty() || t.isEmpty()) return "";
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    Map<Character, Integer> window = new HashMap<>();
    int have = 0, required = need.size();
    int[] best = {-1, 0, 0}; // length, left, right
    int left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue()) have++;
        while (have == required) {
            if (best[0] == -1 || right - left + 1 < best[0]) {
                best = new int[]{right - left + 1, left, right};
            }
            char lc = s.charAt(left);
            window.put(lc, window.get(lc) - 1);
            if (need.containsKey(lc) && window.get(lc) < need.get(lc)) have--;
            left++;
        }
    }
    return best[0] == -1 ? "" : s.substring(best[1], best[2] + 1);
}` },
          { name: "Find All Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", solution: `// Java - fixed sliding window with frequency array, O(n) time
public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (s.length() < p.length()) return result;
    int[] need = new int[26], window = new int[26];
    for (char c : p.toCharArray()) need[c - 'a']++;
    for (int i = 0; i < s.length(); i++) {
        window[s.charAt(i) - 'a']++;
        if (i >= p.length()) window[s.charAt(i - p.length()) - 'a']--;
        if (i >= p.length() - 1 && Arrays.equals(need, window)) result.add(i - p.length() + 1);
    }
    return result;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS", color: "cs", tasks: ["Linux Internals: /proc, cgroups", "Namespaces (Docker's foundation)", "Concurrency bugs: race conditions"], detail: {
        type: "cs", topic: "OS: Linux Internals & Concurrency Bugs",
        notes: `LINUX INTERNALS — /proc & cgroups:
• /proc is a virtual filesystem exposing kernel and process info in real time (e.g., /proc/[pid]/status, /proc/meminfo). Nothing here is actually on disk — it's generated on read.
• cgroups (control groups): kernel feature to limit, account for, and isolate resource usage (CPU, memory, I/O, network) of a group of processes. This is THE mechanism Docker/Kubernetes use to enforce container resource limits.

NAMESPACES (Docker's foundation):
• Namespaces isolate what a process CAN SEE: PID namespace (own process tree), network namespace (own network stack), mount namespace (own filesystem view), UTS (own hostname), IPC, user namespaces.
• Container = a process running with its own set of namespaces + cgroup limits. There's no "container" kernel object — it's namespaces (isolation) + cgroups (limits) + a layered filesystem (image).

CONCURRENCY BUGS — RACE CONDITIONS:
• A race condition occurs when the correctness of a program depends on the relative timing of concurrent operations.
• Classic example: two threads both read a counter as 5, both increment locally, both write back 6 — one increment is lost (should've been 7).
• Fix: use atomic operations (CAS - compare-and-swap), locks, or immutable data structures.
• Related bugs: deadlock (covered Day 3), livelock (threads keep changing state in response to each other but make no progress), starvation (a thread perpetually denied resources).

TOP INTERVIEW QUESTIONS:
1. What's the difference between a container and a VM? → VM virtualizes hardware (full OS per VM); container shares the host kernel via namespaces + cgroups (much lighter).
2. What is /proc used for? → Real-time introspection into kernel/process state without dedicated syscalls for everything.
3. How do you debug a race condition? → Reproduce under load/stress, use tools like ThreadSanitizer, add logging around shared-state mutations, review for missing locks around read-modify-write sequences.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Bug Finder Agent", color: "project", tasks: ["Build AST Parser tool", "Bug Finder Agent: detect null refs, logic errors", "Test on sample code"], detail: {
        type: "project", project: "Project A: AST Parser Tool + Bug Finder Agent",
        steps: `GOAL: Build the first real review agent — detects null references and basic logic errors using an AST (Abstract Syntax Tree) parser as a tool the LLM agent can call.

STEP 1: AST parser tool (using Python's built-in \`ast\` module as the example target language for testing, generalize later):
import ast
def parse_python_ast(code: str) -> ast.AST:
    return ast.parse(code)

def find_potential_null_refs(tree: ast.AST) -> list:
    # walk the tree looking for attribute access without a preceding None check
    findings = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Attribute):
            findings.append({"line": node.lineno, "issue": "potential null reference"})
    return findings

STEP 2: Bug Finder Agent node — combines the AST tool's structural findings with an LLM call for higher-level logic errors the AST alone can't catch:
def bug_finder_node(state: AgentState) -> AgentState:
    ast_findings = find_potential_null_refs(parse_python_ast(state["pr_diff"]))
    llm_findings = call_llm_for_logic_review(state["pr_diff"])  # prompt: "find logic errors in this diff"
    state["bug_findings"] = ast_findings + llm_findings
    return state

STEP 3: Add the node to the graph: graph.add_node("bug_finder", bug_finder_node)

STEP 4: Test on 2-3 sample code snippets with KNOWN bugs you've planted (e.g., a null dereference, an off-by-one) to sanity-check the agent actually catches them before testing on real PRs (Day 6).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – CAP Theorem", color: "sd", tasks: ["CAP theorem", "BASE vs ACID", "Eventual consistency"], detail: {
        type: "sd", topic: "CAP Theorem & Consistency Models",
        notes: `CAP THEOREM:
• In a distributed system, during a network Partition, you must choose between Consistency (every read gets the latest write) and Availability (every request gets a response, even if it might not be the latest data) — you can't have all three of C, A, P simultaneously when a partition actually occurs.
• Note the common misconception: CAP is about behavior DURING a partition, not a permanent architectural choice — a CP system still wants to be available when there's no partition.

BASE vs ACID:
• ACID (traditional RDBMS): Atomicity, Consistency, Isolation, Durability — strong guarantees, often at the cost of availability/scale.
• BASE (common in distributed NoSQL systems): Basically Available, Soft state, Eventually consistent — favors availability and partition tolerance, accepts that data might be briefly inconsistent across replicas.

EVENTUAL CONSISTENCY:
• Given enough time without new writes, all replicas converge to the same value — but there's no bound on HOW MUCH data might be stale in the meantime (though most systems converge within milliseconds-to-seconds in practice).
• Practical example relevant to your projects: if Project B's RAG Q&A agent reads from a vector DB that was just updated, eventual consistency might mean a query right after an upload momentarily misses the newest chunk — worth knowing as a real trade-off, not just textbook theory.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "AI startups: Sarvam, Krutrim, Glean", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 6, date: "Fri, 26 Jun", week: 1,
    weekTheme: "Arrays + Strings | OS Revision | Project A Testing",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["String Compression (Easy)", "First Unique Character (Easy)", "Binary Search (Easy)"], detail: {
        type: "dsa", items: [
          { name: "String Compression", difficulty: "Easy", link: "https://leetcode.com/problems/string-compression/", solution: `// Java - two pointers in place, O(n) time, O(1) space
public int compress(char[] chars) {
    int write = 0, read = 0;
    while (read < chars.length) {
        char current = chars[read];
        int count = 0;
        while (read < chars.length && chars[read] == current) { read++; count++; }
        chars[write++] = current;
        if (count > 1) {
            for (char c : String.valueOf(count).toCharArray()) chars[write++] = c;
        }
    }
    return write;
}` },
          { name: "First Unique Character", difficulty: "Easy", link: "https://leetcode.com/problems/first-unique-character-in-a-string/", solution: `// Java - frequency count then scan, O(n) time
public int firstUniqChar(String s) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (int i = 0; i < s.length(); i++) {
        if (count[s.charAt(i) - 'a'] == 1) return i;
    }
    return -1;
}` },
          { name: "Binary Search", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search/", solution: `// Java - classic binary search, O(log n) time
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – OS Revision", color: "cs", tasks: ["OS Revision: 25 rapid-fire questions", "Kernel: user space vs kernel space", "Full OS concept review"], detail: {
        type: "cs", topic: "OS Revision: Full Concept Review",
        notes: `FULL OS REVISION — RAPID FIRE FORMAT (write answers from memory, then check):

1. What is the kernel and what's the difference between kernel space and user space?
   → Kernel = the core of the OS managing hardware, memory, processes. Kernel space has full hardware access privilege; user space (where normal apps run) is restricted and must go through system calls to request kernel services.

2. Process states? → New → Ready → Running → Waiting/Blocked → Terminated.

3. What triggers a context switch? → Timer interrupt, I/O block, syscall, higher-priority process ready, voluntary yield.

4. Compare scheduling algorithms: FCFS (simple, convoy effect) vs SJF (optimal avg wait, needs burst-time prediction) vs Round Robin (fair, good for interactive systems) vs Priority (can starve, fixed with aging).

5. What's virtual memory and why do we need it? → Abstraction giving each process its own large address space; enables isolation, allows running programs larger than physical RAM, simplifies memory management.

6. Page fault vs segmentation fault? → Page fault = page not in RAM, OS loads it (recoverable). Segfault = illegal memory access (e.g., null pointer, out of bounds) — process is killed.

7. The 4 Coffman conditions for deadlock? → Mutual exclusion, hold-and-wait, no preemption, circular wait.

8. Mutex vs semaphore vs monitor? → Mutex: binary lock with ownership. Semaphore: counting signal, no ownership. Monitor: higher-level construct bundling a lock + condition variables around shared data (e.g., Java's synchronized).

9. What is an inode? → Metadata structure for a file (permissions, size, block pointers) — NOT the name.

10. fork() vs exec() vs wait()? → fork() duplicates process, exec() replaces process image, wait() lets parent block until child terminates (reaping it, avoiding zombies).

This is a great checkpoint day — if any of these feel shaky, that's the signal to go back and re-read Day 1-5 notes before moving to DBMS week.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Test + LangChain Output", color: "project", tasks: ["Test Bug Finder on 5 open-source PRs", "LangChain structured output {bug, line, severity}", "Fix prompt issues based on results"], detail: {
        type: "project", project: "Project A: Test Bug Finder + Structured LLM Output",
        steps: `GOAL: Validate the Bug Finder agent against real open-source PRs and tighten the LLM's output into a structured, parseable format.

STEP 1: Pick 5 real open-source PRs (small-to-medium diffs, from repos you're familiar with) — run them through the Bug Finder agent end-to-end.

STEP 2: Structured output via LangChain — instead of parsing free-text LLM responses, force a schema:
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class BugFinding(BaseModel):
    bug: str
    line: int
    severity: str  # Critical, High, Medium, Low

parser = PydanticOutputParser(pydantic_object=BugFinding)
# include parser.get_format_instructions() in your prompt template

STEP 3: Update the LLM call to use this parser, so output is reliably {bug, line, severity} dicts instead of free text you have to regex out.

STEP 4: Review results from the 5 PRs — note false positives/negatives. Common issues to fix: prompt being too aggressive (flagging stylistic choices as "bugs") or too lenient (missing genuine null-ref risks the AST tool already surfaced).

STEP 5: Iterate on the prompt template based on what you observe — this is the most important step; agent quality comes from this feedback loop, not from a perfect first prompt.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – URL Shortener", color: "sd", tasks: ["Design URL Shortener (full HLD 45 min)", "Hash collision handling", "301 vs 302 redirect"], detail: {
        type: "sd", topic: "URL Shortener — Full HLD",
        notes: `FULL 45-MIN DESIGN: URL SHORTENER

REQUIREMENTS:
• Functional: shorten a long URL, redirect short→long, optional custom alias, optional expiry.
• Non-functional: high read:write ratio (~100:1), low redirect latency, high availability.

BACK-OF-ENVELOPE ESTIMATION:
• Say 100M new URLs/month → ~40 URLs/sec write, ~4000 redirects/sec read (100:1 ratio) — this read-heavy skew is the single most important number driving the design (heavy caching).

HIGH-LEVEL DESIGN:
• API layer → Cache (Redis, cache-aside) → DB (short_code as PK).
• Short code generation: base62-encode an auto-incrementing ID (simplest, collision-free) — a 7-character base62 code supports 62^7 ≈ 3.5 trillion unique URLs.

HASH COLLISION HANDLING (if using a hash-based approach instead of auto-increment):
• On collision, append a counter/salt and re-hash, or simply check-and-retry against the DB's unique constraint.

301 vs 302 REDIRECT:
• 301 (permanent): browsers cache it, fewer hits to your server on repeat clicks, but you lose click analytics for cached redirects.
• 302 (temporary): every click hits your server — worse for server load, but accurate analytics. Most production URL shorteners use 302 specifically because click tracking is a core feature.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "Follow up week's applications", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 7, date: "Sat, 27 Jun", week: 1,
    weekTheme: "WEEK 1 REVISION DAY",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–11:30 AM", emoji: "💻", label: "DSA Revision", color: "dsa", tasks: ["Redo 3 weakest Arrays/Strings", "Timed LeetCode contest 90 min"], detail: null },
      { time: "11:30–1:00 PM", emoji: "🟢", label: "CS Rapid-fire", color: "cs", tasks: ["25 OS interview questions timed 30 min", "Write answers from memory"], detail: {
        type: "cs", topic: "OS Rapid-Fire: 25 Interview Questions (Timed)",
        notes: `TIMED DRILL — 25 OS QUESTIONS IN 30 MINUTES. Write your answers from memory first, THEN check against notes. The goal isn't perfect recall — it's noticing which gaps need work before DBMS week starts.

Core areas to expect questions from:
• Process/thread lifecycle and states
• Scheduling algorithm trade-offs (and when you'd pick one over another)
• Memory management: paging, segmentation, virtual memory, TLB
• Synchronization primitives: mutex, semaphore, monitor, spinlock
• Deadlock: conditions, prevention vs avoidance vs detection
• File systems and I/O
• Concurrency bugs: race conditions, deadlock, livelock, starvation

SAMPLE QUESTION SET (use these as your 25, supplement with your own weak spots):
1. Process vs Program vs Thread?
2. What's a PCB (Process Control Block)?
3. Explain the producer-consumer problem and how you'd solve it.
4. What's the dining philosophers problem and what does it illustrate?
5. Internal vs external fragmentation?
6. What's a spinlock and when would you use one over a mutex?
7. What's copy-on-write and where is it used (hint: fork())?
8. Explain demand paging.
9. What's a critical section?
10. How does the OS prevent one process from accessing another's memory?

GRADING RUBRIC: For each answer, score yourself 0 (blank) / 1 (partial) / 2 (confident & correct). Anything below 1.5 average on a topic cluster = flag it for the Day 13 and Day 19 revision blocks.`
      } },
      { time: "1:00–2:00 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "2:00–3:30 PM", emoji: "🔴", label: "Project Polish", color: "project", tasks: ["Connect Bug Finder → PR comment formatter", "Push clean code to GitHub", "Test full flow end-to-end"], detail: {
        type: "project", project: "Project A: Connect Pipeline End-to-End + Polish",
        steps: `GOAL: Wire the Bug Finder agent's output into a readable PR comment, and verify the full webhook → agent → output flow works end to end.

STEP 1: PR comment formatter — turn structured findings into a human-readable Markdown comment:
def format_comment(findings: list) -> str:
    if not findings:
        return "✅ No issues found by AI Code Reviewer."
    lines = ["## 🤖 AI Code Review\\n"]
    for f in findings:
        emoji = {"Critical": "🔴", "High": "🟠", "Medium": "🟡", "Low": "🟢"}[f["severity"]]
        lines.append(f"{emoji} **Line {f['line']}**: {f['bug']}")
    return "\\n".join(lines)

STEP 2: Connect: fetch_diff → bug_finder → format_comment as graph nodes, in sequence (parallel agents come Day 9).

STEP 3: Push clean, reviewed code — this is a natural checkpoint to clean up: remove debug prints, add docstrings to each node function, make sure .env.example documents every required variable.

STEP 4: Full end-to-end test: open a real test PR on your tunnel-connected repo, confirm the webhook fires, the graph runs, and a properly formatted comment is generated (posting it for real comes Day 11 — for now, log the formatted comment to confirm it's correct).

STEP 5: This is Week 1's project checkpoint — by end of today you should have: webhook ingestion, diff fetching, one working agent (Bug Finder), and a formatted output, all connected as a single graph.`
      } },
      { time: "3:30–5:30 PM", emoji: "🟡", label: "HR Prep", color: "sd", tasks: ["Write 'Tell me about yourself' script", "Record and review it", "Write 3 STAR stories"], detail: {
        type: "sd", topic: "HR Prep: Tell Me About Yourself + STAR Stories",
        notes: `"TELL ME ABOUT YOURSELF" SCRIPT STRUCTURE (60-90 seconds, not longer):
1. Present: who you are right now (e.g., "I'm a backend-leaning full-stack engineer who's spent the last month building two production-grade AI agent systems...").
2. Past: relevant background that led here (VIT, prior projects/experience, what pulled you toward AI/backend engineering).
3. Future: what you're looking for next and why THIS type of role/company fits.
• Avoid reciting your resume line by line — the interviewer has already read it. This answer is about narrative and motivation, not a list of facts.

STAR METHOD FOR BEHAVIORAL STORIES:
• Situation: brief context (1-2 sentences).
• Task: what was YOUR specific responsibility.
• Action: what YOU did, specifically (most candidates under-detail this part — be concrete about decisions you made).
• Result: quantified outcome where possible, plus what you learned.

3 STORIES TO PREPARE TODAY (draft now, refine as Project A/B give you fresh material):
1. A time you solved a hard technical problem (can reference Project A's agent architecture once built).
2. A time you handled disagreement or conflicting feedback.
3. A time you failed or something didn't work, and what you changed afterward (interviewers specifically probe for self-awareness here — don't pick a fake-failure "I worked too hard" answer).

RECORD YOURSELF: watching/listening back reveals filler words ("um," "like"), pacing issues, and whether the story actually lands in under 2 minutes.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "5:30–7:00 PM", emoji: "💼", label: "Jobs Review", color: "jobs", tasks: ["Review application pipeline", "Respond to all replies", "Log all pending"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
    ]
  },
  {
    day: 8, date: "Sun, 28 Jun", week: 2,
    weekTheme: "Sliding Window + Recursion | DBMS | Project A Agents",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Max Consecutive Ones III (Medium)", "Longest Repeating Char Replacement (Medium)", "Subsets (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Max Consecutive Ones III", difficulty: "Medium", link: "https://leetcode.com/problems/max-consecutive-ones-iii/", solution: `// Java - sliding window allowing k zero-flips, O(n) time
public int longestOnes(int[] nums, int k) {
    int left = 0, zeros = 0, maxLen = 0;
    for (int right = 0; right < nums.length; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > k) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}` },
          { name: "Longest Repeating Char Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", solution: `// Java - sliding window, track max char frequency, O(n) time
public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int left = 0, maxCount = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        count[s.charAt(right) - 'A']++;
        maxCount = Math.max(maxCount, count[s.charAt(right) - 'A']);
        while (right - left + 1 - maxCount > k) {
            count[s.charAt(left) - 'A']--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}` },
          { name: "Subsets", difficulty: "Medium", link: "https://leetcode.com/problems/subsets/", solution: `// Java - backtracking, O(2^n) time
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, 0);
    return result;
}
private void backtrack(List<List<Integer>> result, List<Integer> current, int[] nums, int start) {
    result.add(new ArrayList<>(current));
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(result, current, nums, i + 1);
        current.remove(current.size() - 1); // undo choice
    }
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – DBMS", color: "cs", tasks: ["Relational Model: PKs, FKs", "SQL Deep Dive: JOINs, GROUP BY, window functions"], detail: {
        type: "cs", topic: "DBMS: Relational Model & SQL Deep Dive",
        notes: `RELATIONAL MODEL:
• Primary Key (PK): uniquely identifies a row, can't be NULL, immutable in practice.
• Foreign Key (FK): a column referencing another table's PK, enforces referential integrity (can't insert a child row pointing to a non-existent parent).
• Candidate key: any column set that COULD be a PK (unique + minimal). Composite key: a PK made of multiple columns.

SQL DEEP DIVE — JOINs:
• INNER JOIN: only matching rows from both tables.
• LEFT JOIN: all rows from left table + matches from right (NULL if no match).
• RIGHT JOIN: mirror of LEFT JOIN.
• FULL OUTER JOIN: all rows from both, matched where possible.
• SELF JOIN: a table joined to itself (e.g., employee → manager hierarchy).

GROUP BY & WINDOW FUNCTIONS:
• GROUP BY collapses rows into aggregates (COUNT, SUM, AVG) per group; HAVING filters AFTER aggregation (WHERE filters before).
• Window functions (OVER (PARTITION BY ... ORDER BY ...)) compute aggregates WITHOUT collapsing rows — e.g., RANK(), ROW_NUMBER(), running totals with SUM() OVER (ORDER BY date).
• Classic use case: "top 3 orders per customer" → ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC) <= 3.

TOP INTERVIEW QUESTIONS:
1. WHERE vs HAVING? → WHERE filters rows before grouping; HAVING filters groups after aggregation.
2. What's the difference between a window function and GROUP BY? → GROUP BY reduces row count; window functions preserve all rows while adding computed columns.
3. Why use a composite key vs a surrogate (auto-increment) key? → Composite reflects natural uniqueness but can be unwieldy in FKs; surrogate keys are simpler and stable even if business logic for uniqueness changes.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Security Agent", color: "project", tasks: ["Security Agent: OWASP Top 10", "SQL injection/XSS/secrets detection"], detail: {
        type: "project", project: "Project A: Security Agent — OWASP Top 10 Detection",
        steps: `GOAL: Build the second specialized agent — detects security issues (SQL injection, XSS, hardcoded secrets) following SOLID's single-responsibility principle (this agent does ONE job, same as Bug Finder).

STEP 1: Define detection patterns as a starting heuristic layer (combined with LLM review, same pattern as Bug Finder Day 5):
SECRET_PATTERNS = [
    r'(?i)api[_-]?key\\s*=\\s*["\\'][a-zA-Z0-9]{16,}["\\']',
    r'(?i)password\\s*=\\s*["\\'][^"\\']{4,}["\\']',
    r'(?i)aws_secret_access_key\\s*=\\s*["\\'][^"\\']+["\\']',
]
def find_hardcoded_secrets(diff: str) -> list:
    findings = []
    for pattern in SECRET_PATTERNS:
        for match in re.finditer(pattern, diff):
            findings.append({"line": diff[:match.start()].count('\\n') + 1, "issue": "possible hardcoded secret"})
    return findings

STEP 2: SQL injection / XSS detection prompt for the LLM layer — ask it specifically to check for unparameterized queries and unescaped output rendering, referencing the patterns from your System Design notes (Day 22 deep-dives this further).

STEP 3: security_agent_node — same shape as bug_finder_node: combine pattern-matching findings with LLM findings into state["security_findings"], using the same Pydantic structured-output schema from Day 6.

STEP 4: Add the node to the graph (still sequential for now — parallel execution is Day 9).

STEP 5: Test on the same 5 PRs from Day 6 plus 1-2 you specifically construct with a planted SQL injection or hardcoded API key, to confirm detection actually works before trusting it on real code.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Twitter Feed", color: "sd", tasks: ["Twitter News Feed design", "Fan-out on write vs read"], detail: {
        type: "sd", topic: "Twitter News Feed Design",
        notes: `TWITTER NEWS FEED — FAN-OUT TRADE-OFFS:

FAN-OUT ON WRITE (push model):
• When a user posts, the post is immediately pushed into the precomputed feed cache of every follower.
• Pro: feed reads are fast (just read your precomputed feed). Con: a user with 50M followers triggers 50M cache writes per post — the "celebrity problem."

FAN-OUT ON READ (pull model):
• Feed is assembled at read time: query all accounts you follow for recent posts, merge and sort by time.
• Pro: cheap writes regardless of follower count. Con: expensive reads, especially for users following thousands of accounts — every feed load does a fan-in across many sources.

HYBRID (what large-scale systems actually use):
• Fan-out on write for regular users (most accounts have a manageable follower count).
• Fan-out on read (or a separate path) for celebrity/high-follower accounts — their posts are merged into followers' feeds at READ time instead of write time, avoiding the write amplification.
• This hybrid is one of the most commonly cited "aha" answers in system design interviews — knowing WHY a pure approach breaks down (not just naming both options) is what differentiates a strong answer.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies (Fintech: Razorpay, CRED, Groww)", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 9, date: "Mon, 29 Jun", week: 2,
    weekTheme: "Sliding Window + Recursion | DBMS | Project A Agents",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Combination Sum (Medium)", "Combination Sum II (Medium)", "Generate Parentheses (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Combination Sum", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum/", solution: `// Java - backtracking, allow reuse of same element
public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), candidates, target, 0);
    return result;
}
private void backtrack(List<List<Integer>> result, List<Integer> current, int[] candidates, int remaining, int start) {
    if (remaining == 0) { result.add(new ArrayList<>(current)); return; }
    if (remaining < 0) return;
    for (int i = start; i < candidates.length; i++) {
        current.add(candidates[i]);
        backtrack(result, current, candidates, remaining - candidates[i], i); // i, not i+1: reuse allowed
        current.remove(current.size() - 1);
    }
}` },
          { name: "Combination Sum II", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum-ii/", solution: `// Java - backtracking, sort + skip duplicates, each element used once
public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), candidates, target, 0);
    return result;
}
private void backtrack(List<List<Integer>> result, List<Integer> current, int[] cand, int remaining, int start) {
    if (remaining == 0) { result.add(new ArrayList<>(current)); return; }
    for (int i = start; i < cand.length; i++) {
        if (i > start && cand[i] == cand[i-1]) continue; // skip duplicate siblings
        if (cand[i] > remaining) break;
        current.add(cand[i]);
        backtrack(result, current, cand, remaining - cand[i], i + 1); // i+1: no reuse
        current.remove(current.size() - 1);
    }
}` },
          { name: "Generate Parentheses", difficulty: "Medium", link: "https://leetcode.com/problems/generate-parentheses/", solution: `// Java - backtracking with open/close counters
public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}
private void backtrack(List<String> result, StringBuilder sb, int open, int close, int max) {
    if (sb.length() == max * 2) { result.add(sb.toString()); return; }
    if (open < max) {
        sb.append('('); backtrack(result, sb, open + 1, close, max); sb.deleteCharAt(sb.length() - 1);
    }
    if (close < open) {
        sb.append(')'); backtrack(result, sb, open, close + 1, max); sb.deleteCharAt(sb.length() - 1);
    }
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – DBMS", color: "cs", tasks: ["Indexing: B-tree, composite, covering", "Query optimization: EXPLAIN", "PostgreSQL query plans"], detail: {
        type: "cs", topic: "DBMS: Indexing & Query Optimization",
        notes: `INDEXING — B-TREE:
• A B-tree index keeps data sorted and allows O(log n) lookups, range scans, and ordered traversal — this is why most relational DB indexes (PostgreSQL, MySQL InnoDB) default to B-tree (technically B+tree).
• Composite index: an index on multiple columns (col1, col2) — usable for queries filtering on col1 alone, or col1+col2, but NOT col2 alone (leftmost-prefix rule).
• Covering index: an index that contains ALL columns needed by a query, so the DB never touches the actual table (avoids the extra "heap fetch").

QUERY OPTIMIZATION — EXPLAIN:
• EXPLAIN (or EXPLAIN ANALYZE in Postgres) shows the query plan: which indexes are used, join algorithms (nested loop, hash join, merge join), and estimated/actual row counts.
• Seq Scan = full table scan (bad for large tables unless intentional, e.g., reading a tiny table). Index Scan / Index Only Scan = using an index (good).
• Common fix when EXPLAIN shows a Seq Scan: add an index on the filtered/joined column, or check if the planner's row estimate is stale (run ANALYZE to refresh statistics).

POSTGRESQL QUERY PLANS:
• The planner picks a strategy based on cost estimates (I/O + CPU), not always the "obviously fastest" one to a human — sometimes a seq scan beats an index scan if most of the table matches the filter.
• Nested Loop join: good for small outer table + indexed inner table. Hash Join: good for larger unsorted joins. Merge Join: good when both sides are already sorted on the join key.

TOP INTERVIEW QUESTIONS:
1. When would an index NOT help? → Low-selectivity columns (e.g., boolean flag with 50/50 split), or when the table is small enough that a seq scan is cheaper.
2. What's the leftmost-prefix rule? → A composite index on (a, b, c) can serve queries filtering on (a), (a,b), or (a,b,c), but not (b) or (c) alone.
3. Why run ANALYZE after a bulk insert? → Updates table statistics so the query planner makes accurate cost estimates.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Code Style Agent + Parallel", color: "project", tasks: ["Code Style Agent: naming, complexity, dead code", "LangGraph parallel execution for all 3 agents"], detail: {
        type: "project", project: "Project A: Code Style Agent + Parallel Execution",
        steps: `GOAL: Build the third agent (Code Style) and convert the pipeline from sequential to parallel execution for all 3 agents — a meaningful architecture upgrade.

STEP 1: Code Style Agent — checks naming conventions, cyclomatic complexity, and dead code:
def style_agent_node(state: AgentState) -> AgentState:
    findings = []
    findings += check_naming_conventions(state["pr_diff"])
    findings += check_complexity(state["pr_diff"])  # e.g., functions over N branches
    findings += llm_check_dead_code(state["pr_diff"])
    state["style_findings"] = findings
    return state

STEP 2: LangGraph parallel execution — instead of bug_finder → security_agent → style_agent running one after another, fan them out to run concurrently since they're independent (none depends on another's output):
graph.add_node("bug_finder", bug_finder_node)
graph.add_node("security_agent", security_agent_node)
graph.add_node("style_agent", style_agent_node)
graph.add_edge("fetch_diff", "bug_finder")
graph.add_edge("fetch_diff", "security_agent")
graph.add_edge("fetch_diff", "style_agent")
# all three then converge into the synthesizer node (built Day 10)

STEP 3: This fan-out pattern is exactly the SOLID Open/Closed principle in action from your Day 4 SD notes — adding the Style Agent didn't require modifying Bug Finder or Security Agent at all.

STEP 4: Measure the latency improvement: time the pipeline before (sequential) vs after (parallel) on the same test PR — this latency number is great material for your Day 13 README and resume bullet.

STEP 5: Test the full 3-agent parallel pipeline on 2-3 PRs, confirm all three findings lists populate correctly in the final state.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – WhatsApp", color: "sd", tasks: ["WhatsApp messaging design", "WebSockets, delivery receipts"], detail: {
        type: "sd", topic: "WhatsApp Messaging Design",
        notes: `WHATSAPP — WEBSOCKETS & DELIVERY RECEIPTS:

CONNECTION MODEL:
• Each online client maintains a persistent WebSocket connection to a chat server. Chat servers are typically behind a connection-aware load balancer (sticky routing, since the WS connection must stay on the same server instance).

MESSAGE FLOW:
1. Sender → chat server (over their WebSocket).
2. Chat server looks up which server the recipient is connected to (via a presence/routing service) and forwards the message.
3. If the recipient is offline, the message is persisted to a queue/store and delivered on reconnect.

DELIVERY RECEIPTS (single/double/blue check):
• Single check: server received the message from the sender.
• Double check: message was delivered to the recipient's device.
• Blue check: recipient's client marked it as read (a separate explicit signal sent back from the recipient).
• Each is a distinct state transition that must be tracked per message, and these signals flow backward (recipient → server → sender) as separate small messages.

SCALE CONSIDERATIONS:
• Billions of messages/day means the message store needs to be horizontally partitioned (e.g., by conversation ID), and presence (who's online, and on which server) needs its own fast lookup service, typically backed by something like Redis for low-latency reads.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs", "Review pipeline"], detail: null },
    ]
  },
  {
    day: 10, date: "Tue, 30 Jun", week: 2,
    weekTheme: "Sliding Window + Recursion | DBMS | Project A Agents",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Permutations (Medium)", "Search Rotated Sorted Array (Medium)", "Find Minimum in Rotated Sorted Array (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Permutations", difficulty: "Medium", link: "https://leetcode.com/problems/permutations/", solution: `// Java - backtracking with a "used" marker, O(n!) time
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, new boolean[nums.length]);
    return result;
}
private void backtrack(List<List<Integer>> result, List<Integer> current, int[] nums, boolean[] used) {
    if (current.size() == nums.length) { result.add(new ArrayList<>(current)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(result, current, nums, used);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}` },
          { name: "Search Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", solution: `// Java - modified binary search, O(log n) time
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}` },
          { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", solution: `// Java - binary search against rightmost element, O(log n) time
public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) left = mid + 1; // min is in right half
        else right = mid;
    }
    return nums[left];
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – DBMS", color: "cs", tasks: ["Transactions: ACID properties", "Isolation levels", "2PL, MVCC in PostgreSQL"], detail: {
        type: "cs", topic: "DBMS: Transactions & ACID",
        notes: `ACID PROPERTIES:
• Atomicity: a transaction is all-or-nothing — if any part fails, the whole thing rolls back.
• Consistency: a transaction takes the DB from one valid state to another (constraints, triggers, FKs all hold before and after).
• Isolation: concurrent transactions don't interfere with each other's intermediate state.
• Durability: once committed, changes survive crashes (typically via write-ahead logging).

ISOLATION LEVELS (weakest to strongest):
• Read Uncommitted: can see uncommitted changes from other transactions ("dirty reads") — rarely used.
• Read Committed: only sees committed data, but a re-read within the same transaction can see different data ("non-repeatable read"). PostgreSQL's default.
• Repeatable Read: same query returns the same rows throughout the transaction, but new rows from other commits could appear ("phantom read").
• Serializable: transactions behave as if executed one at a time — strongest guarantee, but most likely to cause conflicts/retries.

CONCURRENCY CONTROL — 2PL & MVCC:
• 2PL (Two-Phase Locking): a transaction acquires locks (growing phase) then releases them (shrinking phase) — never acquires after releasing. Guarantees serializability but can cause blocking/deadlocks.
• MVCC (Multi-Version Concurrency Control): instead of locking on read, the DB keeps multiple versions of a row; each transaction sees a consistent snapshot. PostgreSQL uses MVCC — readers don't block writers and vice versa.

TOP INTERVIEW QUESTIONS:
1. What's a phantom read? → A transaction re-runs a range query and sees NEW rows that committed in between (not present in repeatable-read level, possible in read-committed).
2. Why does PostgreSQL use MVCC instead of pure locking? → Massively improves read concurrency — readers never block writers.
3. Dirty read vs non-repeatable read vs phantom read — order them by severity? → Dirty read (worst, sees uncommitted data) > non-repeatable read > phantom read (mildest).`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Synthesizer + Scoring", color: "project", tasks: ["Synthesizer Agent: combine all findings", "Severity scoring: Critical/High/Med/Low", "Test on 10 real PRs"], detail: {
        type: "project", project: "Project A: Synthesizer Agent + Severity Scoring",
        steps: `GOAL: Build the convergence node that combines all 3 agents' findings into one coherent, prioritized report.

STEP 1: Synthesizer node — merges bug_findings + security_findings + style_findings, deduplicates overlapping findings (e.g., if Bug Finder and Security Agent both flag the same line), and sorts by severity:
def synthesizer_node(state: AgentState) -> AgentState:
    all_findings = state["bug_findings"] + state["security_findings"] + state["style_findings"]
    deduped = deduplicate_by_line(all_findings)
    severity_order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}
    deduped.sort(key=lambda f: severity_order[f["severity"]])
    state["final_comment"] = format_comment(deduped)
    return state

STEP 2: Severity scoring rubric (make this explicit and consistent across all 3 agents' prompts):
  Critical = security vulnerability or guaranteed runtime crash
  High = likely bug affecting correctness
  Medium = code smell / maintainability issue
  Low = style nit / suggestion

STEP 3: Wire the synthesizer as the convergence point in the graph (all 3 parallel agents → synthesizer → END for now, comment posting is Day 11):
graph.add_edge("bug_finder", "synthesizer")
graph.add_edge("security_agent", "synthesizer")
graph.add_edge("style_agent", "synthesizer")

STEP 4: Test on 10 real PRs — this is your largest test batch yet. Track: average findings per PR, severity distribution, and any obviously wrong/noisy findings to fix before the Day 11-12 deploy steps.

STEP 5: This synthesizer is your project's "supervisor" pattern — note how it never re-analyzes code itself, it only combines and ranks what the specialist agents already found (good material for explaining your architecture in interviews).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Google Drive", color: "sd", tasks: ["Google Drive design", "File chunking, dedup, sync"], detail: {
        type: "sd", topic: "Google Drive Design — Intro",
        notes: `GOOGLE DRIVE — INTRO PASS (deep dive comes back on Day 24):

FILE CHUNKING:
• Large files are split into fixed-size chunks (e.g., 4MB) before upload — enables resumable uploads (retry only the failed chunk) and parallel chunk uploads.

DEDUPLICATION:
• Hash each chunk's content; if an identical hash already exists in storage, just add a reference instead of storing the bytes again. This is content-addressable storage — massively reduces storage cost when many users have copies of the same file.

SYNC:
• Client keeps a local index of file/chunk states. On any change, it diffs against the last known state and uploads only the changed chunks — this is why editing a small part of a huge file syncs fast rather than re-uploading everything.

INITIAL HIGH-LEVEL ARCHITECTURE:
• Metadata service (file tree, permissions, versions) — needs strong consistency.
• Blob storage service (the actual chunk bytes) — can be eventually consistent, optimized for durability and cost.
• Sync client — runs locally, talks to both services.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies (follow up Week 1)", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 11, date: "Wed, 01 Jul", week: 2,
    weekTheme: "Binary Search | DBMS | Project A Deploy",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Koko Eating Bananas (Medium)", "Capacity to Ship Packages (Medium)", "Find Peak Element (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Koko Eating Bananas", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/", solution: `// Java - binary search on the answer (eating speed), O(n log m) time
public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = Arrays.stream(piles).max().getAsInt();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (hoursNeeded(piles, mid) <= h) right = mid;
        else left = mid + 1;
    }
    return left;
}
private long hoursNeeded(int[] piles, int speed) {
    long hours = 0;
    for (int p : piles) hours += (p + speed - 1) / speed; // ceil division
    return hours;
}` },
          { name: "Capacity to Ship Packages", difficulty: "Medium", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", solution: `// Java - binary search on capacity, O(n log(sum)) time
public int shipWithinDays(int[] weights, int days) {
    int left = Arrays.stream(weights).max().getAsInt();
    int right = Arrays.stream(weights).sum();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (daysNeeded(weights, mid) <= days) right = mid;
        else left = mid + 1;
    }
    return left;
}
private int daysNeeded(int[] weights, int capacity) {
    int days = 1, current = 0;
    for (int w : weights) {
        if (current + w > capacity) { days++; current = 0; }
        current += w;
    }
    return days;
}` },
          { name: "Find Peak Element", difficulty: "Medium", link: "https://leetcode.com/problems/find-peak-element/", solution: `// Java - binary search toward the upward slope, O(log n) time
public int findPeakElement(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < nums[mid + 1]) left = mid + 1; // peak is to the right
        else right = mid;
    }
    return left;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – DBMS", color: "cs", tasks: ["Normalization 1NF–BCNF", "When to denormalize", "Schema design practice"], detail: {
        type: "cs", topic: "DBMS: Normalization & Schema Design",
        notes: `NORMALIZATION — 1NF THROUGH BCNF:
• 1NF (First Normal Form): atomic values only — no repeating groups or arrays in a single column.
• 2NF: 1NF + no partial dependency (every non-key column depends on the WHOLE primary key, relevant when the PK is composite).
• 3NF: 2NF + no transitive dependency (non-key columns don't depend on OTHER non-key columns).
• BCNF (Boyce-Codd Normal Form): stricter version of 3NF — every determinant must be a candidate key.
• Mnemonic: "the key, the whole key, and nothing but the key" (so help me Codd).

WHEN TO DENORMALIZE:
• Read-heavy systems where JOIN cost outweighs storage/redundancy cost (e.g., analytics dashboards, denormalized reporting tables).
• Pre-computed aggregates (e.g., storing a \`comment_count\` on a post row instead of always COUNT()-ing).
• Trade-off: denormalization speeds up reads but risks data inconsistency on writes (must update multiple places) — usually mitigated with triggers or application-level consistency checks, or accepted as eventual consistency.

SCHEMA DESIGN PRACTICE:
• Start normalized (3NF) for OLTP systems (your code review / meeting intelligence apps fall here — they're write-heavy with relational integrity needs).
• Identify hot read paths and consider targeted denormalization or caching (Redis) only after the normalized schema is proven to need it.

TOP INTERVIEW QUESTIONS:
1. Give an example violating 2NF. → A table (student_id, course_id, student_name) where student_name depends only on student_id, not the full (student_id, course_id) key.
2. Why might a production system intentionally violate 3NF? → Performance — avoiding expensive joins on hot read paths.
3. What's the practical difference between 3NF and BCNF? → BCNF handles edge cases with overlapping candidate keys that 3NF can miss; rare in practice but a classic interview gotcha.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – PR Comment Bot + Redis", color: "project", tasks: ["GitHub PR comment auto-posting", "Redis caching for unchanged files", "Unit tests"], detail: {
        type: "project", project: "Project A: PR Comment Auto-Posting + Redis Caching",
        steps: `GOAL: Actually post the synthesized review as a real GitHub PR comment, and add caching so unchanged files aren't re-analyzed on every webhook event.

STEP 1: GitHub PR comment posting via the GitHub REST API:
import httpx
async def post_pr_comment(repo: str, pr_number: int, body: str, token: str):
    url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"}
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json={"body": body}, headers=headers)
        resp.raise_for_status()

STEP 2: Wire this as the final graph node after the synthesizer, using state["final_comment"].

STEP 3: Redis caching for unchanged files — GitHub fires a new webhook on every push to a PR, but most pushes only touch a few files. Cache findings per (file_path, content_hash) so unchanged files skip re-analysis:
def get_cached_findings(file_hash: str):
    cached = redis_client.get(f"findings:{file_hash}")
    return json.loads(cached) if cached else None

def cache_findings(file_hash: str, findings: list):
    redis_client.setex(f"findings:{file_hash}", 3600, json.dumps(findings))  # 1hr TTL

STEP 4: Update each agent node to check the cache before calling the LLM, and populate it after — this directly reduces LLM API cost and latency on repeated webhook events for the same PR (this is the cache-aside pattern from your Day 2 SD notes, applied for real).

STEP 5: Unit tests — write pytest tests for the comment formatter, the cache key generation, and at least one agent's pattern-matching logic (the parts that don't require live LLM calls, so tests stay fast and deterministic).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Netflix Streaming", color: "sd", tasks: ["Netflix video streaming design", "CDN, adaptive bitrate"], detail: {
        type: "sd", topic: "Netflix Streaming Design",
        notes: `NETFLIX VIDEO STREAMING — CDN & ADAPTIVE BITRATE:

UPLOAD/PROCESSING PIPELINE:
• Raw video → transcoding into multiple resolutions and bitrates → segmented into small chunks (a few seconds each) → distributed to CDN edge servers globally.

CDN:
• Edge servers cache video segments close to users, dramatically cutting latency vs serving every request from a central origin. Origin servers are only hit on a cache miss (e.g., first request for a less-popular title in a region).

ADAPTIVE BITRATE STREAMING (ABR):
• The player client continuously measures its own available bandwidth and buffer health, then requests the NEXT segment at an appropriate quality level — this is why quality smoothly steps up/down instead of hard-buffering.
• Protocols: HLS (Apple-originated, widely supported) and MPEG-DASH — both work by serving a manifest file listing available quality variants, and the client picks per-segment.

KEY TRADE-OFF TO ARTICULATE: storing every video in every resolution/bitrate combination for every region is expensive — there's a real cost/availability trade-off in deciding which combinations to pre-transcode vs transcode on-demand for less popular content.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs (Global: Adobe, Oracle, Intuit)"], detail: null },
    ]
  },
  {
    day: 12, date: "Thu, 02 Jul", week: 2,
    weekTheme: "Binary Search | DBMS Advanced | Project A Done",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["LRU Cache (Medium)", "Sliding Window Maximum (Hard)", "Longest Consecutive Sequence (Medium)"], detail: {
        type: "dsa", items: [
          { name: "LRU Cache", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/", solution: `// Java - LinkedHashMap gives O(1) get/put with access ordering
class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }
    public int get(int key) { return cache.getOrDefault(key, -1); }
    public void put(int key, int value) { cache.put(key, value); }
}
// accessOrder=true reorders entries on get(); removeEldestEntry evicts the LRU one.` },
          { name: "Sliding Window Maximum", difficulty: "Hard", link: "https://leetcode.com/problems/sliding-window-maximum/", solution: `// Java - monotonic deque of indices, O(n) time
public int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> deque = new ArrayDeque<>(); // stores indices, values decreasing
    int[] result = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && deque.peekFirst() <= i - k) deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];
    }
    return result;
}` },
          { name: "Longest Consecutive Sequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/", solution: `// Java - HashSet, only start counting from sequence heads, O(n) time
public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int longest = 0;
    for (int n : set) {
        if (!set.contains(n - 1)) {
            int length = 1;
            while (set.contains(n + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – DBMS", color: "cs", tasks: ["NoSQL: Redis, MongoDB", "Sharding strategies", "Distributed transactions: 2PC, saga"], detail: {
        type: "cs", topic: "DBMS: NoSQL, Sharding & Distributed Transactions",
        notes: `NoSQL — REDIS vs MONGODB:
• Redis: in-memory key-value store. Used for caching, session storage, rate limiting, pub/sub, leaderboards. Data structures: strings, hashes, lists, sets, sorted sets.
• MongoDB: document store (JSON-like BSON documents). Flexible schema, good for nested/hierarchical data that doesn't fit cleanly into rows, but lacks the strict relational guarantees of Postgres.
• When to choose NoSQL over relational: schema flexibility is critical, horizontal scale is the priority over complex joins/transactions, or the access pattern is simple key lookups.

SHARDING STRATEGIES:
• Range-based: split by key ranges (e.g., user_id 1-1000 → shard A). Simple but can create hot shards if data isn't uniform.
• Hash-based: hash(key) % N determines the shard — better distribution, but resharding (changing N) requires moving lots of data (mitigated by consistent hashing, covered Day 15).
• Directory-based: a lookup service maps keys to shards — flexible but adds a single point of lookup (often cached/replicated).

DISTRIBUTED TRANSACTIONS — 2PC & SAGA:
• 2PC (Two-Phase Commit): coordinator asks all participants to "prepare" (vote yes/no), then "commit" only if all said yes. Guarantees atomicity across nodes but blocks if the coordinator crashes mid-protocol.
• Saga pattern: break a distributed transaction into a sequence of local transactions, each with a compensating action to undo it if a later step fails. More resilient than 2PC for microservices (no long-held locks), but the system passes through intermediate inconsistent states.

TOP INTERVIEW QUESTIONS:
1. When would you use Saga over 2PC? → Microservices where you can't hold distributed locks for long, and eventual consistency is acceptable.
2. What's a hot shard and how do you avoid it? → A shard receiving disproportionate traffic (e.g., a celebrity user); avoid with hash-based or consistent-hash sharding instead of naive range-based.
3. Redis persistence options? → RDB (periodic snapshots) and AOF (append-only log of writes) — can be combined for durability + fast restarts.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔴", label: "Project A – Deploy to Render", color: "project", tasks: ["Deploy FastAPI to Render.com", "Configure live GitHub webhook", "End-to-end test with real PR"], detail: {
        type: "project", project: "Project A: Deploy to Render.com + Live Webhook",
        steps: `GOAL: Take the project from local-only (ngrok tunnel) to a real, permanently deployed service with a stable URL.

STEP 1: Create a Render.com account, connect your GitHub repo, create a new Web Service pointing at your Dockerfile.

STEP 2: Configure environment variables in Render's dashboard (DATABASE_URL, GITHUB_TOKEN, OPENAI_API_KEY/ANTHROPIC_API_KEY, WEBHOOK_SECRET) — never commit these, use Render's secret env var storage.

STEP 3: Add a managed PostgreSQL instance on Render (or point DATABASE_URL at an external one), update connection settings if needed.

STEP 4: Deploy — confirm the live URL's /health endpoint responds, and check Render's build/deploy logs for any missing dependency or config issue.

STEP 5: Update the GitHub webhook URL (on your test repo) from the ngrok tunnel to the new permanent Render URL — this is the real "go live" moment for the project.

STEP 6: End-to-end test with a real PR against the live deployed service: open a PR, confirm the webhook fires, the full 3-agent pipeline runs, and a real comment is posted by your bot account — no local processes involved at all anymore.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Rate Limiter", color: "sd", tasks: ["Rate Limiter design", "Token bucket implementation"], detail: {
        type: "sd", topic: "Rate Limiter Design — Token Bucket",
        notes: `FULL RATE LIMITER DESIGN — TOKEN BUCKET IMPLEMENTATION:

ALGORITHM:
• Each user/key has a "bucket" holding up to N tokens, refilled at a fixed rate (e.g., 10 tokens/second, max bucket size 100).
• Each request consumes 1 token. If the bucket is empty, the request is rejected (429 Too Many Requests).
• Allows controlled bursts (up to bucket capacity) while enforcing a long-run average rate — this burst tolerance is why token bucket is generally preferred over leaky bucket (which enforces a perfectly smooth output rate with NO burst tolerance).

IMPLEMENTATION SKETCH (Redis-backed, for a distributed system with multiple API servers):
• Store per-user: (tokens_remaining, last_refill_timestamp) in Redis.
• On each request: compute tokens to add since last_refill_timestamp (elapsed_time * refill_rate), cap at bucket size, then atomically check-and-decrement using a Lua script (avoids race conditions between the read and the write across concurrent requests).

WHERE TO ENFORCE:
• API Gateway level: centralizes the logic, protects all downstream services uniformly, simplest to reason about.
• Per-service: more granular control (different limits for different endpoints) but duplicated logic across services unless extracted into a shared library.

DISTRIBUTED CONSIDERATION: in-process (per-server) counters undercount the true global rate once you have multiple API server instances — the counter MUST live in a shared store like Redis for accurate enforcement across the fleet.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs", "Follow up all pending"], detail: null },
    ]
  },
  {
    day: 13, date: "Fri, 03 Jul", week: 2,
    weekTheme: "PROJECT A DONE ✅ | DBMS Revision",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–11:30 AM", emoji: "💻", label: "DSA Revision", color: "dsa", tasks: ["Redo 3 weakest Recursion/BS problems", "Full mock interview (record)"], detail: null },
      { time: "11:30–1:00 PM", emoji: "🟢", label: "DBMS Revision", color: "cs", tasks: ["25 DBMS interview questions timed 30 min", "Write answers from memory"], detail: {
        type: "cs", topic: "DBMS Rapid-Fire: 25 Interview Questions (Timed)",
        notes: `TIMED DRILL — 25 DBMS QUESTIONS IN 30 MINUTES. Write answers from memory, then self-grade.

Core areas to expect questions from:
• ACID properties and isolation levels
• Indexing strategy (when to add one, composite vs covering)
• Normalization vs denormalization trade-offs
• Transactions, locking, MVCC
• NoSQL vs SQL trade-offs
• Sharding and distributed data

SAMPLE QUESTION SET:
1. Explain ACID with a concrete bank-transfer example.
2. What's the difference between a clustered and non-clustered index?
3. How does PostgreSQL achieve MVCC without read locks?
4. What's a deadlock at the database level, and how does the DB detect/resolve it?
5. CAP theorem — which two does a typical relational DB favor in a single-node setup? (Trick: CAP applies to distributed systems; single-node Postgres is just CA-ish since there's no partition to tolerate.)
6. Explain the N+1 query problem and how to fix it (e.g., eager loading / JOIN instead of per-row queries).
7. What's a covering index?
8. Optimistic vs pessimistic locking?
9. When does a foreign key constraint hurt write performance, and how do you mitigate it?
10. Explain connection pooling and why it matters for a FastAPI + PostgreSQL app (relevant to Project A!).

GRADING: Flag any topic scoring below 1.5/2 average — these are your Day 19 and Day 26 revision targets. This is also a strong checkpoint before moving into Computer Networks next week.`
      } },
      { time: "1:00–2:00 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "2:00–4:00 PM", emoji: "🔴", label: "PROJECT A DONE ✅", color: "project", tasks: ["Write README with architecture diagram", "Record 2-min demo video", "Update resume with Project A metrics", "Add to GitHub with live link"], detail: {
        type: "project", project: "PROJECT A DONE ✅ — README, Demo, Resume",
        steps: `GOAL: Package Project A as a polished, presentable artifact — this is the deliverable that goes on your resume and LinkedIn.

STEP 1: README.md — structure:
  # AI Code Reviewer
  One-line pitch (what it does, why it's useful)
  ## Architecture diagram (ASCII or embedded image — show the webhook → fetch_diff → 3 parallel agents → synthesizer → comment flow)
  ## Tech stack (FastAPI, LangGraph, PostgreSQL, Redis, Docker, deployed on Render)
  ## Key features (parallel multi-agent review, severity scoring, caching for efficiency)
  ## Setup instructions (for anyone wanting to run it locally)
  ## Live demo link + screenshot of a real PR comment

STEP 2: Record a 2-minute demo video — screen-record opening a real PR, the bot commenting within seconds, walking through the comment's findings. Keep it tight: show the problem (manual review is slow), show the solution (automated multi-agent review), show the result.

STEP 3: Update your resume with a Project A bullet using real metrics from this week's testing — e.g., "Built a multi-agent AI code review system (FastAPI, LangGraph, 3 parallel specialized agents) deployed on Render, reducing PR review turnaround from hours to under 30 seconds for security/bug/style checks across N test PRs."

STEP 4: Push final clean code to GitHub with the live Render URL in the README, confirm the repo is public and presentable to anyone clicking through from your resume/LinkedIn.

STEP 5: This closes Project A. Tomorrow (Day 14) starts Project B (AI Meeting Intelligence) — a different domain (audio processing + RAG) that will showcase a broader skill range alongside Project A's PR-automation focus.`
      } },
      { time: "4:00–5:00 PM", emoji: "🟡", label: "Mock HR", color: "sd", tasks: ["Mock HR interview (record + review)", "5 STAR stories written"], detail: {
        type: "sd", topic: "Mock HR Interview + STAR Stories",
        notes: `MOCK HR INTERVIEW — RECORD + REVIEW:

Run a full mock HR/behavioral interview (15-20 min), covering:
• "Tell me about yourself" (refined version of Day 7's script).
• 2-3 behavioral questions using STAR stories (have 5 written by end of today, up from 3 on Day 7).
• "Why this company / why this role" — even in mock form, practice tailoring this rather than giving a generic answer.
• "Do you have any questions for me?" — always have 2-3 genuine questions ready; this is itself evaluated.

5 STAR STORIES TO HAVE READY BY END OF TODAY:
1. Solved a hard technical problem (Project A is great material here by Day 13 — it's just been completed).
2. Handled disagreement/conflicting feedback.
3. Failed at something and what changed afterward.
4. Led or influenced something without formal authority.
5. Managed competing priorities under a deadline (the 30-day program itself is honest, relatable material for this one).

REVIEW CHECKLIST AFTER RECORDING:
• Did each story stay under ~2 minutes?
• Did you quantify the Result wherever possible?
• Did you cut filler words and hedging language ("I think maybe," "sort of")?
• Did your energy/enthusiasm come through, or did it sound rehearsed/flat?`
      } },
      { time: "5:00–6:00 PM", emoji: "💼", label: "Pipeline Audit", color: "jobs", tasks: ["Full pipeline review", "Respond to all pending messages", "Log status of all applications"], detail: null },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
    ]
  },
  {
    day: 14, date: "Sat, 04 Jul", week: 2,
    weekTheme: "Trees | Computer Networks | Project B Setup",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Max Depth Binary Tree (Easy)", "Same Tree (Easy)", "Invert Binary Tree (Easy)", "Level Order Traversal (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Max Depth Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", solution: `// Java - recursive DFS, O(n) time
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}` },
          { name: "Same Tree", difficulty: "Easy", link: "https://leetcode.com/problems/same-tree/", solution: `// Java - recursive structural comparison, O(n) time
public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null || p.val != q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}` },
          { name: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/", solution: `// Java - recursive swap, O(n) time
public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}` },
          { name: "Level Order Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", solution: `// Java - BFS with queue, O(n) time
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN", color: "cs", tasks: ["OSI vs TCP/IP model", "TCP vs UDP – 3-way handshake", "When to use UDP"], detail: {
        type: "cs", topic: "CN: OSI/TCP-IP Models & TCP vs UDP",
        notes: `OSI vs TCP/IP MODEL:
• OSI (7 layers, theoretical reference): Physical, Data Link, Network, Transport, Session, Presentation, Application.
• TCP/IP (4 layers, what's actually implemented): Link, Internet, Transport, Application. Session/Presentation concerns are typically handled within the Application layer in practice.
• Interview shortcut: know that IP lives at Network/Internet layer, TCP/UDP at Transport, HTTP at Application — that mapping comes up constantly.

TCP vs UDP:
• TCP: connection-oriented, reliable (retransmits lost packets), ordered, flow-controlled, congestion-controlled. Used where correctness matters more than latency (HTTP, file transfer, email).
• UDP: connectionless, no delivery guarantee, no ordering, minimal overhead. Used where speed/low-latency matters more than perfect delivery (DNS, video streaming, gaming, VoIP).

TCP 3-WAY HANDSHAKE:
1. Client sends SYN (synchronize, with initial sequence number).
2. Server responds SYN-ACK (acknowledges client's SYN, sends its own SYN).
3. Client responds ACK (acknowledges server's SYN). Connection established.
• Teardown is a 4-way handshake (FIN, ACK, FIN, ACK) since each side closes independently.

WHEN TO USE UDP:
• Real-time media (a dropped video frame is less bad than a stalled stream waiting for retransmission).
• DNS queries (small, fast, and the application layer can retry if needed).
• Gaming (latest position update matters more than an old lost one).

TOP INTERVIEW QUESTIONS:
1. Why does TCP need a 3-way handshake (not 2-way)? → Both sides need to confirm they can both send AND receive — a 2-way handshake can't fully verify bidirectional connectivity.
2. What happens if a packet is lost in TCP? → Sender detects via missing ACK / duplicate ACKs / timeout, then retransmits.
3. Give a real example where you'd genuinely choose UDP. → Live video calls — better to drop a stale frame than wait for retransmission and lag behind real-time.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Setup", color: "project", tasks: ["Init 'ai-meeting-intelligence' repo", "FastAPI + PostgreSQL + Docker setup", "Basic project structure"], detail: {
        type: "project", project: "Project B: AI Meeting Intelligence — Setup",
        steps: `GOAL: Scaffold the second project — an AI system that ingests meeting recordings and produces transcripts, summaries, and action items via a multi-agent pipeline.

STEP 1: Create GitHub repo 'ai-meeting-intelligence' (public, MIT license).

STEP 2: Project structure (similar shape to Project A, proven pattern):
  ai-meeting-intelligence/
  ├── app/
  │   ├── main.py
  │   ├── models.py
  │   ├── database.py
  │   ├── pipeline/         # agent pipeline (built over coming days)
  │   └── routes/
  │       └── upload.py     # built Day 17
  ├── frontend/              # Next.js, built starting Day 22
  ├── requirements.txt
  ├── Dockerfile
  └── docker-compose.yml

STEP 3: FastAPI + PostgreSQL + Docker setup — reuse the same Dockerfile/docker-compose pattern from Project A Day 3, this time with an added table for meetings:
class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    audio_url = Column(String)
    transcript = Column(Text, nullable=True)
    status = Column(String, default="uploaded")
    created_at = Column(DateTime, default=datetime.utcnow)

STEP 4: docker-compose up --build, confirm /health responds and the meetings table exists.

STEP 5: Basic project structure review — note the deliberate parallel to Project A's structure (FastAPI + SQLAlchemy + Docker base), which is itself worth mentioning in interviews as a sign of applying consistent, reusable architectural patterns across projects rather than reinventing structure each time.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Distributed Cache", color: "sd", tasks: ["Redis eviction policies", "Redis clustering", "Cache-aside vs write-through"], detail: {
        type: "sd", topic: "Distributed Cache: Redis Eviction & Clustering",
        notes: `REDIS EVICTION POLICIES:
• noeviction: returns errors on writes once memory is full — safest for data you can't afford to lose, worst for availability.
• allkeys-lru: evicts the least-recently-used key across the entire keyspace when memory is full.
• volatile-lru: evicts LRU only among keys that have a TTL set — keys without expiry are protected from eviction.
• volatile-ttl: evicts the key closest to its expiry time first, among keys with a TTL.
• Choice depends on whether ALL your data is "cache-like" (allkeys-*) or a mix of cache + must-keep data (volatile-*).

REDIS CLUSTERING:
• Data is split across nodes using 16384 hash slots; each key's slot = CRC16(key) % 16384. Each node owns a contiguous range of slots.
• Clients can connect to any node; if a key isn't owned by that node, the client gets a MOVED redirect to the correct one (smart clients cache this mapping to avoid repeated redirects).
• Replication: each shard has replicas for read scaling and automatic failover if the primary goes down.

CACHE-ASIDE vs WRITE-THROUGH:
• Cache-aside: app code explicitly checks cache, falls back to DB on miss, then populates cache — most common pattern, gives the app full control over WHEN to cache.
• Write-through: every write goes to the cache AND the DB synchronously — guarantees cache freshness but adds write latency and complexity (the write path now depends on both stores succeeding).`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs (after break – fresh outreach)"], detail: null },
    ]
  },
  {
    day: 15, date: "Sun, 05 Jul", week: 3,
    weekTheme: "Trees | Computer Networks | Project B Whisper",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Validate BST (Medium)", "Kth Smallest in BST (Medium)", "Lowest Common Ancestor (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Validate BST", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/", solution: `// Java - recursive bounds check, O(n) time
public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}
private boolean validate(TreeNode node, Long lower, Long upper) {
    if (node == null) return true;
    if (lower != null && node.val <= lower) return false;
    if (upper != null && node.val >= upper) return false;
    return validate(node.left, lower, (long) node.val) && validate(node.right, (long) node.val, upper);
}` },
          { name: "Kth Smallest in BST", difficulty: "Medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", solution: `// Java - in-order traversal (BST in-order is sorted), O(h + k) time
public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    while (current != null || !stack.isEmpty()) {
        while (current != null) { stack.push(current); current = current.left; }
        current = stack.pop();
        if (--k == 0) return current.val;
        current = current.right;
    }
    return -1;
}` },
          { name: "Lowest Common Ancestor", difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", solution: `// Java - recursive search, O(n) time
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root; // p and q split across subtrees
    return left != null ? left : right;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN", color: "cs", tasks: ["HTTP/HTTPS 1.1 vs 2 vs 3", "DNS resolution process", "CDN & anycast"], detail: {
        type: "cs", topic: "CN: HTTP/HTTPS Versions, DNS & CDN",
        notes: `HTTP/1.1 vs HTTP/2 vs HTTP/3:
• HTTP/1.1: text-based, one request per TCP connection at a time per "stream" (head-of-line blocking without pipelining workarounds), keep-alive reduces reconnect overhead.
• HTTP/2: binary framing, multiplexing (many requests over ONE TCP connection concurrently), header compression (HPACK), server push. Fixes HTTP/1.1's head-of-line blocking at the application layer — but TCP-level HOL blocking remains (one lost packet stalls all streams on that connection).
• HTTP/3: built on QUIC (over UDP, not TCP). Each stream is independently sequenced, so a lost packet only stalls ITS stream, not all of them — solves TCP-level head-of-line blocking. Also has faster connection setup (0-RTT in many cases).

DNS RESOLUTION PROCESS:
1. Browser checks its own cache, then OS cache.
2. Query goes to a recursive resolver (often your ISP or 8.8.8.8).
3. Resolver queries a root server → gets pointed to the TLD server (.com, .org).
4. TLD server points to the authoritative nameserver for the domain.
5. Authoritative server returns the IP. Result is cached at each level per its TTL.

CDN & ANYCAST:
• CDN (Content Delivery Network): caches static (and sometimes dynamic) content at edge servers geographically close to users, reducing latency and origin load.
• Anycast: the same IP address is announced from multiple physical locations; routing (BGP) sends the client to the topologically nearest one — this is how many CDNs and DNS providers achieve low-latency global routing.

TOP INTERVIEW QUESTIONS:
1. Why is HTTP/3 over UDP instead of TCP? → To get independent stream multiplexing without TCP's connection-wide head-of-line blocking.
2. What's a CNAME record vs an A record? → A record maps a domain to an IPv4 address directly; CNAME maps a domain to ANOTHER domain name (alias), which is then resolved further.
3. How does a CDN decide which edge server serves a request? → Typically via Anycast IP routing or DNS-based geo-routing to the nearest/lowest-latency edge.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Whisper Integration", color: "project", tasks: ["Integrate OpenAI Whisper API", "Audio → transcript with timestamps", "pyannote speaker diarization"], detail: {
        type: "project", project: "Project B: Whisper Integration + Speaker Diarization",
        steps: `GOAL: Build the core transcription capability — audio in, timestamped + speaker-labeled transcript out.

STEP 1: Integrate OpenAI's Whisper API for transcription:
import openai
def transcribe_audio(file_path: str) -> dict:
    with open(file_path, "rb") as audio_file:
        response = openai.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="verbose_json",  # gives timestamps per segment
            timestamp_granularities=["segment"]
        )
    return response

STEP 2: Audio → transcript with timestamps — store each segment's {start, end, text} so later agents (Summary, Action Item) can reference WHEN something was said, not just what.

STEP 3: pyannote speaker diarization — Whisper alone doesn't label WHO said what, so layer in pyannote.audio to identify speaker segments:
from pyannote.audio import Pipeline
diarization_pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization")
diarization = diarization_pipeline(file_path)
# yields (start, end, speaker_label) tuples

STEP 4: Merge Whisper's transcript segments with pyannote's speaker segments by timestamp overlap, producing a final structure like:
[{"speaker": "Speaker_1", "start": 0.0, "end": 4.2, "text": "Let's start with the roadmap update."}, ...]

STEP 5: Test on 2-3 short sample audio clips (record yourself talking, or use a public sample meeting recording) and manually verify the speaker labels and timestamps look reasonable before building the full pipeline around this output.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Sharding", color: "sd", tasks: ["Consistent hashing", "Virtual nodes", "Sharding strategies"], detail: {
        type: "sd", topic: "Consistent Hashing & Sharding",
        notes: `CONSISTENT HASHING:
• Problem it solves: naive hash(key) % N sharding means changing N (adding/removing a node) reshuffles almost ALL keys to new shards — extremely expensive at scale.
• Consistent hashing maps both nodes AND keys onto a hash ring (circular hash space); a key belongs to the first node clockwise from its position on the ring.
• Adding/removing a node only affects the keys between it and its neighbor on the ring — NOT the entire keyspace. This is the core insight that makes it valuable for any system that needs to add/remove shards without massive data movement.

VIRTUAL NODES:
• Instead of placing each physical node once on the ring, place it at MANY points (e.g., 100-200 virtual positions) — this smooths out load distribution (avoids one physical node accidentally owning a disproportionate arc of the ring) and makes rebalancing on node addition/removal more even.

SHARDING STRATEGIES RECAP (tie back to Day 12 of DBMS week):
• Range-based: simple, risk of hot shards.
• Hash-based: better distribution, resharding is expensive WITHOUT consistent hashing.
• Directory-based: flexible, adds a lookup indirection layer.
• Consistent hashing is essentially the "smart" version of hash-based sharding that solves its resharding-cost weakness.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs", "Follow up on pre-break applications"], detail: null },
    ]
  },
  {
    day: 16, date: "Mon, 06 Jul", week: 3,
    weekTheme: "Trees | CN TLS + REST | Project B Pipeline",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Diameter of Binary Tree (Easy)", "Balanced Binary Tree (Easy)", "Serialize/Deserialize BT (Hard)"], detail: {
        type: "dsa", items: [
          { name: "Diameter of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/diameter-of-binary-tree/", solution: `// Java - DFS, track max left+right depth at each node, O(n) time
private int diameter = 0;
public int diameterOfBinaryTree(TreeNode root) {
    depth(root);
    return diameter;
}
private int depth(TreeNode node) {
    if (node == null) return 0;
    int left = depth(node.left);
    int right = depth(node.right);
    diameter = Math.max(diameter, left + right); // path through this node
    return 1 + Math.max(left, right);
}` },
          { name: "Balanced Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/balanced-binary-tree/", solution: `// Java - bottom-up height check, O(n) time (early exit on -1)
public boolean isBalanced(TreeNode root) {
    return height(root) != -1;
}
private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    if (left == -1) return -1;
    int right = height(node.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
}` },
          { name: "Serialize/Deserialize BT", difficulty: "Hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", solution: `// Java - preorder with null markers, O(n) time
public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    serializeHelper(root, sb);
    return sb.toString();
}
private void serializeHelper(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("null,"); return; }
    sb.append(node.val).append(",");
    serializeHelper(node.left, sb);
    serializeHelper(node.right, sb);
}
public TreeNode deserialize(String data) {
    Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
    return deserializeHelper(queue);
}
private TreeNode deserializeHelper(Queue<String> queue) {
    String val = queue.poll();
    if (val.equals("null")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = deserializeHelper(queue);
    node.right = deserializeHelper(queue);
    return node;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN", color: "cs", tasks: ["TLS/SSL handshake", "REST vs GraphQL vs gRPC", "WebSockets & SSE"], detail: {
        type: "cs", topic: "CN: TLS/SSL, REST vs GraphQL vs gRPC",
        notes: `TLS/SSL HANDSHAKE (simplified TLS 1.3):
1. Client Hello: proposes TLS version, cipher suites, a random value, and (in TLS 1.3) a guessed key share.
2. Server Hello: picks the cipher suite, sends its certificate (public key) and key share.
3. Both sides derive a shared symmetric session key using key exchange (commonly ECDHE - elliptic curve Diffie-Hellman).
4. Client verifies the server's certificate against a trusted CA chain.
5. Symmetric encryption (AES, etc.) is used for the actual data — asymmetric crypto is only used to securely establish the symmetric key (asymmetric is too slow for bulk data).
• TLS 1.3 reduced the handshake to 1-RTT (vs 2-RTT in TLS 1.2), improving connection setup latency.

REST vs GraphQL vs gRPC:
• REST: resource-based, multiple endpoints, can over-fetch or under-fetch data, simple caching via HTTP semantics (GET is cacheable).
• GraphQL: single endpoint, client specifies exactly what fields it needs (fixes over/under-fetching), but loses simple HTTP caching and can allow expensive nested queries if not rate/depth-limited.
• gRPC: binary protocol (Protocol Buffers) over HTTP/2, strongly typed contracts (.proto files), very efficient for service-to-service communication, supports streaming — but not naturally browser-friendly (needs gRPC-Web translation) and harder to debug by hand (binary, not human-readable like JSON).

WEBSOCKETS & SSE:
• WebSockets: full-duplex, persistent connection — both client and server can push messages anytime. Good for chat, live collaboration (relevant to Project B's real-time agent progress).
• SSE (Server-Sent Events): one-way (server→client) stream over plain HTTP, simpler than WebSockets, auto-reconnect built into the spec, but can't send client→server on the same connection.

TOP INTERVIEW QUESTIONS:
1. Why is gRPC popular for internal microservice communication but not for public APIs? → Strong typing + performance is great internally, but binary format and lack of native browser support hurt public/external accessibility.
2. When would you pick SSE over WebSockets? → When you only need server→client push (e.g., streaming agent progress updates) and want simpler infra (works over plain HTTP, easier to load-balance).
3. Why does TLS use both asymmetric AND symmetric encryption? → Asymmetric (slow but solves the key-exchange problem) to securely agree on a shared secret, then symmetric (fast) for the actual bulk data transfer.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – FFmpeg + S3", color: "project", tasks: ["FFmpeg audio pipeline: MP4/MP3→WAV→Whisper", "AWS S3 / GCP Cloud Storage integration"], detail: {
        type: "project", project: "Project B: FFmpeg Audio Pipeline + Cloud Storage",
        steps: `GOAL: Handle real-world audio/video input formats and set up durable cloud storage for uploaded files.

STEP 1: FFmpeg pipeline — users will upload MP4 (video calls) or various audio formats, but Whisper wants clean audio. Convert anything to WAV first:
import subprocess
def convert_to_wav(input_path: str, output_path: str):
    subprocess.run([
        "ffmpeg", "-i", input_path,
        "-ar", "16000", "-ac", "1",  # 16kHz mono, what Whisper expects
        output_path
    ], check=True)

STEP 2: Handle the common input formats: MP4 (extract audio track), MP3, WAV, M4A — FFmpeg handles all of these through the same command pattern, just different -i input.

STEP 3: AWS S3 / GCP Cloud Storage integration — uploaded files shouldn't live on the API server's local disk (ephemeral, doesn't scale across instances):
import boto3
s3 = boto3.client("s3")
def upload_to_s3(file_path: str, bucket: str, key: str) -> str:
    s3.upload_file(file_path, bucket, key)
    return f"https://{bucket}.s3.amazonaws.com/{key}"

STEP 4: Pipeline order: upload → store original in S3 → download for FFmpeg conversion → WAV → Whisper transcription → discard local temp files (keep only the S3 original + the resulting transcript in the DB).

STEP 5: Test the full chain on an MP4 meeting recording end to end: upload → S3 storage confirmed → WAV conversion → transcript produced — this is the foundation every downstream agent (Days 18-19) will build on.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Load Balancer", color: "sd", tasks: ["L4 vs L7 load balancers", "Message queue delivery guarantees"], detail: {
        type: "sd", topic: "Load Balancers & Message Queue Guarantees",
        notes: `L4 vs L7 LOAD BALANCERS:
• L4 (Transport layer): routes based on IP + port only, doesn't inspect the actual request content — faster, simpler, protocol-agnostic.
• L7 (Application layer): inspects HTTP headers/paths/cookies — enables smarter routing (e.g., route /api/* to one service, /static/* to another, or sticky sessions based on a cookie), at the cost of more processing per request.
• Common real choice: L4 for raw TCP/UDP traffic or when you need maximum throughput; L7 (e.g., NGINX, AWS ALB) for HTTP-aware routing decisions — most web architectures use L7 at the edge.

MESSAGE QUEUE DELIVERY GUARANTEES:
• At-most-once: message might be lost, never duplicated — fire-and-forget, lowest overhead.
• At-least-once: message is guaranteed delivered, but might be DUPLICATED (e.g., if an ACK is lost and the broker redelivers) — requires consumer-side idempotency (relevant for GitHub webhook handling in Project A, since GitHub explicitly documents that webhooks can be redelivered).
• Exactly-once: the holy grail — guaranteed delivered exactly once. Genuinely hard to achieve end-to-end; usually approximated by combining at-least-once delivery with idempotent consumers (effectively achieving the same practical outcome without needing true exactly-once semantics).`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "Follow up Week 2 apps", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 17, date: "Tue, 07 Jul", week: 3,
    weekTheme: "Graphs | CN | Project B Agents",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Number of Islands (Medium)", "Clone Graph (Medium)", "Course Schedule – Topo Sort (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/", solution: `// Java - DFS flood fill, O(rows*cols) time
public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') { count++; sink(grid, r, c); }
        }
    }
    return count;
}
private void sink(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0'; // mark visited
    sink(grid, r+1, c); sink(grid, r-1, c); sink(grid, r, c+1); sink(grid, r, c-1);
}` },
          { name: "Clone Graph", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/", solution: `// Java - DFS with a visited map, O(V+E) time
public Node cloneGraph(Node node) {
    if (node == null) return null;
    return clone(node, new HashMap<>());
}
private Node clone(Node node, Map<Node, Node> visited) {
    if (visited.containsKey(node)) return visited.get(node);
    Node copy = new Node(node.val);
    visited.put(node, copy);
    for (Node neighbor : node.neighbors) {
        copy.neighbors.add(clone(neighbor, visited));
    }
    return copy;
}` },
          { name: "Course Schedule – Topo Sort", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/", solution: `// Java - Kahn's algorithm (BFS topological sort), O(V+E) time
public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) {
        graph.get(p[1]).add(p[0]);
        indegree[p[0]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) queue.offer(i);
    int visited = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        visited++;
        for (int next : graph.get(course)) {
            if (--indegree[next] == 0) queue.offer(next);
        }
    }
    return visited == numCourses; // if not all visited, there's a cycle
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN", color: "cs", tasks: ["API Rate Limiting techniques", "Security: OWASP Top 10", "JWT vs session cookies"], detail: {
        type: "cs", topic: "CN: Rate Limiting, OWASP Security & JWT",
        notes: `API RATE LIMITING TECHNIQUES:
• Fixed Window: count requests per fixed time window (e.g., 100/minute) — simple but allows bursts at window boundaries (200 requests across the boundary of two windows).
• Sliding Window Log: track timestamps of every request, count those within the last N seconds — accurate but memory-heavy.
• Sliding Window Counter: approximates sliding window using weighted counts of the current + previous fixed windows — good balance of accuracy and memory.
• Token Bucket: tokens refill at a fixed rate, each request consumes a token, allows controlled bursts up to bucket capacity (most commonly implemented — also Day 12's design topic).
• Leaky Bucket: requests processed at a constant output rate regardless of input burstiness — smooths traffic but doesn't allow bursts at all.

SECURITY — OWASP TOP 10 (the ones that come up most in interviews):
• Injection (SQL injection, command injection): never concatenate user input into queries — use parameterized queries/ORMs.
• Broken Authentication: weak session management, predictable tokens.
• XSS (Cross-Site Scripting): unsanitized user input rendered as HTML/JS in the browser — escape output, use CSP headers.
• CSRF (Cross-Site Request Forgery): a malicious site tricks a logged-in user's browser into making a request — mitigated with CSRF tokens or SameSite cookies.
• Security Misconfiguration: default credentials, verbose error messages leaking stack traces, open S3 buckets.

JWT vs SESSION COOKIES:
• Session cookies: server stores session state (in memory/Redis/DB), cookie just holds a session ID — easy to revoke (just delete server-side), but requires server-side storage and doesn't scale as simply across stateless services.
• JWT: self-contained signed token holding claims (user id, expiry, roles) — stateless, server doesn't need to look anything up, scales well across microservices. Downside: hard to revoke before expiry (mitigated with short expiry + refresh tokens, or a blocklist).

TOP INTERVIEW QUESTIONS:
1. How do you prevent SQL injection? → Parameterized queries / prepared statements / ORM query builders — never raw string concatenation of user input.
2. JWT vs session — which would you pick for a microservices architecture and why? → JWT, because it avoids a shared session store dependency across services (stateless verification with the signing key).
3. What's the difference between authentication and authorization? → Authentication = who you are (login). Authorization = what you're allowed to do (permissions/roles).`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Upload Endpoint + LangGraph", color: "project", tasks: ["/upload endpoint with S3 async processing", "LangGraph state graph for supervisor agent"], detail: {
        type: "project", project: "Project B: Upload Endpoint + LangGraph Supervisor State",
        steps: `GOAL: Build the actual API endpoint users hit to upload a meeting recording, with async processing so the request doesn't block on a potentially long transcription job.

STEP 1: /upload endpoint with async S3 processing:
from fastapi import UploadFile, BackgroundTasks
@router.post("/upload")
async def upload_meeting(file: UploadFile, background_tasks: BackgroundTasks):
    meeting = create_meeting_record(status="processing")
    temp_path = save_temp_file(file)
    background_tasks.add_task(process_meeting_pipeline, meeting.id, temp_path)
    return {"meeting_id": meeting.id, "status": "processing"}
# client can poll GET /meetings/{id} for status, or get a webhook/websocket push later (Day 23)

STEP 2: LangGraph state graph for the supervisor agent — define the shared state for THIS project's pipeline (parallel structure to Project A's AgentState):
class MeetingState(TypedDict):
    audio_path: str
    transcript: list  # speaker-labeled segments from Day 15
    summary: str
    action_items: List[dict]
    qa_ready: bool

STEP 3: Sketch the graph shape (built out over coming days):
  transcribe (Day 15-16 logic) → [summary_agent, action_item_agent] (parallel) → rag_indexing (Day 19) → END

STEP 4: This mirrors Project A's architecture deliberately — same supervisor/parallel-agent pattern, different domain. Worth explicitly noting in your README/interviews: you're not solving the SAME problem twice, you're applying a proven multi-agent architecture pattern to two different problem domains.

STEP 5: Test the upload endpoint with a real audio file, confirm a background task kicks off and the meeting record's status updates correctly through the pipeline stages.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Concurrency in Java", color: "sd", tasks: ["JVM internals: GC, heap, stack", "Java concurrency: locks, race conditions"], detail: {
        type: "sd", topic: "JVM Internals & Java Concurrency",
        notes: `JVM INTERNALS — GC, HEAP, STACK:
• Heap: where objects live, garbage collected. Divided into generations (Young/Eden + Survivor spaces, and Old/Tenured) — most objects die young, so generational GC optimizes for that (frequent, fast young-gen collections; rare, slower old-gen collections).
• Stack: each thread has its own stack holding local variables and method call frames — NOT garbage collected, automatically reclaimed when a method returns (this is why stack overflow happens with infinite/deep recursion, but heap exhaustion gives OutOfMemoryError instead).
• Common GC algorithms: G1GC (default in modern JVMs, balances throughput and pause times by collecting in regions) vs older algorithms like CMS (deprecated) — interview-level knowledge is knowing G1 exists and roughly why it's preferred (predictable pause times at scale).

JAVA CONCURRENCY — LOCKS & RACE CONDITIONS:
• synchronized keyword: intrinsic lock on an object/method — simple but coarse-grained, can cause contention.
• ReentrantLock: explicit lock object, more flexible (tryLock with timeout, fairness policies) than synchronized, but you must remember to unlock in a finally block.
• volatile: ensures visibility of a variable's latest value across threads (prevents caching it in a CPU register/local cache) — does NOT provide atomicity for compound operations like increment.
• java.util.concurrent.atomic (e.g., AtomicInteger): lock-free, uses CAS (compare-and-swap) under the hood — generally faster than locking for simple counter-style operations.
• Race condition example: two threads calling count++ without synchronization — the read-modify-write isn't atomic, so increments can be lost.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs (AI startups)"], detail: null },
    ]
  },
  {
    day: 18, date: "Wed, 08 Jul", week: 3,
    weekTheme: "Graphs | CN | Project B Summary Agent",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Pacific Atlantic Water Flow (Medium)", "Rotting Oranges (Medium)", "Word Ladder (Hard)"], detail: {
        type: "dsa", items: [
          { name: "Pacific Atlantic Water Flow", difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", solution: `// Java - multi-source DFS from both oceans, O(rows*cols) time
public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length, cols = heights[0].length;
    boolean[][] pacific = new boolean[rows][cols], atlantic = new boolean[rows][cols];
    for (int r = 0; r < rows; r++) { dfs(heights, pacific, r, 0); dfs(heights, atlantic, r, cols-1); }
    for (int c = 0; c < cols; c++) { dfs(heights, pacific, 0, c); dfs(heights, atlantic, rows-1, c); }
    List<List<Integer>> result = new ArrayList<>();
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (pacific[r][c] && atlantic[r][c]) result.add(Arrays.asList(r, c));
    return result;
}
private void dfs(int[][] heights, boolean[][] visited, int r, int c) {
    visited[r][c] = true;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr < 0 || nc < 0 || nr >= heights.length || nc >= heights[0].length || visited[nr][nc]) continue;
        if (heights[nr][nc] >= heights[r][c]) dfs(heights, visited, nr, nc); // flow must go uphill or flat
    }
}` },
          { name: "Rotting Oranges", difficulty: "Medium", link: "https://leetcode.com/problems/rotting-oranges/", solution: `// Java - multi-source BFS, O(rows*cols) time
public int orangesRotting(int[][] grid) {
    Queue<int[]> queue = new LinkedList<>();
    int fresh = 0;
    for (int r = 0; r < grid.length; r++)
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 2) queue.offer(new int[]{r, c});
            if (grid[r][c] == 1) fresh++;
        }
    int minutes = 0;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty() && fresh > 0) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int[] cell = queue.poll();
            for (int[] d : dirs) {
                int nr = cell[0]+d[0], nc = cell[1]+d[1];
                if (nr<0||nc<0||nr>=grid.length||nc>=grid[0].length||grid[nr][nc]!=1) continue;
                grid[nr][nc] = 2; fresh--; queue.offer(new int[]{nr, nc});
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}` },
          { name: "Word Ladder", difficulty: "Hard", link: "https://leetcode.com/problems/word-ladder/", solution: `// Java - BFS over the word graph, O(M^2 * N) time where M = word length
public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> dict = new HashSet<>(wordList);
    if (!dict.contains(endWord)) return 0;
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int steps = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            char[] word = queue.poll().toCharArray();
            for (int j = 0; j < word.length; j++) {
                char original = word[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[j] = c;
                    String candidate = new String(word);
                    if (candidate.equals(endWord)) return steps + 1;
                    if (dict.remove(candidate)) queue.offer(candidate); // remove = mark visited
                }
                word[j] = original;
            }
        }
        steps++;
    }
    return 0;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN", color: "cs", tasks: ["TCP internals: congestion control", "WebSockets vs SSE vs long polling", "Cloud GCP/AWS fundamentals"], detail: {
        type: "cs", topic: "CN: TCP Internals & Cloud Fundamentals",
        notes: `TCP INTERNALS — CONGESTION CONTROL:
• Slow Start: TCP starts with a small congestion window and doubles it each RTT until it hits a threshold or detects loss — exponential ramp-up.
• Congestion Avoidance: after slow start threshold, window grows linearly (additive increase) instead of exponentially, to probe capacity more cautiously.
• On packet loss: window is cut (multiplicative decrease) — this "AIMD" (Additive Increase, Multiplicative Decrease) pattern is why TCP throughput graphs look like a sawtooth.
• Flow control (separate from congestion control): receiver advertises a window size to prevent the sender from overwhelming the RECEIVER's buffer, regardless of network congestion.

WEBSOCKETS vs SSE vs LONG POLLING:
• Long polling: client sends a request, server holds it open until there's data (or timeout), client immediately re-requests — simulates push over plain HTTP, simplest but has request overhead per "message."
• SSE: see Day 16 — built-in browser support via EventSource, auto-reconnect, one-directional.
• WebSockets: full duplex, lowest overhead per message once connected, but needs a persistent connection (consideration for load balancers/proxies — some need special config for WS upgrade).

CLOUD GCP/AWS FUNDAMENTALS (relevant since Project B deploys to GCP Cloud Run + Vercel):
• Compute: AWS EC2 / GCP Compute Engine (VMs) vs AWS Lambda / GCP Cloud Functions (serverless, pay-per-invocation) vs Cloud Run (serverless containers — scales to zero, good middle ground for a containerized FastAPI app).
• Storage: AWS S3 / GCP Cloud Storage (object storage, used for Project B's audio file uploads).
• Managed databases: AWS RDS / GCP Cloud SQL — handles backups, patching, replication so you don't manage the DB server yourself.

TOP INTERVIEW QUESTIONS:
1. Explain TCP's AIMD behavior and why it produces a "sawtooth" throughput pattern. → Window grows additively each RTT until loss, then is cut multiplicatively — repeating that cycle creates the sawtooth.
2. Why is Cloud Run a good fit for Project B's backend? → Serverless containers that scale to zero when idle (cost-efficient) and scale up automatically on the FastAPI app under load, without managing servers directly.
3. Flow control vs congestion control? → Flow control protects the RECEIVER from being overwhelmed; congestion control protects the NETWORK from being overwhelmed.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Summary Agent", color: "project", tasks: ["Summary Agent: agenda, decisions, context", "Action Item Extractor: who/what/when", "Test on real transcripts"], detail: {
        type: "project", project: "Project B: Summary Agent + Action Item Extractor",
        steps: `GOAL: Build the first two specialist agents that consume the transcript and produce structured outputs.

STEP 1: Summary Agent — extracts agenda, key decisions, and context from the speaker-labeled transcript:
def summary_agent_node(state: MeetingState) -> MeetingState:
    transcript_text = format_transcript_for_llm(state["transcript"])
    prompt = f"""Summarize this meeting transcript. Include:
    1. Agenda/topics discussed
    2. Key decisions made
    3. Important context for someone who missed the meeting

    Transcript:
    {transcript_text}"""
    state["summary"] = call_llm(prompt)
    return state

STEP 2: Action Item Extractor — structured output (Pydantic schema, same pattern as Project A Day 6) capturing who/what/when:
class ActionItem(BaseModel):
    owner: str
    task: str
    due_date: str | None  # often not explicitly stated — agent should infer "ASAP" or leave null honestly rather than hallucinate a date

def action_item_node(state: MeetingState) -> MeetingState:
    parser = PydanticOutputParser(pydantic_object=ActionItem)
    # prompt explicitly asks the LLM to only extract items with a clear owner, not vague mentions
    state["action_items"] = extract_action_items(state["transcript"], parser)
    return state

STEP 3: Add both as parallel nodes after transcription (same fan-out pattern as Project A Day 9):
graph.add_edge("transcribe", "summary_agent")
graph.add_edge("transcribe", "action_item_agent")

STEP 4: Test on real transcripts — record a few short test "meetings" yourself (or use public sample meeting recordings) with deliberately clear action items ("Sarah will send the report by Friday") to verify extraction accuracy before testing on messier real-world audio.

STEP 5: Compare outputs against your own manual notes from the same recording — this is the most honest accuracy check available before you have real users.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Docker + K8s", color: "sd", tasks: ["Docker internals", "Kubernetes basics: pods, services, deployments"], detail: {
        type: "sd", topic: "Docker & Kubernetes Basics",
        notes: `DOCKER INTERNALS:
• A container is a process (or group of processes) running with its own namespaces (PID, network, mount, etc. — see Day 5 OS notes) and cgroup resource limits, using a layered filesystem (each Dockerfile instruction creates a new read-only layer, with a thin writable layer on top at runtime).
• Image vs container: an image is the static, immutable set of layers; a container is a running instance of that image with its own writable layer.
• This layered approach is why Docker builds are cacheable per-layer — changing only your application code (a late layer) doesn't invalidate earlier layers like base OS + dependency installation.

KUBERNETES BASICS:
• Pod: the smallest deployable unit — one or more tightly-coupled containers that share networking/storage (commonly just one container per pod, with a sidecar for cross-cutting concerns).
• Service: a stable network endpoint that load-balances traffic across a set of pods (pods are ephemeral and get new IPs when restarted; a Service gives a consistent address).
• Deployment: manages a set of identical pod replicas, handles rolling updates and rollbacks declaratively (you describe desired state, Kubernetes reconciles toward it).
• Relevant to Project B's eventual deployment: Docker Compose (used Day 24) is for LOCAL multi-container orchestration; Kubernetes is the production-grade equivalent for managing containers across a cluster of machines with auto-scaling, self-healing, and rolling deploys.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs", "Follow up Week 3 start apps"], detail: null },
    ]
  },
  {
    day: 19, date: "Thu, 09 Jul", week: 3,
    weekTheme: "Graphs Advanced | CN Revision | Project B RAG",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Alien Dictionary (Hard)", "Network Delay Time (Medium)", "Cheapest Flights K Stops (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Alien Dictionary", difficulty: "Hard", link: "https://leetcode.com/problems/alien-dictionary/", solution: `// Java - build graph from adjacent word comparisons, then topological sort
public String alienOrder(String[] words) {
    Map<Character, Set<Character>> graph = new HashMap<>();
    Map<Character, Integer> indegree = new HashMap<>();
    for (String w : words) for (char c : w.toCharArray()) indegree.putIfAbsent(c, 0);

    for (int i = 0; i < words.length - 1; i++) {
        String w1 = words[i], w2 = words[i+1];
        if (w1.length() > w2.length() && w1.startsWith(w2)) return ""; // invalid ordering
        for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
            char c1 = w1.charAt(j), c2 = w2.charAt(j);
            if (c1 != c2) {
                graph.putIfAbsent(c1, new HashSet<>());
                if (graph.get(c1).add(c2)) indegree.merge(c2, 1, Integer::sum);
                break;
            }
        }
    }
    Queue<Character> queue = new LinkedList<>();
    for (char c : indegree.keySet()) if (indegree.get(c) == 0) queue.offer(c);
    StringBuilder result = new StringBuilder();
    while (!queue.isEmpty()) {
        char c = queue.poll();
        result.append(c);
        for (char next : graph.getOrDefault(c, Collections.emptySet())) {
            if (--indegree.get(next) == 0) queue.offer(next);
        }
    }
    return result.length() == indegree.size() ? result.toString() : ""; // cycle check
}` },
          { name: "Network Delay Time", difficulty: "Medium", link: "https://leetcode.com/problems/network-delay-time/", solution: `// Java - Dijkstra's algorithm with a priority queue, O(E log V) time
public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    for (int[] t : times) graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // [node, dist]
    pq.offer(new int[]{k, 0});
    Map<Integer, Integer> dist = new HashMap<>();
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        if (dist.containsKey(cur[0])) continue;
        dist.put(cur[0], cur[1]);
        for (int[] edge : graph.getOrDefault(cur[0], Collections.emptyList())) {
            if (!dist.containsKey(edge[0])) pq.offer(new int[]{edge[0], cur[1] + edge[1]});
        }
    }
    if (dist.size() != n) return -1;
    return Collections.max(dist.values());
}` },
          { name: "Cheapest Flights K Stops", difficulty: "Medium", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", solution: `// Java - Bellman-Ford limited to k+1 relaxations, O(K*E) time
public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int i = 0; i <= k; i++) {
        int[] temp = dist.clone();
        for (int[] f : flights) {
            int u = f[0], v = f[1], w = f[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < temp[v]) {
                temp[v] = dist[u] + w;
            }
        }
        dist = temp;
    }
    return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
}
// Bellman-Ford with exactly k+1 rounds naturally bounds the number of edges (stops) used.` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Core CS – CN Revision", color: "cs", tasks: ["25 CN interview questions revision", "Full CS mega-mock 45 min"], detail: {
        type: "cs", topic: "CN Revision: 25 Questions + CS Mega-Mock",
        notes: `TIMED DRILL — 25 CN QUESTIONS, then a FULL 45-MIN CS MEGA-MOCK mixing OS + DBMS + CN together (simulates how real interviews jump between topics).

SAMPLE CN REVISION SET:
1. Walk through what happens from typing a URL to seeing the page (DNS → TCP handshake → TLS handshake → HTTP request → render). This is one of the most common "tell me everything you know" interview questions.
2. TCP vs UDP — when would each lose data, and how does TCP recover?
3. What's the purpose of the TTL field in DNS records?
4. Explain HTTP/2 multiplexing in one sentence.
5. What does a load balancer's health check typically verify?
6. CORS — what problem does it solve and why does it exist?
7. What's a man-in-the-middle attack and how does TLS prevent it (certificate verification)?
8. Explain NAT (Network Address Translation) — why does your home network need it?
9. What's the difference between a forward proxy and a reverse proxy?
10. How does a CDN reduce latency, concretely?

MEGA-MOCK STRUCTURE (45 min):
• 15 min OS (process scheduling, memory, synchronization)
• 15 min DBMS (indexing, transactions, normalization)
• 15 min CN (HTTP, TCP/UDP, security)
• Treat it like a real interview: answer out loud or write full sentences, not just keywords. Time pressure reveals gaps that untimed review hides.

This is the last pure CS content day before the System Design HLD block takes over the "Core CS" slot in Week 4 — use this to lock in anything shaky from OS/DBMS/CN before that shift.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – RAG Q&A Agent", color: "project", tasks: ["ChromaDB transcript chunks", "RAG Q&A Agent: answers questions about meeting"], detail: {
        type: "project", project: "Project B: RAG Q&A Agent with ChromaDB",
        steps: `GOAL: Let users ask natural-language questions about a meeting and get answers grounded in the actual transcript — a Retrieval-Augmented Generation (RAG) agent.

STEP 1: Chunk the transcript into ChromaDB — break the speaker-labeled transcript into overlapping chunks (e.g., 500 tokens with 50-token overlap) so retrieval can find relevant context without missing things split across a hard chunk boundary:
import chromadb
client = chromadb.Client()
collection = client.create_collection(f"meeting_{meeting_id}")

def index_transcript(meeting_id: str, chunks: list[str]):
    collection.add(
        documents=chunks,
        ids=[f"chunk_{i}" for i in range(len(chunks))],
        metadatas=[{"meeting_id": meeting_id} for _ in chunks]
    )

STEP 2: RAG Q&A Agent — given a user question, retrieve the most relevant chunks, then ask the LLM to answer USING ONLY that retrieved context (reduces hallucination vs asking the LLM to answer from general knowledge):
def answer_question(meeting_id: str, question: str) -> str:
    results = collection.query(query_texts=[question], n_results=4)
    context = "\\n".join(results["documents"][0])
    prompt = f"Answer using ONLY this meeting transcript context:\\n{context}\\n\\nQuestion: {question}"
    return call_llm(prompt)

STEP 3: Wire indexing as a graph node that runs after transcription (in parallel with summary_agent and action_item_agent — all three only need the transcript, not each other's output).

STEP 4: Test with realistic questions on your sample transcripts: "What did Sarah say about the deadline?", "Did anyone raise concerns about budget?" — verify answers are GROUNDED (cite something actually in the transcript) rather than generic.

STEP 5: This RAG pattern (chunk → embed/index → retrieve → answer-with-context) is one of the most commonly asked-about AI engineering patterns in interviews right now — be ready to explain WHY you chunk with overlap, and why retrieval-then-constrained-answer beats just asking the LLM directly.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – SD Mock", color: "sd", tasks: ["Full 45-min SD mock: Design WhatsApp", "Record and self-review"], detail: {
        type: "sd", topic: "SD Mock: Design WhatsApp (Full 45-min, Recorded)",
        notes: `FULL 45-MINUTE MOCK — DESIGN WHATSAPP, RECORDED FOR SELF-REVIEW.

STRUCTURE TO FOLLOW (same structure for every mock from here forward):
1. Clarify requirements (2-3 min): 1:1 chat only, or also group chat? Media support? Read receipts? Scale (millions vs billions of users)?
2. Back-of-envelope estimation (3-5 min): DAU, messages/day, peak QPS, storage growth/year.
3. High-level architecture (10 min): draw the boxes — client, chat servers (WebSocket), presence service, message store, push notification service for offline delivery.
4. Deep dive 1-2 components (15-20 min): pick the most interesting ones — e.g., HOW does the system route a message to the right chat server for an online recipient? HOW does delivery-receipt state get tracked without excessive write load?
5. Trade-offs & wrap-up (5 min): what would change at 10x scale? What did you simplify/skip given the time constraint?

SELF-REVIEW AFTER RECORDING (watch/listen back, score 1-5 on each):
• Did you ask clarifying questions BEFORE diving into design (strong signal of real-world experience)?
• Did you justify decisions ("I'm using X because Y trade-off") rather than just naming technologies?
• Did you manage time well across the 5 phases, or rush/overrun on one section?
• Did you proactively mention trade-offs and failure modes, or only when prompted?`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "5 personalised dream company applications", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 20, date: "Fri, 10 Jul", week: 3,
    weekTheme: "WEEK 3 REVISION + Project B Agents Done",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–11:30 AM", emoji: "💻", label: "DSA Revision", color: "dsa", tasks: ["Redo 3 weakest Trees/Graphs", "SD Mock: Design Twitter Feed (record)"], detail: null },
      { time: "11:30–1:00 PM", emoji: "🟢", label: "CS Mega-Mock", color: "cs", tasks: ["25 CN interview questions timed", "Full CS mega-mock 45 min"], detail: {
        type: "cs", topic: "CS Mega-Mock: Final Timed Review (Week 3 Close)",
        notes: `SECOND TIMED DRILL — 25 CN QUESTIONS (different angle than Day 19) + ANOTHER full 45-min CS mega-mock.

WHY REPEAT THIS FORMAT: Spaced repetition under time pressure is what actually cements interview recall — doing it twice across Days 19-20 mimics how real interview loops often have back-to-back technical rounds covering overlapping ground from different interviewers.

FOCUS AREAS BASED ON TYPICAL WEAK SPOTS:
• Security: OWASP Top 10 specifics (most candidates can name 2-3, not 10 — review the full list).
• TCP congestion control internals — many candidates know "TCP is reliable" but can't explain HOW (ACKs, retransmission, AIMD).
• Database isolation levels — dirty/non-repeatable/phantom reads are commonly confused with each other; drill the precise definitions.
• Distributed systems vocabulary: CAP theorem (Day 5 in Week 1), 2PC/Saga (Day 12) — these tie System Design and DBMS together, and Week 4 onward will assume fluency here.

SELF-ASSESSMENT: By the end of Day 20, you should be able to explain ANY topic from Weeks 1-3 (OS, DBMS, CN) out loud, unscripted, in under 90 seconds, with at least one concrete example. If a topic still takes you longer than that or needs notes, write it on your "weak topics" list — Day 26 and Day 28 are dedicated to clearing exactly that list.`
      } },
      { time: "1:00–2:00 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "2:00–3:30 PM", emoji: "🔵", label: "Project B – Test Agents", color: "project", tasks: ["Test all 3 agents on 5 real transcripts", "LangChain structured output", "Fix any prompt issues"], detail: {
        type: "project", project: "Project B: Test All 3 Agents on Real Transcripts",
        steps: `GOAL: Validate Summary, Action Item, and RAG Q&A agents together on a batch of 5 real transcripts, and fix any prompt issues before moving to integration agents (JIRA/Notion/Email) next week.

STEP 1: Run the full pipeline (transcribe → summary + action items + RAG indexing, all parallel) on 5 real transcripts — mix it up: a short standup-style meeting, a longer planning meeting, one with multiple speakers talking over each other (diarization stress test).

STEP 2: LangChain structured output review — audit the Action Item Extractor's outputs specifically for hallucinated owners/dates (the most common RAG/extraction failure mode) — cross-check against the actual transcript text.

STEP 3: Fix prompt issues based on results — common fixes at this stage:
  - Summary too generic → add explicit instruction to quote/reference specific moments.
  - Action items missing implicit tasks ("I'll handle that" without restating what "that" is) → add a coreference-resolution instruction to the prompt.
  - RAG answers ignoring retrieved context and answering from general knowledge → strengthen the "ONLY use this context" instruction, possibly add a fallback "I don't see this in the transcript" response when retrieval confidence is low.

STEP 4: Document the before/after for at least 2 prompt fixes — this kind of "here's a failure mode I found and how I fixed it" detail is exactly the substance that makes a project discussion compelling in interviews (much stronger than just describing the final working state).

STEP 5: This is Project B's mid-point checkpoint — by now you have working transcription, summarization, action extraction, and Q&A. Next week adds integrations (JIRA, Notion, Email) and the frontend.`
      } },
      { time: "3:30–5:30 PM", emoji: "🟡", label: "Full SD Mock", color: "sd", tasks: ["Full 45-min System Design mock #2", "Design Google Drive (record)"], detail: {
        type: "sd", topic: "Full SD Mock #2: Design Google Drive (Recorded)",
        notes: `FULL 45-MINUTE MOCK — DESIGN GOOGLE DRIVE, RECORDED FOR SELF-REVIEW.

This is your second full timed mock (after Day 19's WhatsApp), specifically chosen to revisit Google Drive since you'll do an even DEEPER pass on Day 24 — this mock surfaces what you remember unprompted before that deep-dive reinforces it.

SAME 5-PHASE STRUCTURE AS DAY 19:
1. Clarify requirements: file size limits? Real-time collaborative editing in scope, or just storage+sync? Sharing/permissions model?
2. Estimation: number of users, average file size, total storage, upload/download QPS.
3. High-level architecture: client/sync agent, metadata service, blob storage, chunking layer.
4. Deep dive: pick either deduplication (content-addressable storage) or sync conflict resolution (last-write-wins vs CRDTs) — both are rich enough for 15-20 minutes of real depth.
5. Trade-offs: what breaks first at 100x scale? (Likely answer: metadata service becomes the bottleneck before blob storage does, since blob storage is more naturally horizontally scalable.)

COMPARE THIS RECORDING TO DAY 19's: are you faster at the estimation phase? Are you reaching for the SAME few deep-dive topics every time (sign of a comfort zone) or genuinely picking what's most interesting/relevant per system?`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "5:30–7:00 PM", emoji: "💼", label: "Pipeline Review", color: "jobs", tasks: ["Pipeline audit", "5 dream company applications with demos", "Respond to all messages"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
    ]
  },
  {
    day: 21, date: "Sat, 11 Jul", week: 3,
    weekTheme: "Graphs + DP | System Design HLD | Project B Frontend",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Climbing Stairs (Easy)", "House Robber (Medium)", "Coin Change (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/", solution: `// Java - bottom-up DP (Fibonacci-shaped), O(n) time, O(1) space
public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}` },
          { name: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/", solution: `// Java - DP, choice at each house: rob it or skip it, O(n) time, O(1) space
public int rob(int[] nums) {
    int robPrev = 0, skipPrev = 0;
    for (int num : nums) {
        int newRob = skipPrev + num;
        int newSkip = Math.max(robPrev, skipPrev);
        robPrev = newRob;
        skipPrev = newSkip;
    }
    return Math.max(robPrev, skipPrev);
}` },
          { name: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/", solution: `// Java - bottom-up DP, O(amount * coins) time
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design HLD", color: "cs", tasks: ["URL Shortener + Rate Limiter HLD", "Full design 45 min each"], detail: {
        type: "cs", topic: "HLD Practice: URL Shortener + Rate Limiter",
        notes: `FULL HIGH-LEVEL DESIGN PRACTICE — 45 MIN EACH, TWO DESIGNS BACK TO BACK.

URL SHORTENER — KEY DECISIONS TO ARTICULATE:
• Requirements: scale (reads >> writes, ~100:1 ratio typical), custom alias support, analytics (click tracking), expiry.
• Short code generation: base62 encoding of an auto-increment ID (simple, no collisions, but reveals approximate creation order/volume) vs hashing the URL + truncating (risk of collisions, needs collision handling) vs a pre-generated pool of random codes (avoids both issues, adds infra).
• Data model: short_code (PK), long_url, created_at, expiry, owner_id, click_count.
• Read path: short_code → long_url lookup should hit a cache (Redis) first — this is a textbook cache-aside pattern, since reads vastly outnumber writes.
• Redirect type: 301 (permanent, browsers cache it — fewer hits to your server, but you lose analytics on cached redirects) vs 302 (temporary, every click hits your server — better analytics, more load). Most production shorteners use 302 specifically to keep click analytics accurate.

RATE LIMITER — KEY DECISIONS:
• Algorithm choice (token bucket is the most commonly expected answer — allows bursts up to bucket size while enforcing average rate).
• Where to enforce it: API Gateway level (centralized, doesn't hit your services) vs per-service (more granular, more complex).
• Distributed rate limiting: if you have multiple API server instances, the counter needs to live in a shared store (Redis with atomic INCR + EXPIRE) rather than in-process memory, or you'll undercount the true global rate.

MOCK FORMAT: Treat each as a real 45-min interview — state requirements, do back-of-envelope estimation (QPS, storage), sketch the high-level architecture, then dive into the 1-2 most interesting deep-dive components. Record yourself if possible.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – JIRA + Notion Agents", color: "project", tasks: ["JIRA Agent: auto-create tickets from action items", "Notion Agent: create page with summary"], detail: {
        type: "project", project: "Project B: JIRA + Notion Integration Agents",
        steps: `GOAL: Add two integration agents that push the pipeline's output into tools teams actually use — this is what makes the project feel like a real product rather than a standalone demo.

STEP 1: JIRA Agent — auto-creates tickets from extracted action items:
from jira import JIRA
def create_jira_tickets(action_items: list[ActionItem], jira_client: JIRA, project_key: str):
    created = []
    for item in action_items:
        issue = jira_client.create_issue(fields={
            "project": project_key,
            "summary": item.task,
            "description": f"Owner: {item.owner}\\nDue: {item.due_date or 'Not specified'}",
            "issuetype": {"name": "Task"},
        })
        created.append(issue.key)
    return created

STEP 2: Notion Agent — creates a meeting summary page:
from notion_client import Client
def create_notion_page(notion: Client, database_id: str, meeting_title: str, summary: str, action_items: list):
    notion.pages.create(
        parent={"database_id": database_id},
        properties={"Name": {"title": [{"text": {"content": meeting_title}}]}},
        children=[
            {"object": "block", "type": "heading_2", "heading_2": {"rich_text": [{"text": {"content": "Summary"}}]}},
            {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"text": {"content": summary}}]}},
            # + action items as a bulleted list block
        ]
    )

STEP 3: Add both as graph nodes that run AFTER summary_agent and action_item_agent complete (they depend on that output, unlike the earlier parallel fan-out).

STEP 4: Make both integrations OPTIONAL/configurable — not every user will have JIRA or Notion connected, so the pipeline should gracefully skip these nodes if no API credentials are configured for a given user/workspace, rather than failing the whole run.

STEP 5: Test against real (or sandbox) JIRA and Notion workspaces — confirm tickets/pages are created with correct content and don't duplicate on pipeline retries (tie back to the idempotency concept from your Day 16 SD notes).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Notification + Autocomplete", color: "sd", tasks: ["Notification System design", "Search Autocomplete: Trie, top-k"], detail: {
        type: "sd", topic: "Notification System & Search Autocomplete",
        notes: `NOTIFICATION SYSTEM DESIGN:
• Channels: push (FCM/APNs), email (SendGrid — same provider you'll use in Project B!), SMS (Twilio), in-app.
• Async architecture: notification requests go onto a queue (Kafka/SQS) rather than being sent synchronously — a slow third-party provider (e.g., SendGrid having a bad day) shouldn't block the service that triggered the notification.
• Idempotency: each notification needs a unique ID so retries from queue redelivery don't spam the user twice.
• User preference & batching: respect opt-outs per channel; batch high-frequency events into digests rather than firing one notification per event (e.g., "5 new comments" instead of 5 separate pushes).

SEARCH AUTOCOMPLETE:
• Trie (prefix tree) structure: O(prefix length) to find the relevant subtree of completions.
• Precompute top-K popular completions AT each trie node so lookups don't need to scan a whole subtree at query time — classic space/time trade-off.
• Update strategy: popularity ranking is typically refreshed via periodic batch jobs (e.g., hourly), not on every keystroke in real time — real-time precision isn't worth the cost here.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 22, date: "Sun, 12 Jul", week: 4,
    weekTheme: "DP 2D | System Design | Project B Frontend",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Longest Common Subsequence (Medium)", "Edit Distance (Medium)", "Word Break (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/", solution: `// Java - 2D DP table, O(m*n) time
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}` },
          { name: "Edit Distance", difficulty: "Medium", link: "https://leetcode.com/problems/edit-distance/", solution: `// Java - 2D DP (Levenshtein distance), O(m*n) time
public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i-1) == word2.charAt(j-1)) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1])); // replace, delete, insert
        }
    }
    return dp[m][n];
}` },
          { name: "Word Break", difficulty: "Medium", link: "https://leetcode.com/problems/word-break/", solution: `// Java - 1D DP, dp[i] = can s[0..i) be segmented, O(n^2) time
public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.contains(s.substring(j, i))) { dp[i] = true; break; }
        }
    }
    return dp[s.length()];
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design HLD", color: "cs", tasks: ["Twitter Feed + WhatsApp design", "Full HLD 45 min each"], detail: {
        type: "cs", topic: "HLD Practice: Twitter Feed + WhatsApp",
        notes: `TWITTER NEWS FEED — KEY DECISIONS:
• Fan-out on write: when a user posts, immediately push the post into all followers' feed caches. Fast reads (feed is pre-computed), but expensive writes for users with millions of followers (the "celebrity problem").
• Fan-out on read: feed is assembled at read time by querying all followed users' recent posts and merging. Cheap writes, expensive reads (especially for users following many people).
• Hybrid approach (what Twitter actually does): fan-out on write for most users, fan-out on read for celebrities/high-follower accounts — combine both at feed-read time.

WHATSAPP MESSAGING DESIGN — KEY DECISIONS:
• Connection model: WebSockets for persistent bidirectional connections (each online user maintains one to a chat server).
• Delivery receipts (single check / double check / blue check): message flows client → server (single check, server received it) → recipient's device (double check, delivered) → recipient reads it (blue check, read receipt) — each is a separate state transition tracked per message.
• Message ordering & delivery guarantee: typically "at least once" delivery with client-side deduplication (message IDs), since exactly-once across a distributed system is notoriously hard.
• Offline users: messages queue server-side (or in a message broker) until the recipient's device reconnects, then are delivered and the queue is cleared.
• End-to-end encryption (mention if asked): server can route messages without being able to read content — uses asymmetric key exchange (e.g., Signal Protocol) per conversation.

MOCK FORMAT: 45 min each. Practice clearly distinguishing fan-out trade-offs out loud — this exact "celebrity problem" framing is one of the most common system design interview moments across companies.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – SendGrid + Next.js Frontend", color: "project", tasks: ["SendGrid Email Agent", "Next.js frontend: file upload UI + progress bar"], detail: {
        type: "project", project: "Project B: SendGrid Email Agent + Next.js Frontend Start",
        steps: `GOAL: Add an email delivery agent for meeting summaries, and start building the Next.js frontend so the project has a real UI, not just an API.

STEP 1: SendGrid Email Agent — sends the meeting summary + action items to attendees:
import sendgrid
from sendgrid.helpers.mail import Mail

def send_summary_email(to_emails: list[str], meeting_title: str, summary: str, action_items: list):
    sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
    html_body = render_summary_email_template(meeting_title, summary, action_items)
    message = Mail(from_email="noreply@yourapp.com", to_emails=to_emails,
                    subject=f"Meeting Summary: {meeting_title}", html_content=html_body)
    sg.send(message)

STEP 2: Next.js frontend scaffold:
npx create-next-app@latest frontend --typescript --tailwind --app

STEP 3: File upload UI — a drag-and-drop component for audio/video files, hitting your FastAPI /upload endpoint:
// app/upload/page.tsx
'use client'
export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  async function handleUpload() {
    const formData = new FormData();
    formData.append("file", file!);
    setUploading(true);
    const res = await fetch(\`\${API_URL}/upload\`, { method: "POST", body: formData });
    const { meeting_id } = await res.json();
    router.push(\`/meetings/\${meeting_id}\`);
  }
  // ...drag-drop zone + progress bar UI
}

STEP 4: Progress bar — since processing is async (Day 17), poll GET /meetings/{id} every few seconds to update upload/processing status in the UI, or prepare for the WebSocket upgrade coming Day 23.

STEP 5: Test the email agent on a real test meeting, and confirm the frontend can successfully upload a file and navigate to a (still placeholder) meeting detail page.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – Security Deep Dive", color: "sd", tasks: ["OWASP Top 10 with code demos", "SQL injection, XSS, CSRF prevention"], detail: {
        type: "sd", topic: "Security Deep Dive: OWASP Top 10 with Code Demos",
        notes: `OWASP TOP 10 — WITH CONCRETE EXAMPLES:

SQL INJECTION:
• Vulnerable: f"SELECT * FROM users WHERE name = '{user_input}'" — attacker passes ' OR '1'='1 to bypass the filter.
• Fixed: use parameterized queries — cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,)) — the driver handles escaping, input is never concatenated into the SQL string.

XSS (Cross-Site Scripting):
• Vulnerable: rendering user input directly as HTML, e.g., <div>{user_comment}</div> where user_comment contains <script>...</script>.
• Fixed: escape output by default (most modern frameworks like React do this automatically unless you explicitly use dangerouslySetInnerHTML), plus a Content-Security-Policy header as defense-in-depth.

CSRF (Cross-Site Request Forgery):
• Attack: a malicious site embeds a form that auto-submits to your site, using the victim's already-logged-in cookies.
• Fixed: CSRF tokens (a random value tied to the user's session, required on state-changing requests) or SameSite=Strict/Lax cookies (browser won't send the cookie on cross-site requests).

OTHERS WORTH NAMING: Broken Authentication, Sensitive Data Exposure (always encrypt in transit AND at rest), Security Misconfiguration (default credentials, verbose stack traces in production), Insecure Deserialization, Using Components with Known Vulnerabilities (relevant: keep your Project A/B dependencies patched), Insufficient Logging & Monitoring.

DIRECTLY RELEVANT TO PROJECT A: your Security Agent (built Day 8) is literally automating detection of SQL injection, XSS, and hardcoded secrets in PRs — today's deep-dive is the theory behind what that agent checks for.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 20 companies (follow up Week 3 apps)", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 23, date: "Mon, 13 Jul", week: 4,
    weekTheme: "DP Hard | System Design | Project B Docker + Auth",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Longest Increasing Subsequence (Medium)", "Unique Paths (Medium)", "Partition Equal Subset Sum (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Longest Increasing Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/", solution: `// Java - patience sorting with binary search, O(n log n) time
public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int pos = Collections.binarySearch(tails, num);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(num);
        else tails.set(pos, num);
    }
    return tails.size();
}
// tails[i] = smallest possible tail value for an increasing subsequence of length i+1.` },
          { name: "Unique Paths", difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/", solution: `// Java - 2D DP, O(m*n) time, can be reduced to O(n) space
public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}` },
          { name: "Partition Equal Subset Sum", difficulty: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum/", solution: `// Java - 0/1 knapsack: can we hit sum/2?, O(n * sum) time
public boolean canPartition(int[] nums) {
    int sum = Arrays.stream(nums).sum();
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int num : nums) {
        for (int j = target; j >= num; j--) { // iterate backwards to avoid reuse
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design – YouTube/Netflix + Uber", color: "cs", tasks: ["YouTube/Netflix streaming", "Uber Ride Matching: geohash"], detail: {
        type: "cs", topic: "HLD Practice: YouTube/Netflix Streaming + Uber Ride Matching",
        notes: `YOUTUBE/NETFLIX STREAMING — KEY DECISIONS:
• Video upload pipeline: raw upload → transcoding into multiple resolutions/bitrates (480p, 720p, 1080p, 4K) → chunking into small segments → distribute to CDN edge nodes.
• Adaptive bitrate streaming (ABR): the client player monitors its own network conditions and requests the appropriate quality chunk for the NEXT segment — this is why video quality smoothly steps up/down rather than buffering hard. Protocols: HLS (HTTP Live Streaming) or DASH.
• Storage tiering: hot content (recently uploaded, trending) on fast/expensive storage near edge; cold content (rarely watched) on cheap object storage, fetched on demand.
• Metadata service (separate from video bytes): video title, description, view count, recommendations — typically a separate data store optimized for queries, not large blob storage.

UBER RIDE MATCHING — KEY DECISIONS:
• Geohashing: encode lat/long into a string where nearby locations share string prefixes — lets you efficiently query "drivers near this rider" with a simple prefix/range query instead of expensive geo-distance calculations across the whole dataset.
• Alternative: QuadTree or S2 geometry (Google's library) — same goal (spatial indexing), different data structure trade-offs.
• Matching algorithm: nearest available driver by geohash cell, then expand search radius (adjacent cells) if none found — balances match speed vs match quality (closest driver).
• Real-time location updates: drivers periodically push location (every few seconds) — this is itself a significant write-heavy workload requiring its own scaling strategy (often a separate location service, not the same DB as ride/trip records).

MOCK FORMAT: 45 min each — focus on explaining WHY geohashing beats naive lat/long range queries, and WHY ABR streaming matters for video UX. These "why this approach" justifications are what separate strong answers from ones that just name-drop technologies.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Chat UI + WebSocket", color: "project", tasks: ["Chat UI for RAG Q&A", "WebSocket frontend: real-time agent progress", "JWT auth: user accounts + meeting history"], detail: {
        type: "project", project: "Project B: Chat UI + WebSocket Progress + JWT Auth",
        steps: `GOAL: Build the RAG Q&A chat interface, upgrade from polling to real-time WebSocket progress updates, and add user authentication.

STEP 1: Chat UI for RAG Q&A — a simple chat interface on the meeting detail page that calls your Day 19 RAG endpoint:
// app/meetings/[id]/chat.tsx
async function askQuestion(meetingId: string, question: string) {
  const res = await fetch(\`\${API_URL}/meetings/\${meetingId}/ask\`, {
    method: "POST", body: JSON.stringify({ question }),
  });
  return res.json(); // { answer: string }
}
// render as a simple message list + input box, similar to any chat UI

STEP 2: WebSocket frontend for real-time agent progress — replace Day 22's polling with a proper push-based update:
// backend: FastAPI WebSocket endpoint broadcasting pipeline stage updates
@app.websocket("/ws/meetings/{meeting_id}")
async def meeting_progress_ws(websocket: WebSocket, meeting_id: str):
    await websocket.accept()
    async for update in subscribe_to_pipeline_updates(meeting_id):
        await websocket.send_json(update)  # {"stage": "transcribing", "progress": 40}

STEP 3: Frontend WebSocket client — connect on the meeting detail page, update a progress bar live as the pipeline moves through transcribe → summarize → extract → index stages (directly ties back to your Day 24 SD notes on architecture patterns — this is literally an event-driven pipeline pushing state changes to a subscriber).

STEP 4: JWT auth — user accounts + meeting history, reusing the JWT pattern from your Day 3 SD notes (access + refresh token pair):
@app.post("/auth/login")
def login(credentials: LoginRequest):
    user = authenticate(credentials)
    access_token = create_jwt(user.id, expires_in=900)  # 15 min
    refresh_token = create_refresh_token(user.id)
    return {"access_token": access_token, "refresh_token": refresh_token}

STEP 5: Protect routes (upload, meeting list, chat) behind auth — confirm an unauthenticated request gets a 401, and a valid token can access a user's own meeting history but not another user's.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – OOPS Patterns", color: "sd", tasks: ["Design Patterns: Factory, Strategy, Observer", "OOPS SOLID review"], detail: {
        type: "sd", topic: "Design Patterns & OOP/SOLID Review",
        notes: `DESIGN PATTERNS — FACTORY, STRATEGY, OBSERVER:

FACTORY PATTERN:
• Encapsulates object creation logic so the calling code doesn't need to know the concrete class being instantiated — e.g., a function that returns the right LLM client (OpenAI, Anthropic, local model) based on a config value, without the caller needing if/else branches everywhere.

STRATEGY PATTERN:
• Defines a family of interchangeable algorithms behind a common interface, selected at runtime — e.g., your rate limiter could support multiple algorithms (token bucket, sliding window) behind a common RateLimitStrategy interface, swappable without changing calling code.

OBSERVER PATTERN:
• An object (subject) maintains a list of dependents (observers) and notifies them of state changes — e.g., when Project B's agent pipeline completes a stage, it could notify a WebSocket observer to push a progress update to the frontend, without the pipeline needing to know about WebSocket details directly.

OOP/SOLID REVIEW (full recap from Day 4):
• Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
• Practical test for SRP: can you describe what a class does in one sentence WITHOUT using "and"? If not, it likely has more than one responsibility.
• These patterns and principles aren't abstract trivia — they're the actual justification for why Project A/B's multi-agent architecture (separate Bug Finder, Security, Code Style agents coordinated by a supervisor) is a good design: each agent has a single responsibility, and adding a new agent (open/closed) doesn't require modifying existing ones.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 15 companies", "10 custom cover letters to dream companies", "10 referral DMs"], detail: null },
    ]
  },
  {
    day: 24, date: "Tue, 14 Jul", week: 4,
    weekTheme: "DP Advanced | System Design | Project B Deploy",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Regular Expression Matching (Hard)", "Buy Sell Stock Cooldown (Medium)", "Max Product Subarray (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Regular Expression Matching", difficulty: "Hard", link: "https://leetcode.com/problems/regular-expression-matching/", solution: `// Java - 2D DP over (s, pattern) positions, O(m*n) time
public boolean isMatch(String s, String p) {
    int m = s.length(), n = p.length();
    boolean[][] dp = new boolean[m+1][n+1];
    dp[0][0] = true;
    for (int j = 1; j <= n; j++) {
        if (p.charAt(j-1) == '*') dp[0][j] = dp[0][j-2]; // '*' can match zero occurrences
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            char pc = p.charAt(j-1);
            if (pc == '.' || pc == s.charAt(i-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else if (pc == '*') {
                dp[i][j] = dp[i][j-2]; // zero occurrences of preceding char
                char prev = p.charAt(j-2);
                if (prev == '.' || prev == s.charAt(i-1)) {
                    dp[i][j] = dp[i][j] || dp[i-1][j]; // one or more occurrences
                }
            }
        }
    }
    return dp[m][n];
}` },
          { name: "Buy Sell Stock Cooldown", difficulty: "Medium", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", solution: `// Java - state machine DP (hold/sold/rest), O(n) time, O(1) space
public int maxProfit(int[] prices) {
    int hold = Integer.MIN_VALUE, sold = 0, rest = 0;
    for (int price : prices) {
        int prevSold = sold;
        sold = hold + price;                 // sell today
        hold = Math.max(hold, rest - price);  // keep holding or buy today
        rest = Math.max(rest, prevSold);      // cooldown or stay resting
    }
    return Math.max(sold, rest);
}` },
          { name: "Max Product Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/", solution: `// Java - track running max AND min (negatives flip them), O(n) time
public int maxProduct(int[] nums) {
    int maxProd = nums[0], curMax = nums[0], curMin = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int num = nums[i];
        if (num < 0) { int tmp = curMax; curMax = curMin; curMin = tmp; } // swap on negative
        curMax = Math.max(num, curMax * num);
        curMin = Math.min(num, curMin * num);
        maxProd = Math.max(maxProd, curMax);
    }
    return maxProd;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design – Google Drive + Redis", color: "cs", tasks: ["Google Drive design deep dive", "Redis eviction, clustering"], detail: {
        type: "cs", topic: "HLD Practice: Google Drive + Redis Deep Dive",
        notes: `GOOGLE DRIVE DESIGN — KEY DECISIONS (deeper pass than Day 10's intro):
• File chunking: large files split into fixed-size blocks (e.g., 4MB chunks) — enables resumable uploads (only re-upload failed chunks, not the whole file) and deduplication (identical chunks across different files/users are stored once, referenced by hash).
• Deduplication: content-addressable storage — hash each chunk (e.g., SHA-256), store unique hashes only, reference-count them. Massively saves storage when many users upload the same file (e.g., a popular PDF).
• Sync protocol: client maintains a local index of file states; on change, computes a diff (which chunks changed) and uploads only those — this is why editing one paragraph in a huge doc doesn't re-upload the whole file.
• Metadata service: file tree structure, permissions, version history — separate from the blob storage layer, needs strong consistency (you don't want two users to see different folder structures).
• Conflict resolution: when two clients edit offline and reconnect, common strategies are last-write-wins (simple, can lose data) vs operational transforms / CRDTs (used by Google Docs for real-time collaborative editing, much more complex).

REDIS — EVICTION & CLUSTERING DEEP DIVE:
• Eviction policies (when memory is full): noeviction (errors on write), allkeys-lru (evict least-recently-used across all keys), volatile-lru (LRU but only among keys with a TTL set), allkeys-random, volatile-ttl (evict the one closest to expiring).
• Redis Cluster: shards data across multiple nodes using hash slots (16384 total slots, each key maps to one via CRC16(key) % 16384). Each node owns a range of slots; clients can be redirected (MOVED response) to the correct node.
• Replication: each shard typically has replica nodes for read scaling and failover (Redis Sentinel or Cluster handles automatic failover).

TOP INTERVIEW QUESTIONS:
1. Why use content hashing for dedup instead of just comparing file names? → File names can differ while content is identical (or vice versa) — hashing the actual bytes is the only reliable way to detect true duplicates.
2. When would allkeys-lru be wrong as an eviction policy? → If you have some keys that should NEVER be evicted (e.g., critical config) mixed with cache data — volatile-lru (only evicting keys with a TTL) is safer there.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – Docker Compose", color: "project", tasks: ["Docker Compose: FastAPI + Next.js + PostgreSQL + Redis + ChromaDB", "Full stack local test"], detail: {
        type: "project", project: "Project B: Full Docker Compose Stack",
        steps: `GOAL: Bring the entire system — backend, frontend, database, cache, vector store — into a single docker-compose setup that runs the whole stack locally with one command.

STEP 1: Full docker-compose.yml:
services:
  backend:
    build: ./app
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/meetings
      - REDIS_URL=redis://redis:6379
      - CHROMA_HOST=chroma
    depends_on: [db, redis, chroma]
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on: [backend]
  db:
    image: postgres:15
    environment: [POSTGRES_USER=user, POSTGRES_PASSWORD=pass, POSTGRES_DB=meetings]
    volumes: ["pgdata:/var/lib/postgresql/data"]
  redis:
    image: redis:7-alpine
  chroma:
    image: chromadb/chroma:latest
    volumes: ["chromadata:/chroma/chroma"]
volumes:
  pgdata:
  chromadata:

STEP 2: Why Redis here too (Project B didn't explicitly need it before this point): caching RAG query results for repeated questions, and potentially session/rate-limit storage for the new auth layer — same cache-aside pattern from Project A.

STEP 3: docker-compose up --build — this is the real test of whether all the pieces built across Days 14-23 actually integrate cleanly, not just individually.

STEP 4: Full stack local test: upload a real audio file through the Next.js UI, watch the WebSocket progress bar move through pipeline stages, confirm the summary/action items appear, ask a question in the chat UI, confirm a grounded RAG answer comes back.

STEP 5: Fix any integration issues surfaced here (env var mismatches between services, CORS configuration between frontend/backend, network connectivity between containers) — this kind of "does it actually all work together" debugging is genuinely valuable, common interview-relevant experience.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "System Design – SD Patterns", color: "sd", tasks: ["Read-heavy, write-heavy, event-driven patterns", "MCP overview"], detail: {
        type: "sd", topic: "Architecture Patterns: Read-heavy, Write-heavy, Event-driven; MCP Overview",
        notes: `READ-HEAVY vs WRITE-HEAVY vs EVENT-DRIVEN PATTERNS:

READ-HEAVY systems (e.g., URL shortener, news feed):
• Optimize for caching, read replicas, CDN — the bottleneck is serving fast reads at scale, writes are comparatively rare.

WRITE-HEAVY systems (e.g., logging/metrics pipelines, IoT sensor ingestion):
• Optimize for write throughput — often batching writes, using append-only/log-structured storage, and async processing pipelines (write fast to a queue, process/aggregate later).

EVENT-DRIVEN ARCHITECTURE:
• Services communicate via events (published to a broker like Kafka) rather than direct synchronous calls — producers don't need to know who consumes their events, enabling loose coupling and independent scaling.
• Trade-off: harder to trace a request's full path (no single synchronous call stack), and requires careful handling of event ordering/idempotency (tie-back to Day 16's delivery guarantees).
• Project B's pipeline (upload → transcribe → summarize → extract actions → notify) is naturally event-driven — each stage could publish an event that triggers the next, rather than one giant synchronous function.

MCP OVERVIEW (Model Context Protocol):
• A standardized protocol letting AI models/agents discover and call external tools/data sources through a common interface, instead of every integration being a bespoke, hand-rolled function-calling setup.
• Directly relevant: Day 27 has you build an actual MCP server for both Project A and B — today's overview is the conceptual groundwork (what a tool/resource looks like in MCP, how a client like Claude Desktop discovers and invokes them) before the hands-on implementation.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 15 companies", "Follow up + respond to interview invites", "Schedule pending interviews"], detail: null },
    ]
  },
  {
    day: 25, date: "Wed, 15 Jul", week: 4,
    weekTheme: "Hard DSA Mix | System Design | CI/CD Deploy",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Trapping Rain Water – Stack (Hard)", "Largest Rectangle in Histogram (Hard)", "N-Queens (Hard)"], detail: {
        type: "dsa", items: [
          { name: "Trapping Rain Water – Stack", difficulty: "Hard", link: "https://leetcode.com/problems/trapping-rain-water/", solution: `// Java - monotonic decreasing stack, O(n) time
public int trap(int[] height) {
    Deque<Integer> stack = new ArrayDeque<>();
    int water = 0;
    for (int i = 0; i < height.length; i++) {
        while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
            int top = stack.pop();
            if (stack.isEmpty()) break;
            int distance = i - stack.peek() - 1;
            int boundedHeight = Math.min(height[i], height[stack.peek()]) - height[top];
            water += distance * boundedHeight;
        }
        stack.push(i);
    }
    return water;
}` },
          { name: "Largest Rectangle in Histogram", difficulty: "Hard", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", solution: `// Java - monotonic increasing stack of indices, O(n) time
public int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0;
    for (int i = 0; i <= heights.length; i++) {
        int h = (i == heights.length) ? 0 : heights[i];
        while (!stack.isEmpty() && h < heights[stack.peek()]) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}` },
          { name: "N-Queens", difficulty: "Hard", link: "https://leetcode.com/problems/n-queens/", solution: `// Java - backtracking with column/diagonal conflict sets, O(n!) worst case
public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    int[] cols = new int[n]; // cols[row] = column of queen in that row
    backtrack(result, cols, 0, n, new HashSet<>(), new HashSet<>(), new HashSet<>());
    return result;
}
private void backtrack(List<List<String>> result, int[] cols, int row, int n,
        Set<Integer> usedCols, Set<Integer> diag1, Set<Integer> diag2) {
    if (row == n) { result.add(buildBoard(cols, n)); return; }
    for (int col = 0; col < n; col++) {
        int d1 = row - col, d2 = row + col;
        if (usedCols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue;
        cols[row] = col;
        usedCols.add(col); diag1.add(d1); diag2.add(d2);
        backtrack(result, cols, row + 1, n, usedCols, diag1, diag2);
        usedCols.remove(col); diag1.remove(d1); diag2.remove(d2);
    }
}
private List<String> buildBoard(int[] cols, int n) {
    List<String> board = new ArrayList<>();
    for (int col : cols) {
        char[] row = new char[n];
        Arrays.fill(row, '.');
        row[col] = 'Q';
        board.add(new String(row));
    }
    return board;
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design – Final Designs", color: "cs", tasks: ["Notification System + Search Autocomplete", "Resume audit: quantify every bullet"], detail: {
        type: "cs", topic: "Final Designs: Notification System + Search Autocomplete; Resume Audit",
        notes: `NOTIFICATION SYSTEM DESIGN:
• Multi-channel delivery: push (mobile), email, SMS, in-app — typically routed through a unified notification service that fans out to channel-specific providers (FCM/APNs for push, SendGrid for email, Twilio for SMS).
• Async via message queue: notification requests are queued (Kafka/SQS) rather than sent synchronously, so a slow downstream provider doesn't block the calling service.
• User preferences & rate limiting: respect per-user channel preferences (opted out of email?) and avoid notification spam (batching/digest for high-frequency events).
• Idempotency: use a unique notification ID so retries (from queue redelivery) don't send duplicates to the user.

SEARCH AUTOCOMPLETE:
• Trie (prefix tree): each node represents a character; traversing from root by typed prefix gives you the subtree of all matching completions — O(prefix length) to find the subtree, then need top-K ranking within it.
• Top-K ranking: store the top K most popular completions cached AT each trie node (precomputed) so you don't have to traverse the whole subtree at query time — classic time/space trade-off.
• Update strategy: popularity counts don't need to update in real-time per keystroke globally — typically refreshed via a periodic batch job (e.g., hourly) rather than synchronously on every search.

RESUME AUDIT — QUANTIFY EVERY BULLET:
• Replace vague statements ("worked on backend features") with metrics ("built and deployed a FastAPI service handling 50+ PR reviews/day, reducing manual review time by ~40%").
• Use the project metrics you'll generate from Project A and B (Days 13 and 26) — number of agents built, latency numbers, test coverage, deployment uptime.
• Structure: Action verb + what you built + technology + measurable outcome. This is the single highest-leverage resume change most candidates skip.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Project B – GitHub Actions CI/CD + Deploy", color: "project", tasks: ["GitHub Actions CI/CD pipeline", "Deploy backend to GCP Cloud Run", "Deploy frontend to Vercel"], detail: {
        type: "project", project: "Project B: CI/CD Pipeline + Production Deploy",
        steps: `GOAL: Set up automated deployment so pushes to main automatically build, test, and deploy both backend and frontend.

STEP 1: GitHub Actions CI/CD pipeline (.github/workflows/deploy.yml):
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest
  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: ai-meeting-intelligence
          image: gcr.io/\${{ secrets.GCP_PROJECT }}/meeting-backend

STEP 2: Deploy backend to GCP Cloud Run — Cloud Run is a great fit here (tie back to your Day 18 SD notes): scales to zero when idle (cost-efficient for a side project), scales up automatically under real load, and runs your existing Docker image with no code changes needed.

STEP 3: Configure Cloud Run environment variables/secrets (DATABASE_URL pointing at a Cloud SQL instance, API keys via Secret Manager rather than plain env vars for anything sensitive).

STEP 4: Deploy frontend to Vercel — connect the GitHub repo's /frontend directory, Vercel auto-detects Next.js and handles the build/deploy pipeline with minimal config; set NEXT_PUBLIC_API_URL to the live Cloud Run backend URL.

STEP 5: End-to-end smoke test on the LIVE deployed stack (not local docker-compose this time): upload a real file through the live frontend URL, confirm the full pipeline runs against the live backend, confirm WebSocket connections work through Vercel + Cloud Run (check CORS and WebSocket proxy configuration specifically — this is a common point of friction going from local to cloud deploy).`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "Resume + LinkedIn Audit", color: "sd", tasks: ["Quantify every resume bullet", "LinkedIn headline & about update", "Add Project B metrics"], detail: {
        type: "sd", topic: "Resume & LinkedIn Audit",
        notes: `RESUME — QUANTIFY EVERY BULLET:
• Weak: "Built an AI code review tool using LangGraph."
• Strong: "Built a multi-agent AI code review system (FastAPI + LangGraph, 3 specialized agents) that auto-reviews GitHub PRs, deployed live on Render with real webhook integration."
• Formula: Action verb + specific technology + what it does + scale/outcome metric (even an honest "processes PRs end-to-end in under 30 seconds" beats a vague claim).
• Use REAL numbers from your own projects once available (test coverage %, number of agents, response latency, lines of code reviewed, demo views) — don't inflate, but don't undersell either.

LINKEDIN HEADLINE & ABOUT UPDATE:
• Headline: go beyond a job title — include what you actually build/specialize in (e.g., "Backend & AI Systems Engineer | Building multi-agent LLM applications with FastAPI + LangGraph").
• About section: 3-4 short paragraphs — who you are, what you've built recently (Project A, soon Project B), what you're looking for. Front-load the most impressive/relevant info since most readers skim the first 2 lines before deciding to expand.

ADD PROJECT B METRICS (once Project B exists — placeholder structure for now):
• Plan to capture: number of agents in the pipeline, processing time per meeting, accuracy/quality notes from testing on real transcripts, deployment details (GCP Cloud Run + Vercel).
• Treat this as a living document — update it the moment you have a real number, rather than batching it all for Day 26.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 10 companies", "Respond to all offers/invites", "Negotiate if needed"], detail: null },
    ]
  },
  {
    day: 26, date: "Thu, 16 Jul", week: 4,
    weekTheme: "Hard DSA | Median Data Stream | Project B DONE",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Find Median from Data Stream (Hard)", "Top K Frequent Elements (Medium)", "Task Scheduler (Medium)"], detail: {
        type: "dsa", items: [
          { name: "Find Median from Data Stream", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/", solution: `// Java - two heaps (max-heap for lower half, min-heap for upper half), O(log n) per insert
class MedianFinder {
    private PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
    private PriorityQueue<Integer> upper = new PriorityQueue<>(); // min-heap

    public void addNum(int num) {
        lower.offer(num);
        upper.offer(lower.poll()); // rebalance: move max of lower into upper
        if (upper.size() > lower.size()) lower.offer(upper.poll());
    }
    public double findMedian() {
        if (lower.size() > upper.size()) return lower.peek();
        return (lower.peek() + upper.peek()) / 2.0;
    }
}` },
          { name: "Top K Frequent Elements", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/", solution: `// Java - bucket sort by frequency, O(n) time
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) count.merge(num, 1, Integer::sum);
    List<Integer>[] buckets = new List[nums.length + 1];
    for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
        int freq = entry.getValue();
        if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
        buckets[freq].add(entry.getKey());
    }
    int[] result = new int[k];
    int idx = 0;
    for (int freq = buckets.length - 1; freq >= 0 && idx < k; freq--) {
        if (buckets[freq] == null) continue;
        for (int num : buckets[freq]) {
            if (idx == k) break;
            result[idx++] = num;
        }
    }
    return result;
}` },
          { name: "Task Scheduler", difficulty: "Medium", link: "https://leetcode.com/problems/task-scheduler/", solution: `// Java - math formula based on max frequency and cooldown, O(n) time
public int leastInterval(char[] tasks, int n) {
    int[] count = new int[26];
    for (char t : tasks) count[t - 'A']++;
    Arrays.sort(count);
    int maxFreq = count[25];
    int idleSlots = (maxFreq - 1) * n;
    for (int i = 24; i >= 0 && count[i] > 0; i--) {
        idleSlots -= Math.min(count[i], maxFreq - 1);
    }
    idleSlots = Math.max(0, idleSlots);
    return tasks.length + idleSlots;
}
// Build (maxFreq - 1) blocks of size (n+1) around the most frequent task, fill with other tasks.` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "System Design – All Weak Topics Review", color: "cs", tasks: ["Review all weak SD topics", "Top 5 SD interview questions"], detail: {
        type: "cs", topic: "Review: All Weak System Design Topics",
        notes: `REVIEW DAY — CONSOLIDATE EVERYTHING FROM WEEKS 1-4.

PROCESS: Go back through your notes from Day 1 (REST API) through Day 25 (Notification System + Autocomplete) and re-skim ANY topic you flagged as weak in earlier checkpoint days (Day 7, 13, 19-20). Don't re-read everything cover to cover — target the gaps.

TOP 5 SD INTERVIEW QUESTIONS TO BE ABLE TO ANSWER COLD:
1. "Design a system that needs to scale from 1,000 to 10 million users — what changes at each order of magnitude?" (Tests whether you understand incremental scaling, not just naming every technology at once.)
2. "Walk me through how you'd add caching to this design, and what could go wrong with it." (Tests cache invalidation awareness — "there are only two hard things in computer science.")
3. "How would you handle a single point of failure in [whatever system you just designed]?" (Tests redundancy/failover thinking.)
4. "What's the bottleneck in your design at 100x current scale, and how would you fix it?" (Tests genuine understanding vs memorized architecture diagrams.)
5. "How do you decide between strong and eventual consistency for this specific feature?" (Ties back to CAP theorem, Week 1 Day 5.)

A GOOD SELF-CHECK: for every system you've designed this month (URL Shortener, Twitter Feed, WhatsApp, Netflix, Uber, Google Drive, Rate Limiter, Notification System, Autocomplete), you should be able to draw the high-level box diagram from memory in under 5 minutes, including data flow direction and the 1-2 trickiest trade-offs.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "PROJECT B DONE ✅", color: "project", tasks: ["Write README with full architecture", "Record 3-min demo video", "Create demo GIF", "Update resume with both projects"], detail: {
        type: "project", project: "PROJECT B DONE ✅ — README, Demo, Resume Update",
        steps: `GOAL: Package Project B the same way you did Project A on Day 13 — polished README, demo artifact, updated resume reflecting BOTH projects now complete.

STEP 1: README.md — structure (parallel to Project A's, for consistency across your portfolio):
  # AI Meeting Intelligence
  One-line pitch
  ## Architecture diagram — show: upload → S3 → FFmpeg → Whisper+diarization → [Summary, Action Items, RAG indexing] (parallel) → [JIRA, Notion, Email] (integration agents) → frontend (Next.js, WebSocket live progress, chat Q&A)
  ## Tech stack (FastAPI, LangGraph, Whisper, pyannote, ChromaDB, Next.js, PostgreSQL, Redis, Docker, GCP Cloud Run, Vercel)
  ## Key features (multi-agent pipeline, RAG-grounded Q&A, real-time progress via WebSocket, JIRA/Notion/Email integrations)
  ## Live demo link (frontend) + architecture notes
  ## Setup instructions

STEP 2: Record a 3-minute demo video (slightly longer than Project A's since there's more surface area — frontend + chat + integrations to show): upload a real meeting recording, show the live WebSocket progress bar, show the generated summary/action items, ask a question in the chat UI and show a grounded answer, show a created JIRA ticket or Notion page.

STEP 3: Create a demo GIF (a short, looping clip — e.g., the upload → progress → summary flow) for embedding directly in the README and LinkedIn post, since not everyone will click through to a full video.

STEP 4: Update resume with BOTH projects' metrics — by now you should have two genuinely strong, different-domain bullets: Project A (backend automation, GitHub integration, multi-agent code review) and Project B (full-stack, audio/AI pipeline, RAG, real-time UI, multiple third-party integrations).

STEP 5: This completes the core technical build for the entire 30-day program. Days 27-30 focus on MCP server wrappers for both projects, final interview prep, and polish — but the engineering substance is now done.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–6:30 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "6:30–8:00 PM", emoji: "🟡", label: "Final SD Mock", color: "sd", tasks: ["Full 45-min SD mock: Design Netflix", "Record + self-grade"], detail: {
        type: "sd", topic: "Final SD Mock: Design Netflix (Recorded + Self-Graded)",
        notes: `FULL 45-MINUTE MOCK — DESIGN NETFLIX, RECORDED + SELF-GRADED.

This mock revisits video streaming (introduced Day 11) as your THIRD full timed mock — by now the 5-phase structure (requirements → estimation → high-level design → deep dive → trade-offs) should feel automatic rather than effortful.

SELF-GRADING RUBRIC (score 1-5 each, be honest):
1. Requirements gathering — did you ask sharp clarifying questions, or assume requirements and dive straight in?
2. Estimation — were your back-of-envelope numbers reasonable and did you SHOW the math, not just state a final number?
3. High-level design clarity — could someone unfamiliar with the system follow your box diagram description?
4. Depth of the deep-dive — did you go genuinely deep on 1-2 components (e.g., adaptive bitrate streaming, or the transcoding pipeline), or stay surface-level across too many things?
5. Trade-off awareness — did you proactively flag what you simplified/skipped, and what would break first at 100x scale?

TARGET: by this point in the program, you should be averaging 4+ across all five categories. Any category still at 2-3 is exactly what the remaining mocks (Day 27's double mock, Day 28's final mock) should specifically target.`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Job Hunt", color: "jobs", tasks: ["Apply 10 companies", "Respond to all offers/invites"], detail: null },
    ]
  },
  {
    day: 27, date: "Fri, 17 Jul", week: 4,
    weekTheme: "WEEK 4 REVISION + MCP Servers",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–11:30 AM", emoji: "💻", label: "DSA Final Revision", color: "dsa", tasks: ["Redo 3 weakest DP problems", "Full DSA mock 45 min timed"], detail: null },
      { time: "11:30–1:00 PM", emoji: "🟡", label: "SD Double Mock", color: "sd", tasks: ["2 full SD mocks back-to-back (45 min each)", "Record both for review"], detail: {
        type: "sd", topic: "SD Double Mock: Two Full Mocks Back-to-Back",
        notes: `TWO FULL 45-MINUTE SD MOCKS, BACK TO BACK — RECORD BOTH FOR REVIEW.

WHY BACK-TO-BACK MATTERS: real interview loops often schedule 2-4 technical rounds in a single day. Practicing two full mocks consecutively (with minimal break) tests whether your energy, clarity, and structure hold up in round 2 the same way they did in round 1 — a gap many candidates don't discover until the real thing.

PICK TWO SYSTEMS YOU HAVEN'T BEEN ASSIGNED YET THIS MONTH, OR REPEAT YOUR WEAKEST-GRADED ONE FROM DAY 26 PLUS ONE NEW SYSTEM. Good candidates for variety: a ride-sharing dispatch system, a payments/ledger system, a collaborative document editor (ties to Project B's potential real-time features), or a job-scheduling system.

REVIEW BOTH RECORDINGS BACK TO BACK:
• Did round 2 show fatigue (rushed phases, weaker justifications) compared to round 1?
• Did you reuse the exact same deep-dive topics across both unrelated systems (a sign you're defaulting to a comfort zone rather than picking what's actually most interesting per system)?
• Note: this is also the day you build real MCP servers for both projects (see the Project block) — pace your energy across the mocks AND the build work.`
      } },
      { time: "1:00–2:00 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "2:00–5:00 PM", emoji: "🔵", label: "MCP Servers A + B", color: "project", tasks: ["Build MCP Server for Project A (AI Code Reviewer)", "Build MCP Server for Project B (Meeting Intelligence)", "Test with Claude Desktop"], detail: {
        type: "project", project: "MCP Servers for Project A + B; Share on LinkedIn",
        steps: `GOAL: Wrap both completed projects as MCP (Model Context Protocol) servers — letting an AI assistant like Claude Desktop directly invoke your code reviewer and meeting intelligence pipeline as tools. Then share the finished work publicly.

STEP 1: MCP Server for Project A (AI Code Reviewer) — expose a tool that triggers a review on a given PR:
from mcp.server import Server
from mcp.types import Tool

server = Server("ai-code-reviewer-mcp")

@server.list_tools()
async def list_tools():
    return [Tool(name="review_pr", description="Run AI code review on a GitHub PR",
                  inputSchema={"type": "object", "properties": {"repo": {"type": "string"}, "pr_number": {"type": "integer"}}})]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "review_pr":
        result = await run_review_pipeline(arguments["repo"], arguments["pr_number"])
        return [{"type": "text", "text": format_comment(result)}]

STEP 2: MCP Server for Project B (Meeting Intelligence) — expose tools for uploading/querying meetings:
# tools: "summarize_meeting" (given an audio file path or URL), "ask_meeting" (given meeting_id + question)
# same Server/Tool pattern as Step 1, pointing at your existing pipeline functions

STEP 3: Test both MCP servers with Claude Desktop — add them to Claude Desktop's MCP config, restart, confirm the tools appear and can be invoked directly from a conversation (e.g., asking Claude to "review this PR" or "summarize this meeting recording" and watching it call your tool).

STEP 4: This MCP wrapper is a genuinely differentiating addition for late 2025/2026-era interviews — it shows you can adapt existing systems to emerging AI tooling standards, not just build the systems themselves. Document this clearly in both READMEs.

STEP 5: Share on LinkedIn — post both projects together as a "30 days, 2 AI agent systems" recap. Include the demo GIFs/videos from Days 13 and 26, mention the MCP integration as the capstone, and tag relevant technologies. Celebrate finishing 30 days of consistent execution — this is genuinely a significant body of work to have shipped.`
      } },
      { time: "5:00–6:00 PM", emoji: "💼", label: "Final Pipeline", color: "jobs", tasks: ["Full application pipeline audit", "5 dream company applications with project demos + MCP highlight", "Offer negotiation tactics review"], detail: null },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–8:00 PM", emoji: "🎉", label: "Share on LinkedIn", color: "project", tasks: ["Post both projects on LinkedIn", "Share MCP integration", "Celebrate 30 days!"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
    ]
  },
  {
    day: 28, date: "Sat, 18 Jul", week: 4,
    weekTheme: "Final Polish | Hard Mix | LinkedIn Launch",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–9:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Workout session"], detail: null },
      { time: "9:30–12:30 PM", emoji: "💻", label: "DSA Block", color: "dsa", tasks: ["Company-tagged: Google/Amazon 3 problems timed", "Median Data Stream (Hard)", "Redo 5 personally hardest problems without hints"], detail: {
        type: "dsa", items: [
          { name: "Median Data Stream", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/", solution: `// Java - two heaps (max-heap for lower half, min-heap for upper half), O(log n) per insert
class MedianFinder {
    private PriorityQueue<Integer> lower = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
    private PriorityQueue<Integer> upper = new PriorityQueue<>(); // min-heap

    public void addNum(int num) {
        lower.offer(num);
        upper.offer(lower.poll()); // rebalance: move max of lower into upper
        if (upper.size() > lower.size()) lower.offer(upper.poll());
    }
    public double findMedian() {
        if (lower.size() > upper.size()) return lower.peek();
        return (lower.peek() + upper.peek()) / 2.0;
    }
}` }
        ]
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch", color: "break", tasks: ["Lunch"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🟢", label: "Final Weak Topics Review", color: "cs", tasks: ["Review all weak notes from all 4 weeks", "5 most common SD interview questions", "Rest well"], detail: {
        type: "cs", topic: "Final Weak Topics Review (All 4 Weeks)",
        notes: `FINAL CONSOLIDATED REVIEW — last full content-review day before the home stretch.

GO TOPIC BY TOPIC ACROSS THE FULL MONTH:
• Week 1 (OS): scheduling, memory/paging, deadlocks, file systems, concurrency.
• Week 2 (DBMS): ACID, isolation levels, indexing, normalization, NoSQL/sharding.
• Week 3 (CN): TCP/UDP, HTTP versions, TLS, REST/GraphQL/gRPC, security, rate limiting.
• Week 4 (System Design HLD): every system you designed, plus design patterns and OOP/SOLID (Day 23) and architecture patterns (Day 24).

5 MOST COMMON SD INTERVIEW QUESTIONS (cross-company pattern, not one specific system):
1. "Design [X]" where X is open-ended (chat app, URL shortener, feed, file storage, ride-sharing) — practice the same structured approach regardless of which X you get: requirements → estimation → high-level design → deep dive → trade-offs.
2. "How would you scale this to handle 10x traffic?"
3. "What are the failure modes of your design, and how do you detect/recover from them?"
4. "How would you test this system?" (often skipped in prep — have an answer ready: unit tests for logic, integration tests for service boundaries, load testing for scale claims.)
5. "What would you do differently if you had more time/budget?" (Shows self-awareness about trade-offs you made under interview time pressure.)

REST WELL: This is explicitly a lighter content day by design — the goal is consolidation, not cramming new material 9 days before the program ends. Don't skip the actual rest.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Break"], detail: null },
      { time: "4:00–6:00 PM", emoji: "🔵", label: "Final Polish – Both Projects", color: "project", tasks: ["Polish READMEs with impact metrics", "Add MCP to both READMEs", "Final deploy check - both live", "Share BOTH on LinkedIn"], detail: {
        type: "project", project: "Final Polish: Both Projects Production-Ready",
        steps: `GOAL: Final quality pass on both projects before the program closes — this is about polish and impact-framing, not new features.

STEP 1: Polish READMEs with impact metrics — go back through both READMEs and make sure every claim is backed by a real number where possible: actual latency measurements, actual test counts, actual demo interaction counts, rather than vague claims.

STEP 2: Add MCP details to both READMEs explicitly (Day 27's work) — a dedicated "## MCP Integration" section in each README showing the tool schema and a screenshot/GIF of Claude Desktop invoking it.

STEP 3: Final deploy check — both live: hit the live Render URL (Project A) and live Vercel/Cloud Run URLs (Project B) fresh, end to end, exactly as a recruiter or interviewer clicking through your resume links would experience them. Fix anything broken NOW, not after someone else finds it.

STEP 4: Share BOTH on LinkedIn (if Day 27's post needs a follow-up, or if you're doing a more polished final version now that everything is fully finished and tested) — consider a short written reflection alongside the demo links: what was hardest, what you'd do differently, what you learned about multi-agent architecture patterns across two different domains.

STEP 5: This is your last dedicated project-polish day in the program. Days 29-30 are buffer days for any remaining bugs, but treat TODAY as the deadline for "feature complete and presentable" — buffer days should be for unexpected issues, not planned remaining work.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "6:00–8:00 PM", emoji: "🟡", label: "Final Mock", color: "sd", tasks: ["Full 45-min mock: DSA + SD + Behavioural", "Record and self-grade"], detail: {
        type: "sd", topic: "Final Mock: DSA + SD + Behavioural Combined",
        notes: `FULL 45-MINUTE COMBINED MOCK — THE CLOSEST SIMULATION TO A REAL ONSITE LOOP YOU'LL DO THIS MONTH.

STRUCTURE (mirrors how some companies compress multiple rounds into a single interview, or how you might face back-to-back different question types from one interviewer):
• ~15 min: one DSA problem, solved and explained out loud (pick a company-tagged Hard/Medium from your Day 28 DSA block).
• ~20 min: one system design question, compressed structure (lighter on estimation, more focus on high-level design + one deep dive given the shorter time).
• ~10 min: 1-2 behavioral questions using STAR.

WHY COMBINE THEM: switching contexts rapidly (code → architecture → storytelling) under time pressure is a different skill than excelling at each in isolation with a full 45 minutes dedicated to just one. This is intentionally the hardest mock format in the whole program.

SELF-GRADE: did you keep composure switching between problem types? Did the time-boxing on the SD portion force you to cut the RIGHT corners (e.g., skip detailed estimation, keep the high-level design and one deep dive) rather than panicking and rushing everything equally?`
      } },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["Dinner"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–11:00 PM", emoji: "💼", label: "Final Applications", color: "jobs", tasks: ["Apply 10 companies", "5 dream companies with full project demos", "Celebrate 🎉"], detail: null },
    ]
  },
  {
    day: 29, date: "Sun, 19 Jul", week: 5,
    weekTheme: "Buffer / Light Review Day",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–8:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Light workout / active recovery"], detail: null },
      { time: "9:00–11:00 AM", emoji: "💻", label: "DSA Light Review", color: "dsa", tasks: ["Revisit 2-3 problems you found hardest this month", "Re-read your own notes/solutions"], detail: null },
      { time: "11:00–12:30 PM", emoji: "🟢", label: "Core CS Review", color: "cs", tasks: ["Skim weak-topic notes from earlier weeks", "Self-quiz on top interview questions"], detail: {
        type: "cs", topic: "Core CS Light Review (Buffer Day)",
        notes: `LIGHT REVIEW — SKIM, DON'T CRAM.

By Day 29, you've covered the full syllabus twice (once in Weeks 1-3, once in revision/mock days). This block is intentionally light:

• Skim your own weak-topic notes from earlier weeks (the ones you flagged on Days 7, 13, 19-20, 26, 28) — don't re-read everything, just the flagged gaps.
• Self-quiz on the "top interview questions" sections from each week's notes — cover the answer, try to recall it, then check.
• If something STILL doesn't stick after this many passes, that's valuable information: it tells you which 1-2 topics need a focused 15-minute deep dive on Day 30 or in your post-program study time, rather than spreading limited time evenly across everything.

This is also a good moment to mentally rehearse: if asked "what was the hardest CS concept to really internalize this month," you should have a specific, honest answer — interviewers respond well to genuine self-awareness over claimed mastery of everything.`
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch & Rest", color: "break", tasks: ["Full break, no screens"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🔴", label: "Project Buffer / Polish", color: "project", tasks: ["Fix any pending bugs in Project A/B", "Polish README + demo video/screenshots"], detail: {
        type: "project", project: "Project Buffer / Polish + Reflect on the 30 Days",
        steps: `GOAL: Use this buffer day for whatever genuinely still needs fixing across either project, then close out with deliberate reflection.

STEP 1: Fix any pending bugs in Project A/B — work from whatever list you've been keeping across the month (every project day above suggested testing and noting issues; this is where any remaining items finally get addressed).

STEP 2: Polish README + demo video/screenshots — a final pass for typos, broken links, outdated screenshots that don't match the current live deployment, or demo videos that reference features you've since changed.

STEP 3: Reflect on the 30-day journey — genuinely useful to write down (even just for yourself): what was the hardest technical problem you solved this month? What architecture decision are you most proud of? What would you build differently knowing what you know now?

STEP 4: List remaining weak areas to keep drilling — be specific and honest. This isn't about the projects anymore; it's about your overall interview readiness across DSA, CS fundamentals, and system design. A short, specific list (3-5 items) is far more useful than a vague "review everything" note.

STEP 5: This reflection is also genuinely useful interview material — "what did you learn building this" and "what would you do differently" are extremely common follow-up questions about portfolio projects, and having already thought it through carefully (rather than improvising in the moment) shows.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Stretch, hydrate"], detail: null },
      { time: "4:00–5:30 PM", emoji: "🟡", label: "System Design Light Review", color: "sd", tasks: ["Re-skim top 5 SD questions", "Review tradeoffs you struggled to explain"], detail: {
        type: "sd", topic: "System Design Light Review (Buffer Day)",
        notes: `LIGHT REVIEW — RE-SKIM, DON'T RE-LEARN.

• Re-skim the "top 5 SD interview questions" lists from Days 26 and 28.
• Specifically revisit any tradeoff you struggled to explain clearly across this month's mocks (Days 6, 19, 20, 26, 27, 28) — if you kept a running list of weak spots from self-grading, this is the day to close that list out.
• Common late-stage gaps worth a final check: explaining WHY consistent hashing beats naive modulo sharding in one sentence; explaining the celebrity fan-out problem in one sentence; explaining cache invalidation trade-offs in one sentence. If you can do all three crisply, your SD fundamentals are solid.

This is intentionally light — Day 29-30 are buffer/consolidation days by design, not for cramming new systems.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "5:30–6:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Relax, walk"], detail: null },
      { time: "6:00–7:30 PM", emoji: "💼", label: "Job Hunt Catch-up", color: "jobs", tasks: ["Catch up on pending applications", "Follow up on referral DMs sent earlier"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["No screens, family time"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–10:00 PM", emoji: "🎯", label: "Plan Next Steps", color: "project", tasks: ["Reflect on the 30-day journey", "List remaining weak areas to keep drilling"], detail: null },
    ]
  },
  {
    day: 30, date: "Mon, 20 Jul", week: 5,
    weekTheme: "Buffer / Light Review Day",
    schedule: [
      { time: "4:00 AM", emoji: "🕌", label: "Namaaz – Tahajjud", color: "namaaz", tasks: ["Pray Tahajjud (4:00 AM)"], detail: null },
      { time: "5:15 AM", emoji: "🕌", label: "Namaaz – Fajr", color: "namaaz", tasks: ["Pray Fajr (5:15 AM)"], detail: null },
      { time: "6:00–8:00 AM", emoji: "🏋️", label: "Gym", color: "gym", tasks: ["Light workout / active recovery"], detail: null },
      { time: "9:00–11:00 AM", emoji: "💻", label: "DSA Light Review", color: "dsa", tasks: ["Revisit 2-3 problems you found hardest this month", "Re-read your own notes/solutions"], detail: null },
      { time: "11:00–12:30 PM", emoji: "🟢", label: "Core CS Review", color: "cs", tasks: ["Skim weak-topic notes from earlier weeks", "Self-quiz on top interview questions"], detail: {
        type: "cs", topic: "Core CS Light Review (Final Buffer Day)",
        notes: `FINAL LIGHT REVIEW — same light-touch approach as Day 29.

• One more pass over your personal weak-topics list — by now it should be short (most gaps closed across 4 weeks of repeated exposure).
• Self-quiz format: pick 5 random questions from across OS/DBMS/CN/SD notes, answer out loud without looking, then check.
• Use any remaining mental energy on whichever SINGLE topic feels least solid — better to walk into interviews with 90% solid coverage and full confidence than 100% shaky coverage you're unsure you can recall under pressure.

This closes out the Core CS track for the 30-day program. The two AI projects (code review agent + meeting intelligence) and your interview pipeline carry forward as the visible proof of this month's work — the CS fundamentals are what let you defend your design decisions when interviewers probe "why did you build it that way?"`
      } },
      { time: "12:30–1:30 PM", emoji: "🍽️", label: "Lunch & Rest", color: "break", tasks: ["Full break, no screens"], detail: null },
      { time: "1:30–3:30 PM", emoji: "🔴", label: "Project Buffer / Polish", color: "project", tasks: ["Fix any pending bugs in Project A/B", "Polish README + demo video/screenshots"], detail: {
        type: "project", project: "Project Buffer / Polish + Plan Next Month's Goals",
        steps: `GOAL: Final buffer day for both projects, then shift focus from "the 30-day program" to "what comes next."

STEP 1: Fix any pending bugs in Project A/B — last call for anything still on your list from Day 29.

STEP 2: Polish README + demo video/screenshots — final pass; both repos and both live deployments should now be in a state you'd be comfortable having a recruiter click through completely unannounced.

STEP 3: Reflect on the 30-day journey (second pass, more forward-looking than Day 29's retrospective) — what does the NEXT month look like? Are you in active interview loops now? Do you need deeper specialization in a particular area based on the roles you're targeting?

STEP 4: Plan next month's goals — concrete next steps, for example: continuing to apply and interview using the pipeline built up over the month, deepening expertise in a specific area that came up as a gap during mocks, contributing to open source, or extending Project A/B with features that came up as "would be nice but out of scope" during the original build.

STEP 5: This closes the formal 30-day roadmap. The Namaaz practice, the gym habit, the structured daily rhythm, and the job search pipeline are all designed to continue past today — the program's real output isn't just two finished projects, it's 30 days of proven consistent execution across technical depth, physical health, and spiritual practice simultaneously, which is itself the strongest signal of all for what comes next.`
      } },
      { time: "1:30 PM", emoji: "🕌", label: "Namaaz – Zohr", color: "namaaz", tasks: ["Pray Zohr (1:30 PM)"], detail: null },
      { time: "3:30–4:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Stretch, hydrate"], detail: null },
      { time: "4:00–5:30 PM", emoji: "🟡", label: "System Design Light Review", color: "sd", tasks: ["Re-skim top 5 SD questions", "Review tradeoffs you struggled to explain"], detail: {
        type: "sd", topic: "System Design Light Review (Final Buffer Day)",
        notes: `FINAL LIGHT REVIEW — same approach as Day 29.

• One last pass over your personal weak-tradeoffs list.
• If you have any system design interviews scheduled in the immediate future, this is the day to mentally walk through THAT specific company's likely domain (e.g., a fintech company may lean toward consistency/transactions questions; a social app may lean toward feed/fan-out questions) and make sure that specific area is fresh.
• Otherwise, treat this as confirmation rather than new learning: you should be able to rattle off the 5-phase mock structure (requirements → estimation → high-level design → deep dive → trade-offs) without thinking about it — that structural fluency, more than any single system's specifics, is what carries across to whatever you're actually asked in a real interview.`
      } },
      { time: "5:15 PM", emoji: "🕌", label: "Namaaz – Asr", color: "namaaz", tasks: ["Pray Asr (5:15 PM)"], detail: null },
      { time: "5:30–6:00 PM", emoji: "☕", label: "Break", color: "break", tasks: ["Relax, walk"], detail: null },
      { time: "6:00–7:30 PM", emoji: "💼", label: "Job Hunt Catch-up", color: "jobs", tasks: ["Catch up on pending applications", "Follow up on referral DMs sent earlier"], detail: null },
      { time: "6:55 PM", emoji: "🕌", label: "Namaaz – Maghrib", color: "namaaz", tasks: ["Pray Maghrib (6:55 PM)"], detail: null },
      { time: "8:00–9:00 PM", emoji: "🍽️", label: "Dinner", color: "break", tasks: ["No screens, family time"], detail: null },
      { time: "8:30 PM", emoji: "🕌", label: "Namaaz – Isha", color: "namaaz", tasks: ["Pray Isha (8:30 PM)"], detail: null },
      { time: "9:00–10:00 PM", emoji: "🎯", label: "Plan Next Steps", color: "project", tasks: ["Reflect on the 30-day journey", "Plan next month's goals"], detail: null },
    ]
  },
];

export const BREAK_INFO = {
  startDate: "", endDate: "",
};