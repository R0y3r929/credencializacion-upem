const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'http://upemtexcoco.ddns.net:3000', changeOrigin: true }));
};
