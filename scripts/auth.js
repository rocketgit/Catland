var game = {},
    vk,
    preloader = true;

function storage_set (keys, values) {
  for (var i=0; i<keys.length; i++) {
    VK.api ("storage.set", {"key":keys[i], "value":values[i]}, null);
  };
};

VK.init (function () {
  VK.api ("users.get", {"fields":"city,sex,photo_50"}, function (data) {
    vk = data.response [0];
      VK.api ("users.isAppUser", null, function (data) {
        if (Number (data.response)) {
          VK.api ("storage.get", {"key":"into"}, function (data) {
            if (data.response == "complete") {
              VK.api ("storage.get", {"keys":"fishes,coins,name,lvl,exp,gamescount,skins,winrate,event,into,tutorial"}, function (data) {
                    for (var i=0; i<data.response.length; i++) {
                      var name  = data.response [i] ["key"],
                          value = data.response [i] ["value"];
                      if (Number (value) || value == "0") {
                        game [name] = Number(value);
                      } else if (!Number (value) && String (value)) {
                        game [name] = value;
                      } else if (value == "") {
                        game [name] = undefined;
                      };
                    };
                    setTimeout (function () {preloader=false;}, 1000);
              });
            } else {
              storage_set (["into", "fishes", "coins", "name", "lvl", "exp", "gamescount", "skins", "winrate", "event", "tutorial"], ["complete", 6000, 10, "Player", 1, 50, 0, "", 0, undefined, 0]);
              VK.api ("storage.get", {"keys":"fishes,coins,name,lvl,exp,gamescount,skins,winrate,event,into,tutorial"}, function (data) {
                  for (var i=0; i<data.response.length; i++) {
                    var name  = data.response [i] ["key"],
                        value = data.response [i] ["value"];
                    if (Number (value) || value == "0") {
                      game [name] = Number(value);
                    } else if (!Number (value) && String (value)) {
                      game [name] = value;
                    } else if (value == "") {
                      game [name] = undefined;
                    };
                  };
                  setTimeout (function () {preloader=false;}, 1000);
              });
            };
          });
        };
      });
  });
}, null, "5.62");
