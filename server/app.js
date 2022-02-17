const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

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

app.post("/new-book", async (req, res) => {
    const { title, genre, author, publisher, year, imageUrl } = req.body;
    console.log(req.body);
    try {
        const book = await models.Book.create({
            title,
            genre,
            author,
            publisher,
            year,
            image_url: imageUrl,
        });
        res.json({ newBook: book });
    } catch (err) {
        console.log(err.original);
        res.status(400).json({ error: "There was an error saving the book." });
    }
});

app.put("/update-book", async (req, res) => {
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
                },
            }
        );

        res.json({ bookUpdated: true });
    } catch {
        res.status(400).json({ error: "Error updating book" });
    }
});

app.delete("/delete-book", async (req, res) => {
    const { id } = req.body;
    try {
        await models.Book.destroy({
            where: {
                id,
            },
        });
        res.json({ bookDeleted: true });
    } catch {
        res.status(400).json({ error: "Error deleting book" });
    }
});

app.listen(PORT, () => console.log(`Book Barn running on port ${PORT}`));
