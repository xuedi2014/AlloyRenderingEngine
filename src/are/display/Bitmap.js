/**
 * 位图，继承自DisplayObject
 * @class Bitmap
 * @constructor
 * @param {image} image
 */
define("ARE.Bitmap:ARE.DisplayObject", {
    ctor: function (img) {
        this._super();
        this.img = img;
        this.rect = [0, 0, img.width, img.height];
        this.width = img.width;
        this.height = img.height;
    },
    /**
     * 设置滤镜
     * @method setFilter
     * @param {num} r - 红.
     * @param {num} g - 绿.
     * @param {num} b - 蓝.
     * @param {num} a - 透明度.
     */
    setFilter: function (r, g, b, a) {
        this.cache();
        var imageData = this.cacheCtx.getImageData(0, 0, this.cacheCanvas.width, this.cacheCanvas.height);

        var pix = imageData.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            if (pix[i + 3] > 0) {
                pix[i] *=r;
                pix[i + 1] *=g;
                pix[i + 2] *= b;
                pix[i + 3] *= a;
            }
        }
        this.cacheCtx.putImageData(imageData, 0, 0);
    }


})