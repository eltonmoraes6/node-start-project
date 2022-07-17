const http = require('http');
const app = require('../src/app');

const port = normalizaPort(process.env.PORT || '5000');

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(new Date().toUTCString());
  console.log('Environment: ', process.env.NODE_ENV);
  let FuncPort = server.address().port;
  let host = server.address().address;
  console.log('Example app listening at http://%s:%s', host, FuncPort);
});
