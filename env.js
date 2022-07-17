const dotenv = require('dotenv');

//NODE Environment
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
    silent: false,
  });
} else {
  dotenv.config({
    path: '.env.production',
    silent: false,
  });
}
