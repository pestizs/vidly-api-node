import { Movie, validateMovie } from "../models/movie.js";
import { Genre } from "../models/genre.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import express from "express";
const router = express.Router();

//GET request
router.get("/", auth, async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});
//GET request
router.get("/:id", auth, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

//POST request
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      // If genre is not found, return a user-friendly error message
      return res.status(404).send("Genre not found.");
    }

    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    await movie.save();

    res.send(movie);
  } catch (err) {
    // Handle other errors
    console.log(err);
    res.status(500).send("Internal server error.");
  }
});
//PUT request
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      // If genre is not found, return a user-friendly error message
      return res.status(404).send("Genre not found.");
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      {
        new: true,
      }
    );

    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
  } catch (err) {
    // Handle other errors
    console.log(err);
    res.status(500).send("Internal server error.");
  }
});
//Delete request
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

export { router as movies };
