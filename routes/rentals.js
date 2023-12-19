import { Rental, validateRental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";
import { auth } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

//GET request
router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

//GET request
router.get("/:id", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

//POST request
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      // If genre is not found, return a user-friendly error message
      return res.status(404).send("Customer not found.");
    }
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      // If genre is not found, return a user-friendly error message
      return res.status(404).send("Movie not found.");
    }

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    await rental.save();

    movie.numberInStock--;
    movie.dailyRentalRate++;
    movie.save();

    res.send(rental);
  } catch (err) {
    // Handle other errors
    console.log(err);
    res.status(500).send("Internal server error.");
  }
});

//Delete request
router.delete("/:id", auth, async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

export { router as rentals };
