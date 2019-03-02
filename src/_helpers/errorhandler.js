function errorHandler(req, res) {
  // default to 500 server error
  return res.status(404).json({ error: 'Route not found' });
}

module.exports = errorHandler;
