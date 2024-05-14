const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../middlewares/errors/BadRequest');

const {
  getCards, createCard, getCard
} = require('../controllers/cardusers');

// eslint-disable-next-line no-undef


router.get('/', getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getCard);

router.post('/', celebrate({
    body: Joi.object().keys({
      balance: Joi.string().required().min(2).max(30),
      balancem: Joi.string().required()
    }),
  }), createCard);

module.exports = router;