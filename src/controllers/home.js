module.exports = {
  index: (req, res, next) => {
    res.status(200).send({
      title: 'Node Express Starter Project',
      version: '0.0.1',
    });
  },
};
