/*globals "alertManager", "expect", "describe", "it", "beforeEach", "$" */
describe("The Alert Manager", function () {

    "use strict";

    beforeEach(function () {
        $('.alert-container').remove();
        $('body').append($('<div class="alert-container"></div>'));
    });

    it("will append floating alerts to an element with the alert-container class by default.", function () {

        alertManager.error().showFloated();

        expect($('.alert-container .floating-alert').length).toBe(1);
    });

    it("will append docked alerts to an element with the alert-container class by default.", function () {

        alertManager.error().showDocked();

        expect($('.alert-container .docked-alert').length).toBe(1);
    });

    it("will append alerts to a container if specified.", function () {

        var container = $('<div id="somediv"></div>');
        $('body').append(container);

        alertManager.error().showFloated(container);

        expect(container.find('.floating-alert').length).toBe(1);
        container.remove();
    });

    it("appends alerts one after another.", function () {

        alertManager.error("message1").showFloated();
        alertManager.error("message2").showFloated();

        expect($('.floating-alert:eq(0)')).toHaveText(/message1/);
        expect($('.floating-alert:eq(1)')).toHaveText(/message2/);
    });

    it("assigns the correct CSS class to error alerts.", function () {

        alertManager.error("message1").showFloated();

        expect($('.floating-alert')).toHaveClass("alert alert-error");
    });

    it("assigns the correct CSS class to warning alerts.", function () {

        alertManager.warning("message1").showFloated();

        expect($('.floating-alert')).toHaveClass("alert");
    });

    it("assigns the correct CSS class to success alerts.", function () {

        alertManager.success("message1").showFloated();

        expect($('.floating-alert')).toHaveClass("alert alert-success");
    });

    it("assigns the correct CSS class to info alerts.", function () {

        alertManager.info("message1").showFloated();

        expect($('.floating-alert')).toHaveClass("alert alert-info");
    });

    it("adds a heading for error alerts.", function () {

        alertManager.error("message1").showFloated();

        expect($('.floating-alert strong')).toHaveText(/^Error/);
    });

    it("adds a heading for warning alerts.", function () {

        alertManager.warning("message1").showFloated();

        expect($('.floating-alert strong')).toHaveText(/^Warning/);
    });

    it("does not add a heading for info alerts.", function () {

        alertManager.info("message1").showFloated();

        expect($('.floating-alert strong')).not.toExist();
    });

    it("does not add a heading for success alerts.", function () {

        alertManager.success("message1").showFloated();

        expect($('.floating-alert strong')).not.toExist();
    });

    it("appends a 'more info' button if more info specified", function () {

        alertManager.error("message1", { data: "somedata" }).showFloated();

        expect($('.floating-alert button i')).toHaveClass('icon-chevron-down');
    });

    describe("more info", function () {
        it("is hidden by default", function () {

            var moreInfo = { data: "somedata" };

            alertManager.error("message1", moreInfo).showFloated();

            expect($('.floating-alert div')).toBeHidden();
            expect($('.floating-alert div')).toHaveText(JSON.stringify(moreInfo));
        });

        it("is revealed by clicking on 'more info' button", function () {

            alertManager.error("message1", { data: "somedata" }).showFloated();

            expect($('.floating-alert div')).toBeHidden();

            $('button:has(i)').click();

            expect($('.floating-alert div')).toBeVisible();
        });
    });

    it("can clear all alerts", function () {

        alertManager.error("message1").showFloated();
        alertManager.error("message2").showFloated();

        expect($('.floating-alert')).toExist();

        alertManager.closeAll();

        expect($('.floating-alert')).not.toExist();
    });

    it("can create a floating alert container for convenience", function () {

        $('.alert-container').remove();

        var container = alertManager.floatingContainer();
        $('body').append(container);

        alertManager.error("message1").showFloated();

        expect(container.find('.floating-alert')).toExist();
    });
});

