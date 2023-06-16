const express = require("express");

const router = express.Router();
const Dog = require("./models");

router.get("/ping", (req, res) => {
  res.json("Dogshouseservice.Version1.0.1");
});




router.get("/dogs", async (req, res) => {
  try {
    const dogs = await Dog.findAll();
    const weight = req.query.attribute;
    const desc = req.query.order;
    const order = [[weight, desc]];
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;

    const offset = (pageNumber - 1) * pageSize;

    if (pageNumber && pageSize && weight && desc) {
      const dogss = await Dog.findAll({
        offset,
        limit: Number(pageSize),
        order,
      });

      return res.json(dogss);
    }

    if (weight && desc) {
      const dogss = await Dog.findAll({
        order,
      });

      return res.json(dogss);
    }

    if (pageNumber && pageSize) {
      const dogss = await Dog.findAll({
        offset,
        limit: Number(pageSize),
      });

      return res.json(dogss);
    }
    

    return res.json(dogs.slice(0, 2));
  } catch (error) {
    res.json(error);
  }
});

router.post("/dog", async (req, res) => {
  try {
    const { name, color, tail_length, weight } = req.body;

    const dogcheck = await Dog.findOne({
      where: {
        name: name,
      },
    });

    if (dogcheck) {
      return res.json("Dog is already exist with that name");
    }

    const newdog = Dog.build({
      name: name,
      color: color,
      tail_length: tail_length,
      weight: weight,
    });

    await newdog.save();
    res.status(201).json(newdog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessages = error.errors.map(err => err.message);
      res.status(400).json({ error: errorMessages });
    } else {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
