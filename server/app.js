require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const models = require("./models");

const PORT = process.env.PORT || 8080;
const SALT = bcrypt.genSaltSync(10);
const SECRET = process.env.SECRET;

app.use(cors());
app.use(express.json());

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    notAuthorized: "Please login to use this feature.",
                });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        return res
            .status(403)
            .json({ notAuthorized: "Please login to use this feature." });
    }
};

app.get("/", async (req, res) => {
    const books = await models.Book.findAll({
        order: [["createdAt", "DESC"]],
    });
    res.json({ books });
});

app.get("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await models.Book.findByPk(id);
        res.json({ book });
    } catch {
        res.status(404).json({ error: "Book not found" });
    }
});

app.get("/profile", validateToken, async (req, res) => {
    const books = await models.Book.findAll({
        where: {
            user_id: req.userId,
        },
        order: [["createdAt", "DESC"]],
    });
    res.json({ books });
});

app.get("/genre/:genre", async (req, res) => {
    const { genre } = req.params;
    const books = await models.Book.findAll({
        where: {
            genre,
        },
        order: [["createdAt", "DESC"]],
    });
    res.json({ books });
});

app.post("/new-book", validateToken, async (req, res) => {
    const { title, genre, author, publisher, year, imageUrl } = req.body;
    try {
        const book = await models.Book.create({
            title,
            genre,
            author,
            publisher,
            year,
            image_url: imageUrl,
            user_id: req.userId,
        });
        res.json({ newBook: book });
    } catch (err) {
        console.log(err.original);
        res.status(400).json({ error: "There was an error saving the book." });
    }
});

app.put("/update-book", validateToken, async (req, res) => {
    const { id, title, author, genre, publisher, year, imageUrl } = req.body;

    try {
        await models.Book.update(
            {
                title,
                genre,
                author,
                publisher,
                year,
                image_url: imageUrl,
            },
            {
                where: {
                    id,
                    user_id: req.userId,
                },
            }
        );

        res.json({ bookUpdated: true });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Error updating book" });
    }
});

app.delete("/delete-book", validateToken, async (req, res) => {
    const { id } = req.body;
    try {
        await models.Book.destroy({
            where: {
                id,
                user_id: req.userId,
            },
        });
        res.json({ bookDeleted: true });
    } catch {
        res.status(400).json({ error: "Error deleting book" });
    }
});

app.post("/email", validateToken, async (req, res) => {
    const { email } = req.body;
    try {
        await models.User.update(
            { email },
            {
                where: {
                    id: req.userId,
                },
            }
        );

        res.json({ userUpdated: true });
    } catch {
        res.status(400).json({ error: "Error updating email" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await models.User.findOne({
        where: {
            username,
        },
    });

    try {
        const pwHash = user.password;
        const result = await bcrypt.compare(password, pwHash);
        if (!result) {
            throw new Error("Passwords don't match.");
        }

        const token = jwt.sign({ userId: user.id }, SECRET);
        const userObj = { username, token, id: user.id, email: user.email };
        res.json(userObj);
    } catch (err) {
        console.log(err);
        res.status(400).json({ loginError: "Error logging in." });
    }
});

app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hash = await bcrypt.hash(password, SALT);
        const user = await models.User.create({
            username,
            email,
            password: hash,
        });

        const token = jwt.sign({ userId: user.id }, SECRET);
        const userObj = { username, token, id: user.id, email };
        res.json(userObj);
    } catch {
        res.status(400).json({ userExists: "This username has been taken" });
    }
});

app.listen(PORT, () => console.log(`Book Barn running on port ${PORT}`));
