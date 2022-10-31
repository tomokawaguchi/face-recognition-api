const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '32cd0d355c214f21ae48a38b98faf427'
  });

  const handleAPICall = (req, res) => {
      app.models
          .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
          .then(data => {
            res.json(data);
          })
          .catch(err => err.status(400).json('Unable to work with API'))
  }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}