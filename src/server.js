// Node imports
const http = require('http');
const url = require('url');
const query = require('querystring');

// Local imports
const chatManager = require('./chatManager.js');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/* Get Requests:
/ - index
/style.css - CSS stylesheet
/default: 404
*/
const handleGet = (request, response, parsedUrl) => {
    switch(parsedUrl.pathname){
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/getRooms':
            jsonHandler.sendResponse(request, response, 200, chatManager.getRoomData());
            break;
        case '/chatroom':
            htmlHandler.getChatroom(request, response);
            break;
        case '/favicon.ico':
            break;
        default:
            jsonHandler.sendResponse(request, response, 400, {message: "The page you are looking for was not found."});
            break;
    }
};

// Head requests:
const handleHead = (request, response, parsedUrl) => {
    
    switch(parsedUrl){
        case '/getRooms':
            jsonHandler.sendResponse(request, response, 200, {});
            break;
        case '/favicon.ico':
            break;
        default:
            jsonHandler.sendResponse(request, response, 404, {});
            break;
    }
};


const handlePost = (request, response, parsedUrl) => {
    const body = [];
    
    request.on('error', (err) => {
        response.statusCode = 400;
        response.end();
    });
    
    request.on('data', (data) => {
        body.push(data);
    });
    
    request.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyStr);
    
        console.dir(bodyStr);
        switch(parsedUrl.pathname){
            case '/makeRoom':
                // User has attempted to create a new room.
                // The server expects a room name, which will be a string.
                if(!bodyParams.roomName){   
                jsonHandler.sendResponse(request, response, 400, 'Must enter a room name.');
                } else {
                    let id = chatManager.makeNewRoom(bodyParams.roomName);
                    jsonHandler.sendResponse(request, response, 201, {roomID: id});
                }
                break;
            case '/sendMessage':
                // User has sent a message to a chatroom.
                // The server expects a valid room ID, and a message.
                if(!bodyParams.roomID || !bodyParams.message){
                jsonHandler.sendResponse(request, response, 400, 'Request must contain both a valid Room ID and a message.');
                } else {
                    let statusCode = chatManager.saveMessage(bodyParams.roomID, bodyParams.message);
                    if(status === 201){
                        jsonHandler.sendResponse(request, response, status, {});
                    }
                }
                break;
            default:
                jsonHandler.sendResponse(request, response, 404, 'Resource was not found.');
                break;
        }
    });
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl.pathname);

  switch (request.method) {
      case 'GET':
          handleGet(request, response, parsedUrl);
          break;
      case 'HEAD':
          handleHead(request, response, parsedUrl);
          break;
      case 'POST':
          handlePost(request, response, parsedUrl);
          break;
      default:
          break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);