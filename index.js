const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");

const authRoutes = require('./routes/auth/');
const inventoryRoutes = require('./routes/inventory/');
const orderRoutes = require('./routes/order/');

app.use(morgan('tiny'));
app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, { cors: {origin: "*"} });
// const socketRoutes = require('./routes/socketRoutes/')(io);

app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
app.use(bodyParser.json({limit:'100mb', extended:true}));
app.use(express.json());
db.sequelize.sync();

app.get("/", (req, res) => { res.json('Welcome To DocApp Server') });
app.use("/inventory", inventoryRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);
//app.get("/", socketRoutes);

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => { console.log(`App listenings on port ${PORT}`) });