// Node imports
const http = require('http');
const url = require('url');

// Local imports
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/* Get Requests:
/ - index
/style.css - CSS stylesheet
/default: 404
*/
const handleGet = (request, response) => {
    const parsedUrl = url.parse(request.url);
    
    switch(parsedUrl){
        case '/':
            break;
        case '/style.css':
            break;
        default:
            jsonHandler.sendResponse(request, response, 400, {message: "The page you are looking for was not found."});
            break;
    }
};

// Head requests:
const handleHead = (request, response) => {
    const parsedUrl = url.parse(request.url);
    
    switch(parsedUrl){
        case '/getUsers':
            jsonHandler.sendResponse(request, response, 200, {});
            break;
        case '/notReal':
            jsonHandler.sendResponse(request, response, 404, {});
            break;
    }
};


const handlePost = (request, response) => {
        {
        // added user successfully
        jsonHandler.sendResponse(request, response, 201,)
    }
};

const onRequest = (request, response) => {

  switch (request.method) {
      case 'GET':
          handleGet(request, response);
          break;
      case 'HEAD':
          handleHead(request, response);
          break;
      case 'POST':
          handlePost(request, response);
          break;
      default:
          break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);