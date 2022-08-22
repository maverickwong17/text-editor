const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
