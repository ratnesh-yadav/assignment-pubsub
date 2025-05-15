# assignment-pubsub

# PubSub Microservice System

A Pub/Sub-based microservice architecture using **NestJS**, **Redis**, **MongoDB**, **Docker**. This system consists of:

- **Receiver Service**: Accepts user data via HTTP POST, stores it in MongoDB, and publishes it to Redis.
- **Listener Service**: Subscribes to Redis channel, processes the message, and stores it in MongoDB.

---

## 🧩 Features

- Microservice architecture
- Redis Pub/Sub messaging
- MongoDB for persistent storage
- Scalable with Docker
- Well-structured with NestJS
- Built-in validation and UUID tagging


## 🐳 Run with Docker Compose

docker compose up 

Receiver will be available at: http://localhost:3001/receiver

Listener runs in background on localhost:3002.

## Receiver service
http://localhost:3001/receiver

# Method POST
URL: http://localhost:3001/receiver

# Request Body

{
  "user": "Harry",
  "class": "Comics",
  "age": 22,
  "email": "harry@potter.com"
}

# Success Response

{
    "message": "Data received and published",
    "data": {
        "id": "19db53b9-66a1-4f0c-a33e-ae3d6fec0c9b",
        "user": "Harry",
        "class": "Comics",
        "age": 22,
        "email": "harry@potter.com",
        "inserted_at": "2025-05-15T20:51:13.641Z"
    }
}

# Error Response

{
    "message": "Validation failed: Invalid or missing fields",
    "error": "Bad Request",
    "statusCode": 400
}

##GET APi to verify the data is received and saved at listener's end

## Listener service
http://localhost:3002/listener

# Method GET

URL: http://localhost:3002/listener/all

# Response

[
    {
        "_id": "682653c1eec94e6dd9641f2f",
        "id": "19db53b9-66a1-4f0c-a33e-ae3d6fec0c9b",
        "user": "Harry",
        "class": "Comics",
        "age": 22,
        "email": "harry@potter.com",
        "inserted_at": "2025-05-15T20:51:13.641Z",
        "modified_at": "2025-05-15T20:51:13.669Z",
        "__v": 0
    },
]