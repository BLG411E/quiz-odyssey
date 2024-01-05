# Quiz Odyssey

Quiz Odyssey is a full stack web application, which has a mobile application, a backend with a REST API and WebSockets, and a web management interface.

Technical details about the project can be found in the `reports` directory.

The required steps to run the whole project in your local environment will be explained below. This guide assumes you have the latest version of the repository cloned locally, and your working directory is the repository.

## Backend

### Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

### Preparation

Create a file named `.env` in the `backend` directory.

Inside of it, write `QUIZODYSSEY_SECRET_KEY = "<SECRET>"` where SECRET is a random string you are going to generate.

### Running

Execute `docker compose up --build` from the `backend` directory. This will run the backend on [http://localhost:8000](http://localhost:8000). Later on, you can configure a NGINX reverse proxy to funnel all requests through HTTPS, but that is outside of the scope of this guide. In the deployed version of Quiz Odyssey, that is done.

## Web Interface

### Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

You will also need Node.js if you want to run a development server.

### Preparation

In `web/config.js`, change the API_URL to the address of the backend you are running.

### Running 

#### Development Server

In the `web` directory, run `npm install`.

After that is done, in the same directory, run `npm run dev`. This will run the web management interface on [http://localhost:3000](http://localhost:3000).


#### Production Server

Execute `docker compose up` from the `web` directory. This will run the backend on [http://localhost:8001](http://localhost:8001). Later on, you can configure a NGINX reverse proxy to funnel all requests through HTTPS, but that is outside of the scope of this guide. In the deployed version of Quiz Odyssey, that is done.

## Mobile Application

### Prerequisites

You will need Node.js if you want to run a development server, which will be explained in this guide. Creating a production build will not be explained in this guide due to vast differences from platform to platform, but, you can check [React Native Documentation](https://reactnative.dev/docs/running-on-device) if you want to build the app. In the final version of Quiz Odyssey, that is done.

You will also need the [Expo Go](https://expo.dev/client) application installed on your mobile device.

### Development Server

In the `frontend` directory, run `npm install`.

After that is done, in the same directory, run `npx expo start`. This will run the mobile application development server, and will display an URL in the terminal to connect to through your mobile device.
