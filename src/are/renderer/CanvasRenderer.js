define("ARE.CanvasRenderer", {
    ctor: function (stage) {
        this.stage = stage;
        this.ctx = stage.ctx;
        this.height = stage.width;
        this.width = stage.height;
    },
    update: function () {
        
        this.ctx.clearRect(0, 0, this.height, this.width);
        this.render(this.ctx, this.stage);
    },
    render: function (ctx, o, mtx) {
        if (!o.isVisible()) { return; }

        if (mtx) {
            o._matrix.reinitialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty, mtx.alpha, mtx.shadow, mtx.compositeOperation);
        } else {
            o._matrix.reinitialize(1, 0, 0, 1, 0, 0);
        }
        mtx = o._matrix;
        mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);

        var a = ctx.globalAlpha, cp = ctx.globalCompositeOperation;
      
        ctx.globalAlpha *= o.alpha;
        ctx.globalCompositeOperation = o.compositeOperation;
        var mmyCanvas = o.cacheCanvas || o.txtCanvas;
         if (mmyCanvas) {
                ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
                ctx.drawImage(mmyCanvas, 0, 0);
         } else if (o instanceof Bitmap) {
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
            ctx.drawImage(o.img, 0, 0);
        } else if (o instanceof Container || o instanceof Stage) {
            var list = o.children.slice(0);
            for (var i = 0, l = list.length; i < l; i++) {
                ctx.save();
                this.render(ctx, list[i], mtx);
                ctx.restore();
            }
        } else if (o instanceof Sprite) {

            var rect = o._rect;
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
            ctx.drawImage(o.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
        } else if (o instanceof Shape) {
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
            for (var i = 0, len = o.cmds.length; i < len; i++) {
                var cmd = o.cmds[i]
                if (o.assMethod.join("-").match(new RegExp("\\b" + cmd[0] + "\\b", "g"))) {

                    ctx[cmd[0]] = cmd[1][0];
                } else {
                    ctx[cmd[0]].apply(ctx, Array.prototype.slice.call(cmd[1]));
                }
            }
        }

        // reset everything:
        ctx.globalAlpha = a;
        ctx.globalCompositeOperation = cp;
    },
    hitRender: function (ctx, o, mtx, x, y, type) {
        ctx.clearRect(0, 0, 2, 2);
        if (mtx) {
            o._matrix.reinitialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty, mtx.alpha, mtx.shadow, mtx.compositeOperation);
        } else {
            o._matrix.reinitialize(1, 0, 0, 1, 0, 0);
        }
        mtx = o._matrix;
        mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
        var list = o.children.slice(0), l = list.length;
        for (var i = l - 1; i >= 0; i--) {
            var child = list[i];
            mtx.reinitialize(1, 0, 0, 1, 0, 0);
            mtx.appendTransform(o.x - x, o.y - y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);

            ctx.save();
            var child = list[i];

            this._hitRender(ctx, list[i], mtx, type);

            ctx.restore();

            if (ctx.getImageData(0, 0, 1, 1).data[3] > 1) {
                child.execEvent(type);
                return child;
            }
        }
    },
    _hitRender: function (ctx,o,mtx,type) {
        if (!o.isVisible()) { return; }

        if (mtx) {
            o._matrix.reinitialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty, mtx.alpha, mtx.shadow, mtx.compositeOperation);
        } else {
            o._matrix.reinitialize(1, 0, 0, 1, 0, 0);
        }
        mtx = o._matrix;
        mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);

        var a = ctx.globalAlpha;
        ctx.globalAlpha *= o.alpha;

        // render the element:
        if (o instanceof Bitmap || o.cacheCanvas) {
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
            ctx.drawImage(o.cacheCanvas || o.img, 0, 0);
        } else if (o instanceof Container) {
            var list = o.children.slice(0),l=list.length;
            for (var i = l - 1; i >= 0; i--) {
                var child = list[i];
               
           
                ctx.save();
                var child = list[i];
                
                this._hitRender(ctx, list[i], mtx);
                
                ctx.restore();
                
                if (ctx.getImageData(0, 0, 1, 1).data[3] > 1) {
                    child.execEvent(type);
                    //return child;
                }
            }
        } else if (o instanceof Sprite) {

            var rect = o._rect;
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
            ctx.drawImage(o.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
        }

        // reset everything:
        ctx.globalAlpha = a;

    },
    updateCache: function (ctx, o,w,h) {
        ctx.clearRect(0, 0, w + 1, h + 1);
        this.renderCache(ctx,o);
    },
    renderCache: function (ctx, o) {     
        if (!o.isVisible()) { return; }
        // render the element:
        if (o instanceof Bitmap) {
            
            ctx.drawImage(o.img, 0, 0);
        } else if (o instanceof Container || o instanceof Stage) {
            var list = o.children.slice(0);
            for (var i = 0, l = list.length; i < l; i++) {
                ctx.save();
                this.renderCache(ctx, list[i]);
                ctx.restore();
            }
        } else if (o instanceof Sprite) {
            var rect = o._rect;
            ctx.drawImage(o.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
        } else if (o instanceof Shape) {
            for (var i = 0, len = o.cmds.length; i < len; i++) {
                var cmd = o.cmds[i]
                if (o.assMethod.join("-").match(new RegExp("\\b" + cmd[0] + "\\b", "g"))) {
                    ctx[cmd[0]] = cmd[1][0];
                } else {
                    ctx[cmd[0]].apply(ctx, Array.prototype.slice.call(cmd[1]));
                }
            }
        }


    }


})