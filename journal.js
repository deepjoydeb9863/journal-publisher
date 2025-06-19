const router = require('express').Router();
const Journal = require('../server/Journal');
const auth = require('../middleware/authMiddleware');

// Submit journal
router.post('/submit', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const journal = new Journal({
      title,
      content,
      authorId: req.userId
    });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all journals
router.get('/all', async (req, res) => {
  try {
    const journals = await Journal.find().populate('authorId', 'email');
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
