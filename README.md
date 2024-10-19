# Golden Raspberry Awards API

This project is a RESTful API built with Node.js and Express.js. It processes movie data and calculates award intervals for producers, such as the maximum and minimum intervals between consecutive awards. The application uses SQLite for data storage, which is embedded as part of the Node.js project.

## Requirements

- Node.js (version 20)
- Docker (if you choose to run the application using Docker)

## Setup Instructions

### Running the Application with npm

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/golden-raspberry-awards.git
    cd golden-raspberry-awards
    ```

2. Install the dependencies:

    Inside the project directory, run the following command:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```bash
    PORT=3000
    CSV_FILE_PATH=./data/movielist.csv
    ADDRESS="localhost" 
    DATABASE_URL=:memory:
    ```

4. Run the application:

    To start the server, run:

    ```bash
    npm start
    ```

5. Access the API:

    Once the server is running, the API will be available at:

    ```arduino
    http://localhost:3000
    ```

6. API Documentation:

    API documentation is available at:

    ```bash
    http://localhost:3000/docs
    ```

### Running the Application with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/golden-raspberry-awards.git
    cd golden-raspberry-awards
    ```

2. Build the Docker container:

    Inside the project directory, run the following command to build the container:

    ```bash
    docker-compose build
    ```

3. Start the application:

    After the build is complete, start the application with:

    ```bash
    docker-compose up
    ```

4. Access the API:

    Once the container is up, the API will be available at:

    ```arduino
    http://localhost:3000
    ```

5. API Documentation:

    API documentation is available at:

    ```bash
    http://localhost:3000/api-docs
    ```

## Running Tests

Unit tests:

```bash
npm test
```

## Available Endpoints

- **GET** `/api/producers/awards`: Calculates and returns producers with the minimum and maximum award intervals.

Example response:

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 10,
      "previousWin": 1995,
      "followingWin": 2005
    }
  ]
}
```


## Project Structure

```bash
/src
  /config           # Database and environment configuration
  /controllers      # API controllers
  /middleware       # Global middleware for error handling, etc.
  /models           # Database models (SQLite)
  /routes           # API routes
  /services         # Business logic and calculations
/data               # CSV file containing movie data
Dockerfile          # Docker configuration
docker-compose.yml  # Docker Compose configuration
.env                # Environment variables
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
