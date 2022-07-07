# WeatherForecast

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