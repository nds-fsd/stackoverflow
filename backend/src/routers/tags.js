const express = require('express');
const { getTags, getTagById, createTag, deleteTag, getPopularTags } = require('../controllers/tags');

const router = express.Router();

router.get('/tags', getTags);
router.get('/tags/popular-tags', getPopularTags);
router.get('/tags/:id', getTagById);
router.post('/tags', createTag);
router.delete('/tags/:id', deleteTag);

module.exports = router;
