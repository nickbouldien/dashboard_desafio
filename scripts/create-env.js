const fs = require('fs');
fs.writeFileSync('./.env', `REACT_APP_WEATHER_KEY=${process.env.REACT_APP_WEATHER_KEY}\n`);