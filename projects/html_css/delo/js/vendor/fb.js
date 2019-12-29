window.addEventListener('load', function() {
    var e = document.getElementsByTagName('a');
    for (var k = 0; k < e.length; k++) {
        if (e[k].className.indexOf('fb-share') != -1) {
            if (e[k].getAttribute('data-url') != -1) var u = e[k].getAttribute('data-url');
            if (e[k].getAttribute('data-title') != -1) var t = e[k].getAttribute('data-title');
            if (e[k].getAttribute('data-image') != -1) var i = e[k].getAttribute('data-image');
            if (e[k].getAttribute('data-description') != -1) var d = e[k].getAttribute('data-description');
            if (e[k].getAttribute('data-path') != -1) var f = e[k].getAttribute('data-path');
            if (e[k].getAttribute('data-icons-file') != -1) var fn = e[k].getAttribute('data-icons-file');
            if (!f) {
                function path(name) {
                    var sc = document.getElementsByTagName('script'),
                        sr = new RegExp('^(.*/|)(' + name + ')([#?]|$)');
                    for (var p = 0, scL = sc.length; p < scL; p++) {
                        var m = String(sc[p].src).match(sr);
                        if (m) {
                            if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\/\\])/)) return m[1];
                            if (m[1].indexOf("/") == 0) return m[1];
                            b = document.getElementsByTagName('base');
                            if (b[0] && b[0].href) return b[0].href + m[1];
                            else return document.location.pathname.match(/(.*[\/\\])/)[0] + m[1];
                        }
                    }
                    return null;
                }
                f = path('share42.js');
            }
            if (!u) u = location.href;
            if (!t) t = document.title;

            function desc() {
                var meta = document.getElementsByTagName('meta');
                for (var m = 0; m < meta.length; m++) {
                    if (meta[m].name.toLowerCase() == 'description') {
                        return meta[m].content;
                    }
                }
                return '';
            }
            if (!d) d = desc();
            u = encodeURIComponent(u);
            t = encodeURIComponent(t);
            t = t.replace(/\'/g, '%27');
            i = encodeURIComponent(i);
            d = encodeURIComponent(d);
            d = d.replace(/\'/g, '%27');
            var fbQuery = 'u=' + u;
            if (i != 'null' && i != '') fbQuery = 's=100&p[url]=' + u + '&p[title]=' + t + '&p[summary]=' + d + '&p[images][0]=' + i;
            //var s = new Array('"#" data-count="fb" onclick="window.open(\'//www.facebook.com/sharer.php?m2w&' + fbQuery + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"');
            e[k].onclick = function() {
                window.open('//www.facebook.com/sharer.php?m2w&' + fbQuery);
                return false;
            }
        }
    };
}, false);
