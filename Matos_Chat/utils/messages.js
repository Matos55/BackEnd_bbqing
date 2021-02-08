const moment = require('moment');

function formatMessage(username, text) {

    // username: username =========> new ecma ======> username ((Faster codding))
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;