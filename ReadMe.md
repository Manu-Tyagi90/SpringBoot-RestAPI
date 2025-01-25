# SpringBoot Rest API CRUD Operations
### Demo Videos

[Desktop Demo](https://github.com/user-attachments/assets/1db31b02-cb70-4540-af9b-c84a906e974e)

-------------------------------------------------------------------------------------------------
[Mobile Demo](https://github.com/user-attachments/assets/fb7526a0-914d-4b1a-8238-225dc32391d3)
## Overview
This project demonstrates CRUD (Create, Read, Update, Delete) operations using Spring Boot and a RESTful API.

## Project Structure 
```plaintext
SpringBoot-RestAPI/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/springbootrestapi/  # Base package
│   │   │       ├── controller/      # REST API endpoints (e.g., UserController.java)
│   │   │       ├── service/         # Business logic (e.g., UserService.java)
│   │   │       ├── repository/      # Database layer (e.g., UserRepository.java)
│   │   │       ├── model/           # Entities (e.g., User.java)
│   │   │       ├── config/          # Configuration classes (e.g., SwaggerConfig.java)
│   │   │       ├── exception/       # Custom exceptions (e.g., ResourceNotFoundException.java)
│   │   │       └── SpringBootRestApiApplication.java  # Main class
│   │   └── resources/
│   │       ├── static/              # Static assets (CSS, JS, images)
│   │       ├── templates/           # HTML templates (if using Thymeleaf)
│   │       ├── application.properties  # Configuration (DB, server port, etc.)
│   │       └── data.sql             # Initial data (optional)
│   └── test/                        # Unit/integration tests
├── .gitignore
├── pom.xml                          # Maven dependencies
├── README.md                        # Project documentation
└── target/                          # Compiled code (generated after build)
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Manu-Tyagi90/SpringBoot-RestAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SpringBoot-RestAPI
   ```
3. Build the project:
   ```bash
   mvn clean install
   ```

## Usage
1. Run the application:
   ```bash
   mvn spring-boot:run
   ```
2. Access the API at `http://localhost:8080/api`.

## Endpoints
- `GET /api/items` - Retrieve all items
- `GET /api/items/{id}` - Retrieve an item by ID
- `POST /api/items` - Create a new item
- `PUT /api/items/{id}` - Update an item by ID
- `DELETE /api/items/{id}` - Delete an item by ID

## Application Features

### Dashboard (#dashboard)
- Real-time statistics overview
- Total vendor count display
- Last updated timestamp
- Dynamic stats visualization
- System status indicators

### Vendors Management (#vendors)
- CRUD operations for vendors
- Real-time search functionality
- Paginated vendor list
- Add/Edit vendor form
- Delete confirmation
- Responsive grid layout
- Infinite scroll loading

### Settings (#settings)
- Theme switching (Light/Dark)
- Items per page configuration
- UI preferences management
- System configurations

## Project Structure

### Backend Components
1. **RestApiCrudOperations1ApplicationTests.java**
   - Integration tests for application context
   - Test environment configuration

2. **CloudVendor.java**
   - Entity model for vendor data
   - JPA entity mappings
   - Basic vendor attributes

3. **Exception Handling**
   - **CloudVendorNotFoundException.java**: Custom exception for missing vendors
   - **CloudVendorExceptionHandler.java**: Global exception handling
   - **CloudVendorException.java**: Base exception class

4. **API Layer**
   - **CloudAPIVendor.java**: REST endpoints controller
   - CRUD operations implementation
   - Request/Response handling

5. **Service Layer**
   - **ServiceImplement.java**: Business logic implementation
   - **CloudService.java**: Service interface
   - Data processing and validation

6. **Repository Layer**
   - **CloudRepo.java**: JPA repository interface
   - Database operations
   - Custom queries

### Frontend Components
1. **index.html**
   - Responsive SPA layout
   - Component templates
   - Navigation structure

2. **script.js**
   - AJAX calls to backend
   - DOM manipulation
   - Event handlers
   - Dynamic content loading

3. **style.css**
   - Responsive design styles
   - Theme management
   - Component animations
   - Layout configurations

## API Endpoints
- GET /cloudvendor - List all vendors
- GET /cloudvendor/{id} - Get vendor by ID
- POST /cloudvendor - Create new vendor
- PUT /cloudvendor - Update vendor
- DELETE /cloudvendor/{id} - Delete vendor

## Media Gallery

### Desktop Views
![Dashboard Desktop View](./src/main/resources/static/Assets/Cloud%2520Management%2520Dashboard%2520Desktop.png)
![Vendors Desktop View](./src/main/resources/static/Assets/Cloud%20Management%20Vendors%20Desktop.png)
![Settings Desktop View](./src/main/resources/static/Assets/Cloud%20Management%20Settings%20Desktop.png)

### Mobile Views
![Dashboard Mobile View](./src/main/resources/static/Assets/Cloud%20Management%20Dashboard%20Mobile%20View.png)
![Vendors Mobile View](./src/main/resources/static/Assets/Cloud%20Management%20Vendors%20Mobile%20View.png)
![Settings Mobile View](./src/main/resources/static/Assets/Cloud%20Management%20Settings%20Mobile%20View.png)


## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
