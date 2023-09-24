const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom route handler to get replies for a specific comment
server.get('/comments/:id/replies', (req, res) => {
  const commentId = parseInt(req.params.id);
  const comments = router.db.get('comments').value();
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  return res.json(comment.replies);
});

server.use(router);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
