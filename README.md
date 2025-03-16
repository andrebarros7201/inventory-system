# Inventory System

## Overview

The Inventory System is a full-stack web application built with Next.js, TypeScript, TailwindCSS, Redux Toolkit, and PostgreSQL. It provides an efficient way to manage inventory and its items.

## Features

 - User Authentication: Secure login and authentication system.

 - Inventory Management: Add, update, and delete products.

 - Organization: Organize items by store.

 - Responsive Design: Fully optimized for all devices.

 - Containerized Deployment: Uses Docker for seamless deployment.

## Technologies Used

 - Frontend: Next.js, TypeScript, Tailwind CSS, Redux Toolkit

 - Backend: Next.js API routes

 - Database: PostgreSQL, Prisma ORM

 - State Management: Redux Toolkit

 - Deployment: Docker

## Installation

### Prerequisites

Ensure you have the following installed:

 - NodeJS
 - Docker

### Steps

Clone the repository:

    git clone https://github.com/your-username/inventory-system.git
    cd inventory-system

Install dependencies:

    npm install

Set up environment variables in .env:

    DATABASE_URL=postgres://user:password@localhost:5432/inventory_db

Run the application in Docker:

    docker-compose up --build

Access the app at http://localhost:3000.