/*
 * widget-it
 *
 *
 * Copyright (c) 2014 Carlos Manzanares
 * Licensed under the MIT license.
 */
(function ($) {
  'use strict';

  $.fn.widgetIt = function (options) {
    return this.each(function () {
      var widget = $(this),
        settings = $.extend({
          leftOffset: parseInt(widget.attr('data-left-offset') || 0, 10),
          topOffset: parseInt(widget.attr('data-top-offset') || 0, 10),
          site: widget.attr('data-site'),
          width: widget.width() === 0 ? 400 : widget.width(),
          height: widget.height() === 0 ? 400 : widget.height(),
          contentWidth: 0,
          contentHeight: 0
        }, options),
        width = settings.leftOffset + settings.width,
        height = settings.topOffset + settings.height,
        iframe = $(document.createElement('iframe'));

      widget.css('overflow', 'hidden');
      iframe.attr({
        'scrolling': 'no',
        'src': settings.site
      });

      iframe.css({
        'margin-left': '-' + settings.leftOffset + 'px',
        'width': width + 'px',
        'margin-top': '-' + settings.topOffset + 'px',
        'height': height + 'px'
      });
      widget.append(iframe);

      if (settings.contentWidth > settings.width || settings.contentHeight > settings.height) {
        widget.perfectScrollbar({
          wheelSpeed: 20,
          wheelPropagation: false,
          scrollTopFunctionFactory: function (targetContainer) {
            var marginTopStart = parseInt($("iframe").css("margin-top"), 10),
              heightStart = parseInt($("iframe").css("height"), 10);

            return function (y) {
              if (isNaN(y)) {
                return marginTopStart - parseInt($("iframe").css("margin-top"), 10);
              } else {
                if (y < 0) {
                  y = 0;
                } else if (y > 1200 + marginTopStart - 100) {
                  // FIXME: it does not stop in the right place: where does the 100 come from?
                  y = settings.contentHeight + marginTopStart - 100;
                }
                $("iframe").css("margin-top", marginTopStart - y);
                $("iframe").css("height", heightStart + y);
              }
            };
          },
          scrollLeftFunctionFactory: function (targetContainer) {
            var marginLeftStart = parseInt($("iframe").css("margin-left"), 10),
              widthStart = parseInt($("iframe").css("width"), 10);

            return function (x) {
              if (isNaN(x)) {
                return marginLeftStart - parseInt($("iframe").css("margin-left"), 10);
              } else {
                if (x < 0) {
                  x = 0;
                } else if (x > 290) {
                  // FIXME: it does not stop in the right place: where does the 290 come from?
                  x = 290;
                }
                //console.log(x + ',' + marginLeftStart + ',' + widthStart);
                $("iframe").css("margin-left", marginLeftStart - x);
                $("iframe").css("width", widthStart + x);
              }
            };
          },
          contentHeightFunctionFactory: function (targetContainer) {
            return function () {
              return settings.contentHeight;
            };
          },
          contentWidthFunctionFactory: function (targetContainer) {
            return function () {
              return settings.contentWidth;
            };
          },
          isContainerScrolled: false
        });
      }
    });
  };

  $.widgetIt = function (widgetDefinitions) {
    $.each(widgetDefinitions, function (index, widgetDefinition) {
      $(widgetDefinition.selector).each(function () {
        $(this).widgetIt(widgetDefinition);
      });
    });
  };

}(jQuery));