/*
 * widget-it
 * 
 *
 * Copyright (c) 2014 Carlos Manzanares
 * Licensed under the MIT license.
 */
/*global jQuery*/

(function ($) {
  "use strict";

  $.fn.widgetIt = function (options) {
    return this.each(function () {
      var widget = $(this),
        settings = $.extend({
          leftOffset: parseInt(widget.attr("data-left-offset") || 0, 10),
          topOffset: parseInt(widget.attr("data-top-offset") || 0, 10),
          site: widget.attr("data-site"),
          width: widget.width() === 0 ? 400 : widget.width(),
          height: widget.height() === 0 ? 400 : widget.height()
        }, options),
        width = settings.leftOffset + settings.width,
        height = settings.topOffset + settings.height,
        iframe = $(document.createElement("iframe"));

      widget.css("overflow", "hidden");
      iframe.attr({
        "scrolling": "no",
        "src": settings.site
      });

      iframe.css({
        "margin-left": "-" + settings.leftOffset + "px",
        "width": width + "px",
        "margin-top": "-" + settings.topOffset + "px",
        "height": height + "px"
      });
      widget.append(iframe);
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