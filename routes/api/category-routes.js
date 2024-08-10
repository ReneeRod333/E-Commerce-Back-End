
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    if (!categories) {
      res.status(404).json({ message: 'No categories found!' });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [affectedRows, updatedCategory] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const affectedRows = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
