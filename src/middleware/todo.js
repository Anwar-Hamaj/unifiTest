const Joi = require("@hapi/joi");
exports.validate = (req, res, next) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
