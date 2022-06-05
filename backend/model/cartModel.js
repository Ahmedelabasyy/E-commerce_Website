const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  items: { type: Array },
});

module.exports = mongoose.model("Cart", cartSchema);
