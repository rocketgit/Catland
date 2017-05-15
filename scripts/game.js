var canvas    = document.querySelector ("canvas"),
    context   = canvas.getContext ("2d");

var map   = {
                load: {
                        on: false,
                        can: false
                      },
                context: "",
                background: "",
                number: undefined,
                getContext: function () {
                    if (this.number !== "" && this.context == "" && !this.load.on && this.load.can) {
                        $.ajax ({
                            url: String ("http://catlandmapserver.esy.es/?section=map&do=get&act=" + this.number),
                            onsucces: function () {
                                console.log (data);
                            }
                        });
                    };
                },
                ctxToArr: function () {
                    if (this.context !== undefined && typeof this.context == "String") {
                        var background  = this.context.split ("~") [0];
                        var map         = this.context.split ("~") [1];

                        this.context = [];
                        this.background =  background;

                        for (var i=0; i<map.split ("&").length; i++) {
                            this.context [i] = map.split ("&") [i];
                        };
                    };
                }
            };

var stage = {
                name: undefined
            };

function update () {
  context.clearRect (0, 0, canvas.width, canvas.height);

  if (preloader) {
    var loader = new Image ();
        loader.src = "sprites/loader.png";
    context.drawImage (loader, 0, 0, canvas.width, canvas.height);
  }

  if (!preloader) {
    if (game.tutorial) {
        // if tutorial is ready
        stage.name = "main";
    } else {
        stage.name = "tutorial";
        map.load.can = true;
        map.number = 1;
    };
  };


  requestAnimationFrame (update);
}

requestAnimationFrame (update);
