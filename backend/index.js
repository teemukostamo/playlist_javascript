const config = require('./config/config');
const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`db url is ${config.DB_URI_GOOGLE}`);
  console.log(`db url is ${process.env.DB_URI_GOOGLE}`);
  console.log(`Server running on port ${config.PORT}`);
});
