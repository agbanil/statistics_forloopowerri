'use strict';

/**
 * JSON formatter.
 * @public
 * @function formatJSON
 * @param    {Object} req  the request object
 * @param    {Object} res  the response object
 * @param    {Object} body response body
 * @returns  {String}
 */
function formatJSend(req, res, body) {
    var packet = {};

    if (body instanceof Error) {

        packet = {};

    } else {
        // handle success responses
        packet = body;
    }

    var data = JSON.stringify(packet);
    res.header('Content-Length', Buffer.byteLength(data));

    return data;
}

module.exports = formatJSend;
