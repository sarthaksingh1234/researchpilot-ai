const rateLimit = require("express-rate-limit");

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many AI requests. Please try again after a minute.",
  },
});

module.exports = {
  aiLimiter,
};