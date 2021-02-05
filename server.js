const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.static(path.resolve(__dirname, './web/build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './web/build', 'index.html');
  response.sendFile(filePath);
});

app.get('/', function(request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, './web/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'Home Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
      result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
      response.send(result);
    });
  });

app.get('/about', function(request, response) {
    console.log('About page visited!');
    const filePath = path.resolve(__dirname, './web/build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, 'About Page');
      data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
      result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
      response.send(result);
    });
  });

app.listen(port, () => console.log(`Listening on port ${port}`));