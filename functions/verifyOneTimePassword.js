const admin = require('firebase-admin');

module.exports = (req, res) => {
  if (!req.body.phone || !req.body.code) {
    res.status(422).send({ error: 'Phone and or Code must be provided' });
  } else {
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone).then(() => {
      const ref = admin.database().ref(`users/${phone}`);
      ref.on('value', (snapshot) => {
        ref.off();
        const user = snapshot.val();
        if (user.code !== code || !user.codeValid) {
          res.status(422).send({ error: 'Code not valid' });
        } else {
          ref.update({ codeValid: false });
          admin.auth().createCustomToken(phone).then((token) => {
            res.send({ token });
          }).catch((err) => {
            res.status(422).send({ error: err });
          });
        }
      });
    }).catch((err) => {
      res.status(422).send({ error: err });
    });
  }
};
