# Node API Starter for Queue management on Typescript

The title is quite large, so let's get to the stack.

## 💾 Stack

- NodeJS 14.20
- Express 4.X
- Typescript 4.8.4
- BullMQ 2.2.0
- Docker 20.10.17

NodeJS for the server, express for the framework API, Typescript to keep types tight, BullMQ for queue management, Docker for development out of the box.

## 🏎️ Quick start

```
yarn
```

```
docker-compose up --build
```

# How to use

## Docker 🐳

Docker is optional and you can either use it (1) for development or (2) install the needed components locally. Requirements for
1. Node, npm or yarn, redis.
2. yarn, Docker.

## 🟥 Redis 

Redis is not optional; it is required by BullMQ, so you will need Redis to work with Queues.

You can get it running with very simple steps in MacOS by `brew install redis && brew services start redis`. This will start redis on 127.0.0.1:6379. Docker will too start an instance of this one too.
- The local one doesn't need a password.
- The one running in docker **needs a password**. Since Redis runs by default on [protected mode](https://redis.io/docs/manual/security/), it contains a password to access it to prevent a connection error.

## 💚 Express 

Express is set up because chances are you are setting this as part of a microservices architecture. The structure allows you to manage the queue through API calls. Basic ones are set up to POST (add), GET, DELETE jobs to the queue.

# 📚 Further reading 

- [BullMQ documentation](https://docs.bullmq.io/)
- [Express 4.x documentation](https://expressjs.com/en/guide/routing.html)
- [Redis official Docker](https://hub.docker.com/_/redis)

# 🍭 Other sugar

I created this starter repo forking [express-api-starter](https://github.com/w3cj/express-api-starter), so here is a list of some extra sugar that came with.

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
* [helmet](https://www.npmjs.com/package/helmet)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [cors](https://www.npmjs.com/package/cors)

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
* [eslint](https://www.npmjs.com/package/eslint)
* [jest](https://www.npmjs.com/package/jest)
* [supertest](https://www.npmjs.com/package/supertest)

# 💪 Motivation 

This project is an unopinionated simple way to get started with APIs, and queue management in NodeJS. When looking for project templates in react, or NextJS, there are plenty. When it comes to NodeJS, starter kits tend to be (1) opinionated, overly complex(https://github.com/ljlm0402/typescript-express-starter), lacking instructions, or too extent to focus on what's important. [1](https://github.com/ljlm0402/typescript-express-starter), [2](https://github.com/helmuthdu/typescript-express-api-starter) are some examples.

This was originally intended to deal with jobs that were larger than 50MB (AWS Lambda doens't like those, and Vercel only likes what AWS Lambda can swallow). After some cumbersome refactoring, and finding out that 

# ⚠️ Disclaimer 

This is not an educational package, nor is it ready for production. This is just a starter kit that can be useful to start scafolding your side-hustle, without having to prune the whole structure right from the start, or without having to build it all from zero.

# Other resources
- https://github.com/b00giZm/docker-compose-nodejs-examples
