const allowlist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:5000',
];

module.exports = {
  corsOptionsDelegate: (req, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  },
};
