const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
  if (!req.body.phone) {
    res.status(422).send({ error: 'Invalid Input' });
  } else {
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    admin.auth().getUser(phone).then(() => {
      const code = Math.floor(Math.random() * 8999 * 1000);
      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: '+15103301652',
      }, (err) => {
        if (err) {
          res.status(422).send({ error: err });
        } else {
          admin.database().ref(`users/${phone}`).update({ code, codeValid: true }, () => {
            res.send({ message: 'Successfuly made a record and sent code' });
          });
        }
      });
    }).catch((err) => {
      res.status(422).send({ error: 'User not found' });
    });
  }
};
