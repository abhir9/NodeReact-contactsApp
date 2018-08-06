//default sms chat list
var chats = [
  {"id": 0, "firstName": "Eugene", "lastName": "Lee", "mobilePhone": "617-000-0003", "sms": "Hi your otp no is 876395"}
];

exports.findAll = function (req, res, next) {
  res.send(chats);
};
exports.findByMobilePhone = function (req, res, next) {
  res.send(chats[req.params.mobilePhone]);
};
exports.sendChat = function (req, res, next) {
  req.body.id = chats.length;
  chats.push(req.body);
};