var getVwInPx = function (vw) {
    return (100 / $(window).width()) * vw;
}

PageClass = function Page() {

}

AppClass = function App(body, window, arm, pages) {
    this.body = body;
    this.window = window;
    this.arm = arm;

    this.pages = pages;
    
    this.init = function (numberOfSegments) {
        var segments = [];

        for (var i = 0; i < numberOfSegments; i++) {
            this.arm.append("<div class='left-arm arm' id='leftarm" + i + "'></div>");
            this.arm.append("<div class='right-arm arm' id='rightarm" + i + "'></div>");

            var armSegment = new ArmSegmentClass(
                new DivClass($("#leftarm" + i)),
                new DivClass($("#rightarm" + i))
            );

            segments.push(armSegment);
        }

        return segments;
    }

    this.getPagePositionPercent = function () {
        return this.window.scrollTop() / (this.body.height() - this.window.height());
    }

    this.getArmLength = function () {

        var percentDownPage = this.getPagePositionPercent() //Get the percentage down the page;

        var radians = ((percentDownPage * Math.PI) * (pages.length * 2));

        var height = (Math.cos(radians) - 1) / 2;

        var armPercent = Math.abs(height) + 0.2;

        return $(window).height() * armPercent;
    }
}

var getSegmentsRequired = function (){

    var maxSegmentHeight = Math.sin(50 * (Math.PI / 180)) * ($("#example-arm-segment").width() - getVwInPx(2));

    return $(window).height() / maxSegmentHeight;
}

var numberOfSegment = parseInt(getSegmentsRequired());

var armDiv = new DivClass($("#scissor-arm"));

var pages = [new PageClass(), new PageClass(), new PageClass()];

var app = new AppClass($("body"), $(window), $("#scissor-arm"), pages);
var segments = app.init(numberOfSegment);

var arm = new ArmClass(segments);


distanceFromTopArm = armDiv.getTop();

var updateArm = function () {
    var scrollPosition = $(window).scrollTop();

    var newPosition = scrollPosition + distanceFromTopArm;

    armDiv.setTop(newPosition);

    var expansion = app.getArmLength();

    arm.setExtension(expansion);
}

updateArm();

$(window).scroll(function () {
    updateArm();
});

