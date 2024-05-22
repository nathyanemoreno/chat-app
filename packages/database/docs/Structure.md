# Project Structure

This project is divided into two main parts: `packages/database` and `apps/api`. Each part has a clear separation of concerns to ensure maintainability, readability, and scalability.

## packages/database

This package contains the core business logic and data access layers, focusing on database interactions and the underlying business rules.

### Folders and Files

- **`config`**: Environment configuration for the database package.
- **`prisma`**: Prisma ORM related files including schema definition and seed data.
- **`repositories`**: Handle direct interactions with the database (e.g., `chatRepository.ts`, `userRepository.ts`).
- **`services`**: Contain business logic, orchestrating calls to repositories (e.g., `chatService.ts`, `userService.ts`).
- **`utils`**: Utility functions used across services (e.g., `emailUtil.ts`, `hashUtil.ts`).
- **`__tests__`**: Unit tests for services.

## apps/api

This application handles routing, request validation, and application-specific logic, leveraging the services from the `database` package.

### Folders and Files

- **`config`**: Environment configuration for the API application.
- **`routes`**: Define the API endpoints (e.g., `chatRoutes.ts`, `userRoutes.ts`).
- **`controllers`**: Handle incoming HTTP requests and call the necessary use cases (e.g., `chatController.ts`, `userController.ts`).
- **`middlewares`**: Middleware functions for authentication, error handling, etc.
- **`use-cases`**: Application-specific logic, possibly calling services from the `database` package (e.g., `chatUseCase.ts`, `userUseCase.ts`).
- **`__tests__`**: Contains integration and unit tests.
  - **Integration tests**: Test the full flow, ensuring the API routes and business logic work together.
  - **Unit tests**: Test specific parts of the API application logic in isolation.

## Summary

- **`packages/database`**: Core business logic and database interactions.
  - **`repositories`**: Direct database interactions.
  - **`services`**: Business logic and orchestration.
  - **`utils`**: Utility functions.
  - **`__tests__`**: Unit tests for services.

- **`apps/api`**: API application logic.
  - **`routes`**: API endpoint definitions.
  - **`controllers`**: Request handling and response logic.
  - **`middlewares`**: Middleware functions.
  - **`use-cases`**: Application-specific use cases.
  - **`__tests__`**: Integration and unit tests.

This structure ensures a clean separation of concerns, making your codebase modular and easier to maintain. It allows for clear distinctions between core business logic, application-specific logic, and test code.
