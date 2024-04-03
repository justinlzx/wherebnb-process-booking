# wherebnb-process-booking
wherebnb-process-booking is an complex microservice that registers a guest booking 

## Getting Started
1. Clone the repository

2. (a) Build and run the Docker container: 
    ```sh
    docker build -t wherebnb-process-booking .
    docker run -p 3004:3004 wherebnb-process-booking
    ```
2. (b) Run app in development server
    - Connect to cloud database
   
    ```sh
    npm run dev:remote 
    ```
    
    - connect to the local database
    ```sh
    npm run dev 
    ```