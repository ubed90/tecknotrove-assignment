# Technotrove Assignment App -  MEAN Stack

## Getting Started
To get started with this application, you need to clone this repository to your local machine.


```bash
  git clone https://github.com/ubed90/tecknotrove-assignment.git
```

## Prerequisites
- Make sure NodeJS, NPM (Node Package Manager) / YARN and MySQL are installed on your machine.
## Installing
1. Open your terminal and navigate to the root folder of the cloned repository
2. Run the following command to install the required dependencies for FrontEnd:
```bash
  cd client/
  npm install
```
3. Run the following command to install the required dependencies for Backend:
```bash
  cd server/
  npm install
```

## Running the Application

### Backend
- Open your terminal and navigate to the root folder of the cloned repository
- Open the Environment file located in server/config/dev.env and change the username, password and database name as per your configurations.
- This project uses typescript for strict type checking and error handling. To convert all typescript code to javascript, make sure to run the following    command
    ```bash
        cd server/
        npm run watch
    ```

- Then Open a new terminal and run the following command
    ```bash
        cd server/
        npm run dev
    ```

### FrontEnd
- Open your terminal and navigate to the root folder of the cloned repository
- Enter the following command to start the Angular Dev server.
    ```bash
        cd client/
        npm start
    ```

- Open your browser and navigate to http://localhost:4200