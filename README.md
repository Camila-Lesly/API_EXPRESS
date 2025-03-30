# API Express Project

[![Node Version](https://img.shields.io/badge/node-%3E=12-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-v4.x-brightgreen.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/react-v17.x-blue.svg)](https://reactjs.org/)
[![Swagger](https://img.shields.io/badge/swagger-v3.x-orange.svg)](https://swagger.io/)
[![License](https://img.shields.io/badge/license-Unlicensed-red.svg)](https://opensource.org/licenses)

A full-stack application for product management and user authentication built as a class project. The backend API is developed with Express and documented with Swagger, while the frontend is built with React.

## Demo

Check out the live demo of the application at: [https://sigepro.makerlab.tech/](https://sigepro.makerlab.tech/)

API documentation is available at: [https://sigepro.makerlab.tech/api-docs/](https://sigepro.makerlab.tech/api-docs/)

---

## Table of Contents
- [Overview](#overview)
- [Backend](#backend)
- [Frontend](#frontend)
- [Installation](#installation)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Additional Notes](#additional-notes)

---

## Overview

This class project is a scalable, full-stack application that features:
- A RESTful API for product management built with Express.
- Interactive API documentation via Swagger.
- A React frontend for user authentication and managing products.

---

## Backend

### API & Swagger Documentation
- **Base URL**: The Express server provides all API endpoints.
- **Swagger Docs**: Access the interactive API documentation at:  
  [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

### Setup & Execution
1. **Install Dependencies**:
    ```bash
    npm install
    ```
2. **Start the Server**:
    ```bash
    npm run start
    ```

---

## Frontend

### Login View
- **Fields**:  
  - Username (text input)  
  - Password (password input)
- **Functionality**:  
  - Validates user credentials.
  - Redirects to the Product List View on successful login.
  - Displays error messages when credentials are incorrect.

### Product List View
- **Features**:
  - Displays a list of products.
  - Provides options to create, edit, and delete products.
  - Uses modals or dedicated forms for editing/deletion.
  - Includes confirmation dialogs to avoid accidental deletions.

---

## Installation

1. **Clone the Repository**:
    ```bash
    git clone <https://github.com/Camila-Lesly/API_EXPRESS>
    cd <apiExpress>
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Start MongoDB**:
    - Use the provided Docker Compose configuration to spin up a MongoDB instance:
      ```bash
      docker-compose up -d
      ```
4. **Start the Application**:
    ```bash
    npm run start
    ```

---

## Deployment

The application depends on a MongoDB instance. Use the following `docker-compose.yml` to run MongoDB locally:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - ./data:/data/db
```

 The connection details are stored in a JSON configuration [file](./config/mongodb/mongodb-config.json). An example configuration is:

```json
{
  "mongodb": {
    "server": "localhost:27017",
    "database": "ApiExpress",
    "user": null,
    "password": null
  }
}
