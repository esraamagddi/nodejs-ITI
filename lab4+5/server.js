const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
app.use(express.json());
const requireAuth=require('./middlewares/AuthMiddleware');
todoRoutes.use(requireAuth);

// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoute);
// const routes = require('./routes');
// app.use(routes);

// app.use('/', router);
// const routes = require('./routes');
// app.use(routes);

// dotenv.config();
// require("app");
dotenv.config({ path: 'config.env' });
const DB_CONNECT = process.env.DB_CONNECT;
mongoose
  .connect(DB_CONNECT)
  .then((conn) => {
    // console.log(conn.connections);
    console.log("DB Connected successfully");
  });

app.use('/users',userRoutes);
app.use('/todos',todoRoutes);

  const PORT = process.env.PORT || 3000;



app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => {
  `
    Server is running on port ${PORT}`;
});
