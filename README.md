<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Role-Based Access Control System

Welcome to the Role-Based Access Control System! This project is built using Laravel for the backend and React for the frontend.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will guide you through setting up and running the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- PHP (version >= 7.3)
- Composer (Dependency Manager for PHP)
- Node.js (version >= 12.x)
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:

    ```bash
    cd rbac-system

3. Install backend dependencies:

    ```bash
    composer install

4. Set up Laravel environment:

    ```bash
    Copy the .env.example file to .env:

    cp .env.example .env

5. Generate the application key:

    ```bash
    php artisan key:generate

    Configure your database in the .env file.

6. Migrate the database:

    ```bash
    php artisan migrate

7. Run Seeders for seeding Role & Permissions:

    ```bash
    php artisan db:seed

8. Install frontend dependencies:

    ```bash
    npm install

## Usage
To run the project, follow these steps:

1. Start the Laravel backend server:

    ```bash
    php artisan serve

2. Start the React frontend development server:

    ```bash
    npm start

3. Access the application in your browser:

    ```bash
    http://127.0.0.1:8000


# RBAC System Overview

## 1. Roles
Roles define the level of access a user has within the system. The default roles are:

- **Admin**: Has full control over user management, including creating, updating, deleting users, and assigning roles.
- **Manager**: Can manage users but does not have access to certain admin features (e.g., deleting users).
- **User**: Can only access their own information.

## 2. Permissions
Permissions are granular actions that can be assigned to roles. The default permissions are:

| Permission       | Description                                   |
|------------------|-----------------------------------------------|
| `create-users`   | Ability to create new users.                  |
| `edit-users`     | Ability to edit existing users.               |
| `delete-users`   | Ability to delete users.                      |
| `view-users`     | Ability to view user information.             |

### **Role-Permission Management**
- **Admin Role**: Assigned all permissions (`create-users`, `edit-users`, `delete-users`, `view-users`).
- **Manager Role**: Assigned `edit-users` and `view-users` permissions.
- **User Role**: Assigned only the `view-users` permission.

The relationship between roles and permissions is managed through the `roles`, `permissions`, and `role_permission` tables. The `role_permission` table associates specific permissions with roles, allowing for flexible permission management.

## 3. Important Architectural Decisions

- **Laravel Sanctum for Authentication**: Laravel Sanctum is used for API token-based authentication, which provides simplicity and security.
- **Separation of Concerns**: The project is split into a clear separation between frontend (React) and backend (Laravel) codebases to promote maintainability.
- **Middleware for Permission Checking**: The `CheckPermission` middleware was implemented to enforce permission checks at the route level, ensuring that only authorized users can access specific routes.

# Frontend Overview

## 1. Admin Dashboard
- **View Users**: Admins can view all users and their roles.
- **Manage Users**: Admins can create and update users.
- **Assign Roles**: Admins can assign roles by adding and editing users. Also, permissions to users from the Role Permissions page.

## 2. User Dashboard
- **Profile View**: Regular users can view their own profile information.
- **Role-Based UI**: The UI dynamically adapts based on the user's role, showing or hiding features accordingly.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
