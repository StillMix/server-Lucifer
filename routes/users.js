const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../middlewares/errors/BadRequest');

const {
  getUser, getUsers, backUser, getInfoUser, likeCard, patchInfoUser, dislikeCard
} = require('../controllers/users');

// eslint-disable-next-line no-undef
router.get('/me', getInfoUser);

router.put('/cards/:id/like',  likeCard);

router.delete('/cards/:id/dislike',  dislikeCard);

// eslint-disable-next-line no-undef
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUser);
// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.post('/backuser', backUser);
// eslint-disable-next-line no-undef
router.patch('/me', celebrate({
  body: Joi.object().keys({
    balance: Joi.string().required(),
  }),
}), patchInfoUser);


module.exports = router;