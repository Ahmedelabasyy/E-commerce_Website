const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
} = require("../controllers/cartContoller");
const { verifyAuth } = require("../middleware/authMiddleware");

router.get("/:id", getCartItems);
router.put("/:id/add", addItemToCart);
router.put("/:id/remove", removeItemFromCart);

module.exports = router;
