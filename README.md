# WeatherForecast

## Description
This is an excercise to develop a web app for weather forecast.

The backend is written in .NET 6 as a gateway for the OpenWeatherMap API 5 day / 3 hour Forecast.

Other APIs can be added as long as they implement the interface in place.

The frontend is written in React using Remix Framework. Styling is done with Tailwind CSS.

There are some very basic unit tests written for the backend using XUnit and Moq.

The ability to mark specific locations as "Favorite" is done on the client with the browsers localStorage.

There is a Dockerfile configured for the backend that should allow to deploy to any Cloud Platform that supports Docker containers. (Might need some extra configuration for the environment variables)

## Configuration

Make sure to set a user-secret with key: "OpenWeatherMap:ApiKey"

```
dotnet user-secrets set "OpenWeatherMap:ApiKey" "Your key"
```


You will have to create a .env file inside the Client folder

Add the ENV variable BACKEND_URL and point it to your .NET API server
This project is configured to run on port 7175

```
BACKEND_BASEURL="https://localhost:7175"
```

Note:
Make sure to configure Node to accept your self-signed certificate or you can bypass it temporarly by setting this ENV variable
```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Running

To run the backend service on the root of the project:
```
dotnet run
```

To run the frontend on the Client folder:
```
npm run dev
yarn dev
```