function errorHandler(req, res) {
  // default to 500 server error
  // res.sendFile('./assets/not_found.html');
  res.sendFile(`${process.cwd()}/assets/index.html`);
  /*
  return res.status(404).json({
    error: 'Route not found',
    req_method: req.method,
    req_url: req.url,
  }); */
}

module.exports = errorHandler;
