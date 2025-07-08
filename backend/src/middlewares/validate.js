const { ZodError } = require('zod');

const validate = schema => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

module.exports = validate; 