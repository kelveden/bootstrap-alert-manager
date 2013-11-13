/*globals $*/
/*!
 (c) 2013 Alistair Dutton
 License: http://opensource.org/licenses/MIT
 */
var alertManager = (function () {

    "use strict";

    var buildAlert = function (message, level, moreInfo, title) {

            var alertClass = level ? " alert-" + level : "",
                alert = $("<div/>", {
                    "class": "alert" + alertClass,
                    text: message
                }),
                closeButton = $("<button/>", {
                    "class": "close",
                    "data-dismiss": "alert"
                }).append("&times;"),
                moreInfoButton = $("<button/>", {
                    "class": "close",
                    onclick: "$(this).next().toggle()"
                }).append($("<i/>", { "class": "icon-chevron-down" })),
                moreInfoContent = $("<div/>", {
                    text: JSON.stringify(moreInfo)
                }).hide(),
                addAlertToContainer = function (alert, container) {
                    if (container) {
                        $(container).append(alert);
                    } else {
                        $('.alert-container').append(alert);
                    }
                };

            if (title) {
                alert.prepend($("<strong>" + title + ": </strong>"));
            }

            alert.append(closeButton);

            if (moreInfo) {
                alert.append(moreInfoButton);
                alert.append(moreInfoContent);
            }

            alert.showFloated = function (container) {
                alert.addClass('floating-alert');

                addAlertToContainer(this, container);

                return this;
            };

            alert.showDocked = function (container) {
                alert.addClass('docked-alert');

                addAlertToContainer(this, container);

                return this;
            };

            return alert;
        },
        closeAll = function (container) {
            if (container) {
                $(container).find(".alert").remove();
            } else {
                $('.alert-container .alert').remove();
            }
        },
        floatingContainer = function () {
            return $("<div/>", { "class": "alert-container floating-alert-container" });
        };

    return {
        error: function (message, moreInfo) {
            return buildAlert(message, "error", moreInfo, "Error");
        },
        warning: function (message, moreInfo) {
            return buildAlert(message, null, moreInfo, "Warning");
        },
        success: function (message, moreInfo, title) {
            return buildAlert(message, "success", moreInfo, title);
        },
        info: function (message, moreInfo, title) {
            return buildAlert(message, "info", moreInfo, title);
        },
        closeAll: closeAll,
        floatingContainer: floatingContainer
    };
}());
