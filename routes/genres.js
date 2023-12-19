import express from "express";
import { Genre, validateGenre } from "../models/genre.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
const router = express.Router();

//GET request
router.get("/", auth, async (req, res) => {
  //throw new Error("XXXXXXXXXX ERROR #########");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
//GET request
router.get("/:id", auth, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

//POST request
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});
//PUT request
router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});
//Delete request
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

export { router as genres };
