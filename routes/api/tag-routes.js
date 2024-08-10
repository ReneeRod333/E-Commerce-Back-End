const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: Product });
    if (!tags) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [affectedRows, updatedTag] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const affectedRows = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
