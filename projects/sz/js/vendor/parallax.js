function initParallaxBg() {
    jQuery('.parallax-wrap').parallaxBG({
        parent: '.bg-frame',
        image: 'img',
        parallaxOffset: 240,
        fallbackFunc: initBgStretch
    });
}

;
(function($) {
    function ParallaxBG(opt) {
        this.options = $.extend({
            parent: '.bg-frame',
            image: 'img',
            parallaxOffset: 100,
            fallbackFunc: function() {}
        }, opt);
        this.init();
    }
    ParallaxBG.prototype = {
        init: function() {
            if (this.options.holder) {
                if (typeof this.options.fallbackFunc == 'function' && (oldIe || isTouchDevice)) {
                    this.options.fallbackFunc();
                    return;
                }
                this.getStructure();
                this.attachEvents();
            }
        },
        getStructure: function() {
            this.holder = $(this.options.holder);
            this.parent = this.holder.find(this.options.parent);
            this.holderHeight = this.holder.height();
            this.holderOffset = this.holder.offset().top;

            // generate bg
            this.image = this.parent.find(this.options.image).eq(0).css({
                visibility: 'hidden'
            });
            this.imageRatio = this.image.attr('width') / this.image.attr('height') || this.image.width() / this.image.height();

            this.parent.css({
                backgroundImage: 'url(img/1.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            });

            this.win = $(window);
            this.winHeight = this.win.height();
            this.winWidth = this.win.width();
            this.winScroll = this.win.scrollTop();
            this.bgHeight = this.winHeight + this.options.parallaxOffset;
        },
        attachEvents: function() {
            var self = this;
            this.bindHandlers(['scrollLayout']);
            this.bindHandlers(['resizeLayout']);
            this.win.bind('scroll', this.scrollLayout).bind('resize load', this.resizeLayout);

            // fix load problem
            setTimeout(function() {
                self.resizeLayout();
                self.win.trigger('scroll');
            }, 500);
        },
        resizeLayout: function() {
            // get dimensions
            this.winHeight = this.win.height();
            this.winWidth = this.win.width();
            this.holderHeight = this.holder.height();
            this.holderOffset = this.holder.offset().top;

            this.blockHeight = this.winHeight + this.options.parallaxOffset;
            this.currentTop = Math.max(0, this.blockHeight - this.holderHeight);

            // get parallax ratio and image ratio state
            this.parallaxRatio = this.win.width() / (this.winHeight + this.options.parallaxOffset);
            this.ratioState = this.imageRatio <= this.parallaxRatio;

            if (this.ratioState) {
                this.bgWidth = this.winWidth;
                this.bgHeight = this.bgWidth / this.imageRatio;
            } else {
                this.bgWidth = 'auto';
                this.bgHeight = $('.frontscreen').outerHeight() + this.options.parallaxOffset;
            }

            this.parent.css({
                paddingBottom: this.currentTop,
                backgroundSize: this.bgWidth != 'auto' ? this.bgWidth + 'px ' + this.bgHeight + 'px' : this.bgWidth + ' ' + this.bgHeight + 'px'
            });
            this.scrollLayout();
        },
        scrollLayout: function() {
            this.winScroll = this.win.scrollTop();
            this.offsetPercentage = Math.max(0, Math.min((this.winScroll + this.winHeight - this.holderOffset) / (this.winHeight + this.holderHeight), 1)).toFixed(4);

            var backgroundPos = $('.top-ornament--1').css("backgroundPosition").split(" "),
                xPos = Number(backgroundPos[0].replace('px', '')),
                yPos = Number(backgroundPos[1].replace('px', ''));

            if (!!this.ratioState) {
                var curPos = 885 + xPos + 'px ' + ((-parseFloat(this.offsetPercentage) * this.options.parallaxOffset) - (this.bgHeight - this.winHeight) / 2) + 'px';
            } else {
                var curPos = 885 + xPos + 'px ' + (-parseFloat(this.offsetPercentage) * this.options.parallaxOffset) + 'px';
            }

            this.parent.css({
                backgroundPosition: curPos
            });
        },
        bindHandlers: function(handlersList) {
            var self = this;
            $.each(handlersList, function(index, handler) {
                var origHandler = self[handler];
                self[handler] = function() {
                    return origHandler.apply(self, arguments);
                };
            });
        }
    };

    // detect device type
    var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    var oldIe = window.attachEvent && !window.addEventListener;

    // jquery parallax plugin
    $.fn.parallaxBG = function(opt) {
        return this.each(function() {
            new ParallaxBG($.extend(opt, {
                holder: this
            }));
        });
    };
}(jQuery));

// background stretching
function initBgStretch() {
    jQuery('.bg-frame').each(function() {
        var holder = jQuery(this);
        var image = holder.find('img');
        jQuery(window).bind('load resize', function() {
            var settings = getProportions(getDimensions(image, holder));
            resizeAll(image, settings);
        });
    });

    function getProportions(dimensions) {
        var ratio = dimensions.ratio || (dimensions.elementWidth / dimensions.elementHeight);
        var slideWidth = dimensions.maskWidth,
            slideHeight = slideWidth / ratio;
        if (slideHeight < dimensions.maskHeight) {
            slideHeight = dimensions.maskHeight;
            slideWidth = slideHeight * ratio;
        }
        return {
            width: slideWidth,
            height: slideHeight,
            top: (dimensions.maskHeight - slideHeight) / 2,
            left: (dimensions.maskWidth - slideWidth) / 2
        }
    }

    function getDimensions(img, block) {
        img.css({
            height: '',
            left: '',
            top: '',
            width: ''
        });
        return {
            ratio: img.width() / img.height(),
            maskWidth: block.width(),
            maskHeight: block.outerHeight(true)
        };
    }

    function resizeAll(img, obj) {
        img.css({
            height: obj.height,
            left: obj.left,
            top: obj.top,
            width: obj.width
        });
    }
}
