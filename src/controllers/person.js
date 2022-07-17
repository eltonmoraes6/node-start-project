module.exports = {
  index: (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
  },

  show: (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
  },

  store: (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
  },

  update: (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
  },

  destroy: (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
  },
};
