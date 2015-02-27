/**
 * 位图，继承自Container
 * @class Stage
 * @constructor
 * @param {canvas} canvas
 * @param {bool} closeWebGL
 */
define("ARE.Stage:ARE.Container", {
    statics: {
        checkMove: false
    },
    ctor: function (canvas,closegl) {
        this._super();
        this.canvas = typeof canvas == "string" ? document.querySelector(canvas) : canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
       

        var canvasSupport = !!window.CanvasRenderingContext2D,
            webglSupport = (function () { try { var canvas = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))); } catch (e) { return false; } })();
       
        if (webglSupport && !closegl) {
            this.renderer = new WebGLRenderer(this);
        } else {
            this.ctx = this.canvas.getContext("2d");
            this.renderer = new CanvasRenderer(this);
        }

        Stage.renderer = this.renderer;
        this.hitRenderer = new CanvasRenderer(this);
        this.hitCanvas = document.createElement("canvas");
        this.hitCanvas.width =1;
        this.hitCanvas.height = 1;
        this.hitCtx = this.hitCanvas.getContext("2d");
        Function.prototype.bind = function () {
            var __method = this;
            var args = Array.prototype.slice.call(arguments);
            var object = args.shift();
            return function () {
                return __method.apply(object,
                     args.concat(Array.prototype.slice.call(arguments)));
            }
        }
     
        this.canvas.addEventListener("click", this._handleClick.bind(this), false);
        this.canvas.addEventListener("mousemove", this._handleMouseMove.bind(this), false);
        //this.canvas.addEventListener("mousedown", this._handleMouseDown.bind(this), false);
        //this.canvas.addEventListener("mouseup", this._handleMouseUp.bind(this), false);
        this.offset = this._getXY(this.canvas);

        this.overObj = null;
        this.pause = false;


        this.interval = Math.floor(1000 / 60);

        var self = this;
        self.loop=RAF.requestInterval(function () {
            self._tick(self);
        }, self.interval);
    },
    /**
     * 更新舞台
     * @method update
     */
    update: function () {
        if (!this.pause) {
            this.renderer.update();
        }
        //this.ctx.clearRect(0, 0, this.width, this.height);
        //this.draw(this.ctx);
    },
    _handleClick: function (evt) {
       // var child = this._getHitChild(this.hitCtx, evt.pageX - this.offset[0], evt.pageY - this.offset[1], "click");

      
        var child = this.hitRenderer.hitRender(this.hitCtx, this, null, evt.pageX - this.offset[0], evt.pageY - this.offset[1], "click");
        // if (child) child.execEvent("click");
    },
    _handleMouseMove: function (evt) {
        evt.stageX= evt.pageX - this.offset[0];
        evt.stageY= evt.pageY - this.offset[1];
        var callbacks = this.events["mousemove"];
        if (callbacks) {
            for (var i = 0, len = callbacks.length; i < len; i++) {
                var callback = callbacks[i];
                callback(evt);
            }
        }
    },
    //_handleMouseMove: function (evt) {
    //    var x = evt.pageX - this.offset[0], y = evt.pageY - this.offset[1];
    //    if (this.canScale && this.isMouseDown) {
    //        var dx =x- this.prePosition[0] ;
    //        var dy =y- this.prePosition[1] ;
    //        var preX = this.scaleCanvasOffset.x;
    //        var preY = this.scaleCanvasOffset.y;
    //        this.scaleCanvasOffset.x += dx;
    //        this.scaleCanvasOffset.y += dy;
    //        this.redraw(this.scaleCanvasOffset.x, this.scaleCanvasOffset.y, this.scale, preX, preY);
    //        this.prePosition[0] = x;
    //        this.prePosition[1] = y;
    //    }
    //    if (!Stage.checkMove) return;
    //    var child = this._getHitChild(this.hitCtx, x,y);
    //    if (child) {
    //        if (this.overObj) {
    //            if (child.id != this.overObj.id) {
    //                this.overObj.execEvent("mouseout");
    //                child.execEvent("mouseover");
    //                this.overObj = child;
    //            } else {
    //                child.execEvent("mousemove");
    //            }
    //        } else {
    //            this.overObj = child;
    //            child.execEvent("mouseover");
    //        }
    //    } else {
    //        if (this.overObj) {
    //            this.overObj.execEvent("mouseout");
    //            this.overObj = null;
    //        }
    //    }
       
    //},
    //redraw: function (x, y, preScale, preX, preY) {
     
 
    //    for (var i = 0, len = this.children.length; i < len; i++) {
    //        var child = this.children[i];
    //        child.x = (this.scale * (child.x - preX) / preScale) + x;
    //        child.y = (this.scale * (child.y - preY) / preScale) + y;
    //        child.scaleX = this.scale * child.scaleX / preScale;
    //        child.scaleY = this.scale * child.scaleY / preScale;
    //    }
    //    this.update();

    //},
    //_handleMouseDown: function (evt) {
    //    var positionX = evt.pageX - this.offset[0], positionY = evt.pageY - this.offset[1];
    //    if (this.canScale) {
    //        this.canvas.style.cursor = "move";
    //        this.prePosition = [positionX, positionY];
    //        this.isMouseDown = true;
    //    }
        
    //    var child = this._getHitChild(this.hitCtx, positionX, positionY, "mousedown");
    //    //  if (child) child.execEvent("mousedown");
    //},

    //_handleMouseUp: function (evt) {
    //    if (this.canScale) {
    //        this.canvas.style.cursor = "default";
    //        this.isMouseDown = false;
    //    }
    //    var child = this._getHitChild(this.hitCtx, evt.pageX - this.offset[0], evt.pageY - this.offset[1], "mouseup");
    //    // if (child) child.execEvent("mouseup");
    //},
    _getXY: function (el) {
        var _t = 0,_l = 0;
        if (document.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
            var   box = el.getBoundingClientRect();
            _l = box.left;
            _t = box.top;
        } else {
            while (el.offsetParent) {
                _t += el.offsetTop;
                _l += el.offsetLeft;
                el = el.offsetParent;
            }
            return [_l, _t];
        }      
        return [_l + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), _t + Math.max(document.documentElement.scrollTop, document.body.scrollTop)];
    },
    destroy: function () {
        
    },
    //_initInterval移至add和remove 方法里以提高性能？但是fps动态变化需要再监听！
    _tick: function (container) {
       
        if (container.tick) {
            this._initInterval(container);
            if (!container.hasOwnProperty("_tickInterval")) {
                container.tick();
            } else {
                container._tickIntervalCurrent = new Date;
                if (!container._tickIntervalLast) container._tickIntervalLast = new Date;
                var itv = container._tickIntervalCurrent - container._tickIntervalLast;
                if (itv > container._tickInterval) {
                    container.tick();
                    container._tickIntervalLast = container._tickIntervalCurrent;
                }
            }
        }
        var children = container.children, len = children.length;
        for (var i = 0; i < len; i++) {
            var child = children[i];
            if (child.tick) {
                this._initInterval(child);
                if (!child.hasOwnProperty("_tickInterval")) {
                    child.tick();
                } else {
                    child._tickIntervalCurrent = new Date;
                    if (!child._tickIntervalLast) child._tickIntervalLast = new Date;
                    var itv = child._tickIntervalCurrent - child._tickIntervalLast;
                    if (itv > child._tickInterval) {
                        child.tick();
                        child._tickIntervalLast = child._tickIntervalCurrent;
                    }
                }
            }
            if (child.baseInstanceof == "Container") {
                this._tick(child);
            }
        }
    },
    _initInterval: function (obj) {
        if (obj.hasOwnProperty("tickFPS")) {
            if (obj.tickFPS == 0) {
                obj._tickInterval = 10000;
              
            } else {
                obj._tickInterval = 1000 / obj.tickFPS;
            }
        } 
    },
    tick: function (fn) {
        this.tickFn && this.tickFn();
        this.update();
    },
    onTick: function (fn) {
        this.tickFn = fn;
    },
    setFPS:function(fps){

        this.interval=Math.floor(1000/fps);
    }
})


