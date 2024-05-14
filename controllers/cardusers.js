/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/carduser');
const BadRequest = require('../middlewares/errors/BadRequest');
  
  // eslint-disable-next-line no-undef
  module.exports.getCards = (req, res, next) => {
    Card.find({})
      .then((cards) => res.send({ data: cards }))
      .catch(next);
  };

  module.exports.getCard = (req, res, next) => {
    Card.findById(req.params.id)
      .then((card) => {
        console.log(req.params.id)
        console.log(card)
        if (!card) {
          next(new NotFoundError('Нет пользователя с таким id'));
        }
        return res.send({ data: card });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequest('Переданы некорректные данные при получении пользователя.'));
        }
        next(err);
      });
  };
  
  // eslint-disable-next-line no-undef
  module.exports.createCard = (req, res, next) => {
    const { balance, balancem } = req.body;
  
    if (!balance || !balancem) {
      next(new BadRequest(`Поле "имя" ${balance} или "ссылка" ${balancem} не указаны`));
    }
  
    Card.create({ balance, balancem, owner: req.user._id })
      .then((card) => {
        if (card) {
          res.status(200).send({ data: card });
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(201).send(err);
          next(new BadRequest('Переданы некорректные данные при создании карточки.'));
        }
        next(err);
      });
  };
  

  
