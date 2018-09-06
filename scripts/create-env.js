const fs = require('fs');

try {
  fs.writeFileSync('./.env', `REACT_APP_WEATHER_KEY=${process.env.REACT_APP_WEATHER_KEY}\n`);
} catch (err) {
  console.error('Error creating ./env file: ', err);
  process.exit(1);
}
