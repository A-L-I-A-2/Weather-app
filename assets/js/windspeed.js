// Simulate wind direction updates (replace this with real data)
const simulatedWindDirection = 312; // Example value in degrees

// Call the updateWindDirection function with the simulated wind direction.
updateWindDirection(simulatedWindDirection);

// Create a function to update wind direction based on degrees.
function updateWindDirection(windDir) {
    let direction;

    switch (true) {
        case windDir >= 355 && windDir <= 15:
            direction = 'North';
            break;
        case windDir >= 16 && windDir <= 80:
            direction = 'North-East';
            break;
        case windDir >= 81 && windDir <= 105:
            direction = 'East';
            break;
        case windDir >= 106 && windDir <= 175:
            direction = 'South-East';
            break;
        case windDir >= 176 && windDir <= 190:
            direction = 'South';
            break;
        case windDir >= 191 && windDir <= 240:
            direction = 'South-west';
            break;
        case windDir >= 241 && windDir <= 280:
            direction = 'West';
            break;
        case windDir >= 281 && windDir <= 354:
            direction = 'North-West';
            break;
        default:
            direction = 'Default North';
            break;
    }
    console.log('simulatedWindDirection:', windDir); //The value can change between 0 - 360, shows wind direktion
    console.log('Wind Direction:', direction);
}
