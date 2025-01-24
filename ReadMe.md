# SpringBoot Rest API CRUD Operations

## Overview
This project demonstrates CRUD (Create, Read, Update, Delete) operations using Spring Boot and a RESTful API.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Rest-API-CRUD-Operations1.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Rest-API-CRUD-Operations1
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
![Dashboard Desktop View](./src/main/resources/static/Assets/images/Cloud%20Management%20Dashboard%20Desktop.png)
![Vendors Desktop View](./src/main/resources/static/Assets/images/Cloud%20Management%20Vendors%20Desktop.png)
![Settings Desktop View](./src/main/resources/static/Assets/images/Cloud%20Management%20Settings%20Desktop.png)

### Mobile Views
![Dashboard Mobile View](./src/main/resources/static/Assets/images/Cloud%20Management%20Dashboard%20Mobile%20View.png)
![Vendors Mobile View](./src/main/resources/static/Assets/images/Cloud%20Management%20Vendors%20Mobile%20View.png)
![Settings Mobile View](./src/main/resources/static/Assets/images/Cloud%20Management%20Settings%20Mobile%20View.png)

### Demo Videos
- [Desktop Demo](./src/main/resources/static/Assets/videos/Cloud%20Management%20Desktop.webm)
- [Mobile Demo](./src/main/resources/static/Assets/videos/Cloud%20Management%20Mobile.webm)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.