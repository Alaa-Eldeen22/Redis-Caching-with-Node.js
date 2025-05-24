# 🚀 Redis Caching Demo with Node.js, MySQL & Docker

Welcome to a blazing-fast demonstration of how **Redis caching** can dramatically improve the performance of backend APIs. This project showcases a Node.js application that retrieves large sets of product data from a MySQL database — with and without Redis caching — so you can witness the speed gains firsthand.

---

## 🔥 Why This Project?

Fetching data directly from a database — especially thousands of records — can be time-consuming. By introducing **Redis**, an in-memory data store, we reduce load times and database strain dramatically.

This project simulates a real-world use case where an API returns **10,000 product entries**. Using Redis caching, the response time drops from **seconds** to **milliseconds**.

---

## 🧠 What You'll Find

- How to implement caching in a Node.js API using Redis
- How to auto-seed large datasets
- How caching improves response time and reduces DB load

---

## 📁 Project Structure

```
├── app.js                   # Entry point
├── routes/
│   └── product.routes.js   # Product route definition
├── controllers/
│   └── product.controller.js # Handles HTTP requests
├── services/
│   └── product.service.js  # Core caching logic with Redis
├── models/
│   └── product.js          # Sequelize Product model
├── seeders/
│   └── product.seeder.js   # Seeds 10,000 sample products
├── config/
│   ├── database.config.js  # MySQL DB config
│   └── redisClient.js      # Redis client config
├── Dockerfile              # App Docker image
├── docker-compose.yml      # Full-stack orchestration
├── .env.example            # Environment variable template
└── README.md               # You are here
```

---

## 🚦 How It Works

1. On server start, the app connects to MySQL and Redis.
2. If the DB is empty, it seeds **10,000 products**.
3. When you hit the endpoint `/products`:
   - It first checks Redis for cached data.
   - If found (cache hit) ➜ serves instantly from Redis ⚡
   - If not found (cache miss) ➜ fetches from DB, stores in Redis for 3 mins 🕒

---

## 🧪 Try It Yourself

### 1. Clone the repository

```bash
git clone https://github.com/Alaa-Eldeen22/Redis-Caching-with-Node.js.git
cd Redis-Caching-with-Node.js
```

### 2. Create your `.env` file

```bash
cp .env.example .env
# Edit the .env file with your preferred settings
```

### 3. Run with Docker 🐳

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`

---

## ⚙️ Endpoint

### `GET /products`

Returns all products from either Redis cache or the MySQL database.

Response sample:

```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 47.25,
    "stock": 18,
    "isActive": true
  },
  ...
]
```

---

## 📊 Performance Testing with Artillery

You can benchmark the `/products` API using [Artillery](https://artillery.io/), a modern load-testing toolkit.

### 📦 Install Artillery

```bash
npm install -g artillery
```

### 🚀 Run a Test (Basic)

```bash
artillery quick --count 10 -n 20 http://localhost:3000/products
```

### 🚀 Run a Heavy Load Test

```bash
artillery quick --count 50 -n 200 http://localhost:3000/products
```

This simulates 50 virtual users making 200 requests each — totaling 10,000 requests.

### 📈 Results Summary (10,000 requests)

| Metric               | Without Cache | With Cache |
| -------------------- | ------------- | ---------- |
| Request Rate         | 15/sec        | 56/sec     |
| Response Time (min)  | 216 ms        | 368 ms     |
| Response Time (mean) | 3449.6 ms     | 881.3 ms   |
| Response Time (p95)  | 3534.1 ms     | 1002.4 ms  |
| Response Time (max)  | 3706 ms       | 1137 ms    |

> ⚡ Redis caching made the app **~4x faster under full load** and significantly reduced response time.

---

## 🧰 Tech Stack

- **Node.js** (v18)
- **Express.js**
- **Sequelize ORM**
- **MySQL 8**
- **Redis**
- **Docker & Docker Compose**
- **Artillery** (for performance testing)

---

## 🙌 Acknowledgments

Built with love to showcase the **real-world impact of caching**. Feel free to fork, improve, or use this project as a boilerplate for your own scalable backend systems.