document.addEventListener('DOMContentLoaded', function(){

       $('.js-lightbox-video').lightbox({
        'trigger': '.js-lightbox-video-trigger',
        'showContent': function(e) {
            e.preventDefault();
            // http://jsfiddle.net/KtbYR/5/
            // http://stackoverflow.com/questions/8948403/youtube-api-target-multiple-existing-iframes?noredirect=1&lq=1
            var frame = this.container.find('iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).attr('href').replace('#', '')+'?rel=0&autoplay=1&wmode=opaque&fs=1&enablejsapi=1');

        },
        'onClose': function() {
            setTimeout(function() {
                this.container.find('iframe').attr('src', '');
            }.bind(this), 400);
        }
    });
}, false);


var Lightbox = function(node, settings) {
    this.settings = $.extend({}, this.defaultSettings, settings);
    this.container = node;
    this.content = this.container.find(this.settings.content);
    this.trigger = $(this.settings.trigger);
    this.closeBtn = this.container.find(this.settings.closeBtn);

    this.triggers = [];

    this.trigger.each(function(index, el) {
        el = $(el);
        this.triggers.push(new LightboxTrigger(index, el, this));
    }.bind(this));

    this.keyup = this.keyup.bind(this);

    this.closeBtn.on('click', this.close.bind(this));
}

Lightbox.prototype.defaultSettings = {
    'trigger': '.js-lightbox-trigger',
    'closeBtn': '.js-lightbox-close',
    'content': '.lightbox-content',
    'activeClass': 'lightbox-active',
    'showContent': function() {},
    'onOpen': function() {},
    'onClose': function() {}
}

Lightbox.prototype.open = function() {
    this.container.addClass(this.settings.activeClass);
    this.settings.onOpen.apply(this, arguments);
    $(document).on('keyup', this.keyup);
}

Lightbox.prototype.close = function(e) {
    if (e) e.preventDefault();
    this.container.removeClass(this.settings.activeClass);
    this.settings.onClose.apply(this, arguments);
    $(document).off('keyup', this.keyup);
}

Lightbox.prototype.keyup = function(e) {
    if (e.keyCode == 27) {
        this.close();
    }
}

Lightbox.prototype.loadContent = function(url) {
    $.ajax({
        'url': url,
        'method': 'POST',
        'success': function() {
            this.settings.showContent.apply(this, arguments)
        }.bind(this),
        'error': function(message) {
            console.error(message)
        }
    });
}

var LightboxTrigger = function(index, trigger, lightbox) {
    this.index = index;
    this.trigger = trigger;
    this.url = trigger.attr('href') || trigger.attr('data-href');
    this.lightbox = lightbox;

    this.trigger.on('click', this.click.bind(this));
}

LightboxTrigger.prototype.click = function(e) {
    e.preventDefault();
    this.lightbox.open();
    this.lightbox.settings.showContent.apply(this.lightbox, arguments);
}

$.fn.lightbox = function(settings) {
    return $(this).each(function(index, el) {
        el = $(el);
        if (!el.data('lightbox')) {
            el.data('lightbox', new Lightbox(el, settings));
        }
    });
}


