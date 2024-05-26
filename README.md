# Angular SVG Drawing Project

This project is an Angular application for drawing and interacting with an SVG rectangle. The user can resize and drag the rectangle, and the perimeter of the rectangle is displayed near it. The initial dimensions of the rectangle are loaded from a JSON file, and changes are saved back to the server via a C# API.

## Features

- Draw an SVG rectangle with initial dimensions from a JSON file.
- Display the perimeter of the rectangle near the figure.
- Allow the user to resize and drag the rectangle using the mouse.
- Update the JSON file with new dimensions after resizing.
- Import and export the SVG as JSON.

## Technologies Used

- Angular
- SVG.js
- Interact.js
- C# (for backend API)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/angular-svg-drawing.git
    cd angular-svg-drawing
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the Angular development server:**

    ```bash
    ng serve
    ```

    The application will be available at `http://localhost:4200`.

4. **Run the backend server (C# API):**

    Follow the instructions in the backend project to set up and run the C# API server.

## Usage

1. **Initial Setup:**

    - The initial dimensions of the SVG rectangle are fetched from a JSON file on the server.

2. **Interacting with the Rectangle:**

    - Drag the rectangle to move it.
    - Resize the rectangle by dragging its edges or corners.
    - The perimeter of the rectangle is displayed near the figure and updates as you resize.

3. **Import and Export:**

    - Export the current SVG as JSON by clicking the "Export SVG as JSON" button.
    - Import an SVG JSON file by selecting a file using the file input.

## Project Structure

- `src/app/svg-drawing/svg-drawing.component.ts`: Main component handling the SVG drawing logic.
- `src/app/svg-drawing/svg-drawing.component.html`: Template for the SVG drawing component.
- `src/app/svg-drawing/svg-drawing.component.css`: Styles for the SVG drawing component.
- `src/app/svg-service.service.ts`: Service for handling SVG export and import.
- `src/app/api.service.ts`: Service for communicating with the backend API.

## Backend API

The backend API is a C# application that provides endpoints for fetching and updating the SVG dimensions. Ensure the backend server is running and properly configured to interact with the Angular frontend.

## License

This project is licensed under the MIT License.
