const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.static(path.resolve(__dirname, './web/build')));
app.use(require('prerender-node'));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './web/build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));