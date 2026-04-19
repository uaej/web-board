// Presentation Layer (Router + Controller 역할)
const express = require('express');
const router = express.Router();
const postBiz = require('../biz/post.biz');

// GET /api/posts - 게시글 목록 조회
router.get('/', async (req, res) => {
  try {
    const list = await postBiz.getPostList();
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/posts - 새 게시글 작성
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const result = await postBiz.writePost(title, content, author);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
