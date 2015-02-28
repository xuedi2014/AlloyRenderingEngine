# AlloyRenderingEngine
合金渲染引擎，使用webgl超速渲染2d， 使用canvas 2d向下兼容

# Quick start
* [website](http://alloyteam.github.io/AlloyRenderingEngine/) 
* [api](http://alloyteam.github.io/AlloyRenderingEngine/doc/)

# Demos
* [bitmap](http://alloyteam.github.io/AlloyRenderingEngine/showcase/bitmap.html) 
* [cache](http://alloyteam.github.io/AlloyRenderingEngine/showcase/cache.html) 
* [filter](http://alloyteam.github.io/AlloyRenderingEngine/showcase/filter.html) 
* [particle](http://alloyteam.github.io/AlloyRenderingEngine/showcase/particle.html) 
* [particlesystem](http://alloyteam.github.io/AlloyRenderingEngine/showcase/particlesystem.html) 
* [shape](http://alloyteam.github.io/AlloyRenderingEngine/showcase/shape.html) 
* [sprite](http://alloyteam.github.io/AlloyRenderingEngine/showcase/sprite.html) 
* [transform](http://alloyteam.github.io/AlloyRenderingEngine/showcase/transform.html) 
* [txt](http://alloyteam.github.io/AlloyRenderingEngine/showcase/txt.html) 

# Usage
To achieve this effect:

![usage](https://raw.githubusercontent.com/AlloyTeam/AlloyRenderingEngine/master/asset/img/usage.gif)

You need to use the following code:

```javascript
var ld = new Loader(), stage = new Stage("#ourCanvas"),bmp;
ld.loadRes([
    { id: "atLogo", src: "../asset/img/atLogo.png" }
]);
ld.complete(function () {
    bmp = new Bitmap(ld.get("atLogo"));
    //（0.5,0.5）==〉The center is the point of rotation
    bmp.originX = 0.5;
    bmp.originY = 0.5;
    bmp.x = 240;
    bmp.y = 240;
    //bind click event
    bmp.on("click", function () {
        alert("The event monitor can be accurate to pixel");
    })
    //add object to stage
    stage.add(bmp);
           
    var step = 0.01;
    //loop
    stage.onTick(function () {
        bmp.rotation += 0.5;
        if (bmp.scaleX > 1.5||bmp.scaleX < 0.5) {
            step *= -1;
        }
        bmp.scaleX += step;
        bmp.scaleY += step;
    })
});
```

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
