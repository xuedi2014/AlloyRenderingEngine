kmdjs.config({
    name: "AlloyRenderingEngine",
    baseUrl: "../src",
    classes: [
          { name: "ARE.DisplayObject", url: "are/display" },
          { name: "ARE.Bitmap", url: "are/display" },
          { name: "ARE.Sprite", url: "are/display" },
          { name: "ARE.Stage", url: "are/display" },
          { name: "ARE.Shape", url: "are/display" },
          { name: "ARE.Container", url: "are/display" },
          { name: "ARE.Matrix2D", url: "are/util" },
          { name: "ARE.Loader", url: "are/util" },
          { name: "ARE.UID", url: "are/util" },
          { name: "ARE.CanvasRenderer", url: "are/renderer" },
          { name: "ARE.WebGLRenderer", url: "are/renderer" },
          { name: "ARE.GLMatrix", url: "are/util" },
          { name: "ARE.RAF", url: "are/util" }
    ]
});

define("Main", ["ARE"], {
    ctor: function () {
        var ld = new Loader(), pgBmp;
        var stage = new Stage("#ourCanvas", localStorage.webgl == "1");
        ld.loadRes([
            { id: "atlogo", src: "../asset/img/atlogo.png" }
        ]);
        ld.complete(function () {
            var bmp = new Bitmap(ld.get("atlogo"));
            bmp.x = 110;
            bmp.y = 100;
            bmp.setFilter(0.25, 0.75, 1,1);
            bmp.on("click", function () {
                alert("这可是高效并且精确到像素级别的事件触发");
            })
            stage.add(bmp);
        });
    }
})
