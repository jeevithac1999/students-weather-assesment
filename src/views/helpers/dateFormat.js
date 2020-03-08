const dateFormatter = date => new Date(date * 1000).toDateString();
module.exports = dateFormatter;