personService = (function () {
  var baseURL = "";
  return {
    findById: function (id) {
      return $.ajax(baseURL + "/persons/" + id);
    },
    findByName: function (searchKey) {
      return $.ajax({url: baseURL + "/persons", data: {name: searchKey}});
    }
  };

}());

chatService = (function () {
  var baseURL = "";
  return {
    findAll: function () {
      return $.ajax({url: baseURL + "/chats"});
    },
    sendChat: function (data) {
      console.log(data);
      return $.post(baseURL + "/chats", data);
    }
  };

}());