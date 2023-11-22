const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 300000,
		httpOnly: true,
		secure: false,
		sameSite: "strict",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: "auto" },
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.get("/", (req, res) => {
	res.render("main.handlebars", "restaurant.handlebars", {
		googleApiKey: process.env.GOOGLE_API_KEY,
	});
});

app.post("/register", (req, res) => {
	res.redirect("/restaurant", {
		googleApiKey: process.env.GOOGLE_API_KEY,
	});
});

app.get("/restaurant", (req, res) => {
	// Fetch data
	const restaurants = [
		{ name: "Restaurant 1", address: "Address 1" },
		{ name: "Restaurant 2", address: "Address 2" },
		{ name: "Restaurant 3", address: "Address 3" },
	];

	// Render the restaurant.handlebars template data
	res.render("restaurant.handlebars", { restaurants });
});

app.get("/teapot", (req, res) => {
	res.status(418).send("I'm a teapot");
});

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});