const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60,
    }),
  })
);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/product", require("./routes/productReviewRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/customer", require("./routes/contactUsRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server start on port ${port}`));
