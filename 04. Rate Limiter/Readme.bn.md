# অধ্যায় 4: রেট লিমিটার ডিজাইন

## ভূমিকা (Introduction)
This chapter explores the design and implementation of a rate limiter—a system component used to control traffic rates sent by clients or services. Rate limiters are crucial for preventing abuse, reducing costs, and ensuring the stability of server resources. Examples of their use include limiting posts, account creations, and reward claims.

## রেট লিমিটিংয়ের সুবিধাসমূহ
- **DoS আক্রমণ প্রতিরোধ:** Blocking excess calls to avoid resource starvation.
- **খরচ সাশ্রয়:** Limiting unnecessary requests to reduce server expenses.
- **ওভারলোড প্রতিরোধ:** Filtering out excessive requests to stabilize server performance.

## ধাপ ১: সমস্যা বোঝা ও রিকোয়ারমেন্টস
### মূল বৈশিষ্ট্যসমূহ (Key Features)
- Server-side API rate limiter.
- Support for multiple throttle rules.
- Handle large-scale systems in distributed environments.
- Option for a standalone service or application-level code.
- Inform users when throttled.

### রিকোয়ারমেন্টস (Requirements)
- Accurate request throttling.
- Minimal latency.
- Low memory usage.
- Distributed capability.
- Clear exception handling.
- ফল্ট টলারেন্স বা ত্রুটি সহনশীলতা (Fault Tolerance).

## ধাপ ২: হাই-লেভেল আর্কিটেকচার ডিজাইন
### Placement Options
<div style="margin-left:2rem">
    <img src="./images/rate_limiter_architecture.png"  alt="Rate Limiting Middleware Architecture" width="550">
</div>

1. **ক্লায়েন্ট-সাইড ইমপ্লিমেন্টেশন:** Unreliable due to potential misuse.
2. **সার্ভার-সাইড ইমপ্লিমেন্টেশন:** Preferred for control and reliability.
3. **মিডলওয়্যার (API Gateway):** A flexible option for integrated rate limiting.


### Guidelines for Placement
- Evaluate current tech stack and choose efficient options.
- Select appropriate algorithms based on business needs.
- Use an API gateway if microservices are employed.
- Opt for commercial solutions if resources are limited.

## ধাপ ৩: রেট লিমিটিং অ্যালগরিদমসমূহ
### ১. টোকেন বাকেট অ্যালগরিদম (Token Bucket)
<div style="margin-left:2rem">
  <img src="./images/token-bucket.png"  alt="Token Bucket Algorithm" width="550">
</div>

- **Description:** একটি নির্দিষ্ট হারে বাকেটে টোকেন জমা হয়; প্রতিটি রিকোয়েস্ট একটি করে টোকেন খরচ করে।
- **Parameters:** Bucket size and refill rate.
- **Pros:** বাস্তবায়ন সহজ, মেমোরি সাশ্রয়ী এবং হঠাৎ ট্রাফিক চাপ (bursts) সামলাতে পারে।
- **Cons:** প্যারামিটারগুলো সঠিকভাবে টিউন করা প্রয়োজন।



### ২. লিকিং বাকেট অ্যালগরিদম (Leaking Bucket)
<div style="margin-left:2rem">
  <img src="./images/leaking-bucket.png"  alt="Leaking Bucket Algorithm" width="550">
</div>

- **Description:** Processes requests at a fixed rate using a FIFO queue.
- **Pros:** Memory-efficient, stable outflow rate.
- **Cons:** Traffic bursts may delay recent requests.
  

  Example: https://github.com/uber-go/ratelimit



### ৩. ফিক্সড উইন্ডো কাউন্টার (Fixed Window Counter)
<div style="margin-left:2rem">
  <img src="./images/fixed-window-counter.png"  alt="Fixed Window Counter" width="550">
</div>

- **Description:** Divides time into fixed intervals and uses counters to limit requests.
- **Pros:** Simple, efficient for specific use cases.
- **Cons:** Traffic spikes at window edges can exceed limits.

- Sudden burst of traffic at the edges of time windows
could cause more requests than allowed quota to go through.

  <img src="./images/fixed-window-issue.png"  alt="Fixed Window Issue" width="550">


### ৪. স্লাইডিং উইন্ডো লগ (Sliding Window Log)
<div style="margin-left:2rem">
  <img src="./images/sliding-window-log.png"  alt="Sliding Window Log" width="550">
</div>

- **Description:** Tracks timestamps to allow a rolling time window.
- **Pros:** Accurate rate limiting.
- **Cons:** High memory consumption.
  


### ৫. স্লাইডিং উইন্ডো কাউন্টার (Sliding Window Counter)
<div style="margin-left:2rem">
  <img src="./images/sliding-window-counter.png"  alt="Fixed Window Counter" width="550">
</div>

- **Description:** Combines fixed window and sliding log methods for smoothing spikes.
- **Pros:** Memory-efficient, handles traffic bursts.
- **Cons:** Approximation may not be perfectly strict.
  



## High-Level Architecture
<div style="margin-left:2rem">
  <img src="./images/architecture.png" style="margin-left: 40px; margin-top: 40px; margin-bottom: 20px;" alt="Architecture" width="550">
</div>

- **Data Storage:** Use in-memory caching (e.g., Redis) for fast counter operations.
- **Steps:**
  1. Client sends request to middleware.
  2. Middleware checks counters in Redis.
  3. Request is processed or rejected based on limits.


## Advanced Considerations
### Distributed Environments
- **Challenges:** Race conditions, synchronization issues.
- **Solutions:** Use locks, Lua scripts, or sorted sets in Redis. Employ centralized data stores for synchronization.

### Performance Optimizations
- Multi-data center setups for reduced latency.
- Eventual consistency models for synchronization.

### Monitoring
- Regular analytics to ensure algorithm effectiveness and adjust rules as needed.

