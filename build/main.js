kmdjs.config({
    name: "BuildARE",
    baseUrl: "../src",
    classes: [
          { name: "ARE.DisplayObject", url: "are/display" },
          { name: "ARE.Bitmap", url: "are/display" },
          { name: "ARE.Sprite", url: "are/display" },
          { name: "ARE.Stage", url: "are/display" },
          { name: "ARE.Shape", url: "are/display" },
          { name: "ARE.Container", url: "are/display" },
          { name: "ARE.Txt", url: "are/display" },
          { name: "ARE.Matrix2D", url: "are/util" },
          { name: "ARE.Loader", url: "are/util" },
          { name: "ARE.UID", url: "are/util" },
          { name: "ARE.CanvasRenderer", url: "are/renderer" },
          { name: "ARE.WebGLRenderer", url: "are/renderer" },
          { name: "ARE.GLMatrix", url: "are/util" },
          { name: "ARE.RAF", url: "are/util" },
          { name: "ARE.FPS", url: "are/util" },
          { name: "ARE.Particle", url: "are/display" },
          { name: "ARE.Util", url: "are/util" },
          { name: "ARE.Vector2", url: "are/util" },
          { name: "ARE.ParticleSystem", url: "are/display" }
    ]
});

define("Main", ["ARE"], {
    ctor: function () {
        this instanceof DisplayObject;
        this instanceof Bitmap;
        this instanceof Sprite;
        this instanceof Stage;
        this instanceof Shape;
        this instanceof Container;
        this instanceof Txt;
        this instanceof Matrix2D;
        this instanceof Loader;
        this instanceof UID;
        this instanceof CanvasRenderer;
        this instanceof WebGLRenderer;
        this instanceof GLMatrix;
        this instanceof RAF;
        this instanceof FPS;
        this instanceof Particle;
        this instanceof Util;
        this instanceof Vector2;
        this instanceof ParticleSystem;
    }
})
