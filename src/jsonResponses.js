// Sends back a response given  the following:
// request, response - passed through from the server's request handling
// status - the numerical status code to return
// content - a JSON object representing any return content.
const sendResponse = (request, response, status, content) => {

  const formattedString = JSON.stringify(content);

  // Send back the response
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if(content != {}) response.write(responseText);
  response.end();
};

module.exports = {
    sendResponse,
}