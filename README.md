# Node.js Cluster Module Example

This project demonstrates how to use the `cluster` module in Node.js to improve application scalability and resilience by utilizing multiple CPU cores.

## Overview

Node.js runs on a single-threaded event loop, which can limit its performance for CPU-intensive tasks. The `cluster` module helps distribute workload across multiple processes, fully utilizing the system's multi-core architecture.

## Features

- **Multi-Core Utilization**: Spreads workload across all CPU cores.
- **Crash Resilience**: Automatically restarts worker processes if they fail.
- **Scalable Architecture**: Efficiently handles high traffic by using multiple processes.

---

## Example Code

```javascript
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running: ${process.pid}`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new one.`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker: ${process.pid}\n`);
  }).listen(8000);

  console.log(`Worker process started: ${process.pid}`);
}
```

## Setup Instructions
### Prerequisites
Node.js installed (version 14+ recommended).
### Run the Project

- Clone the repository:
  
```
git clone https://github.com/your-username/cluster-example.git
cd cluster-example
```
- Install dependency

``` 
npm install
```



- Run the application
```
npm run builder
```


### Benefits
- Improved Performance: Utilizes all available CPU cores.
- Fault Tolerance: The master process ensures uninterrupted service by restarting failed workers.
- Load Balancing: Efficiently distributes incoming traffic.
