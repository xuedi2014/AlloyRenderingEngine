# AlloyRenderingEngine
合金渲染引擎，使用webgl超速渲染2d， 使用canvas 2d向下兼容

# Quick start
* [website](http://alloyteam.github.io/AlloyRenderingEngine/) 
* [api](http://alloyteam.github.io/AlloyRenderingEngine/doc/)

# Usage

```javascript
var ld = new Loader(), stage = new Stage("#ourCanvas");
ld.loadRes([
    { id: "atLogo", src: "../asset/img/atLogo.png" }
]);
ld.complete(function () {
    var bmp = new Bitmap(ld.get("atLogo"));
    bmp.on("click", function () {
        alert("The event monitor can be accurate to pixel");
    })
    stage.add(bmp);
});
```
This content is released under the (http://opensource.org/licenses/MIT) MIT License.
