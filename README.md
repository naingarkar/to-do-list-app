# To-Do List Application

A simple to-do list application built with a Laravel backend and a React frontend, using MySQL for data storage.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)

---

## Project Overview

This to-do list application allows users to create, read, update, and delete tasks with priority levels. It includes:
- Backend API built with Laravel
- Frontend UI built with React
- Task priority managed using Enums in Laravel
- Basic validation with error handling

## Technologies Used

- **Backend**: Laravel 11
- **Frontend**: React 18
- **Database**: MySQL
- **Validation**: Laravel's Validator with custom error handling
- **Testing**: PHPUnit

## Requirements

- PHP >= 8.0
- Node.js >= 14.x
- MySQL >= 5.7
- Composer >= 2.0
- Git
- NPM or Yarn (for the React frontend)

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/naingarkar/to-do-list-app.git
cd to-do-list-app
```

### 2. Install dependencies

Install dependencies for laravel and react.
```bash
composer install
npm install
```

## Database Setup

### 1. Create database

Create database in your local machine with the name "to_do_list".
Then update database configuration with your credentials in the ``` .env``` file.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=to_do_list
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### 2. Run seeders

Type the following in the terminal to generate some random data.

```bash
php artisan db:seed
```

## Running the Application

Finally, start application by following commands and access the application at ```http://127.0.0.1:8000```

```bash
php artisan serve
npm run dev
```
## Testing

### 1. Create database

Create database in your local machine with the name "to_do_list_test".
Then update database configuration with your credentials in the ``` .env.testing``` file.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=to_do_list
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### 2. Run test

Type the following in the terminal to test API.

```bash
php artisan test
```
