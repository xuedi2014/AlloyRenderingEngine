/**
 * 位图，继承自DisplayObject
 * @class FPS
 * @constructor
 */
define("ARE.FPS", {
    statics: {
        /**
         * 静态方法get
         *
         * 要获取FPS，直接在你的游戏或者应用的core loop中使用下面代码：
         *
         *          FPS.get();
         *
         * @method get
         */
        get: function () {
            if (!this.instance) this.instance = new this;
            this.instance._computeFPS();
            return this.instance.value;
        
        }
    },
    ctor: function () {
        this.last = new Date;
        this.current = null;
        this.value = 0;

        this.fpsList = [];

        var self = this;
        RAF.requestInterval(function () {
            var lastIndex= self.fpsList.length - 1;

            self.value = self.fpsList[lastIndex];
            if(lastIndex>500){
                self.fpsList.shift();
            }
        }, 200)

        this.execList = [];
    },
    exec: function (fn, fps) {
        for (var i = 0, len = this.execList.length; i < len; i++) {
            var item = this.execList[i];
            if (fn === item["fn"] && fps === item["fps"]) {
                return;
            }
        }
        
        var loop=RAF.requestInterval(function () {
            fn();
        }, 1000 / fps);

        this.execList.push({ fn: fn, fps: fps,loop:loop });
    },
    _computeFPS: function () {
        this.current = new Date;

        this.fpsList.push( parseInt(1000 / (this.current - this.last)));
        this.last = this.current;
    }
})