const jwt = require('jsonwebtoken');

module.exports = (payload, remember) => {

  return new Promise((resolve, reject) => {
    let signOptions = {
      expiresIn: '1h'
    };

    if (remember) {
      signOptions = {}
    }

    jwt.sign(payload, process.env.SECRET, signOptions,
      (err, token) => {
        if (err) reject(err);

        resolve({
          token
        })
      }
    );
  })
}