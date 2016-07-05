var getVwInPx = function (vw) {
    return ($(window).width() / 100) * vw;
}

AppClass = function App(body, window, armDiv, pages, grabber) {
    this.body = body;
    this.window = window;
    this.armDiv = armDiv;
    this.grabber = grabber;
    this.arm;

    this.armAnimation;
    this.pageAnimation;

    this.pages = pages;

    this.page;
    
    this.armSpeed = getVwInPx(0.25);



    this.init = function (numberOfSegments) {
        var segments = [];

        for (var i = 0; i < numberOfSegments - 1; i++) {
            this.armDiv.append("<div class='left-arm arm' id='leftarm" + i + "'></div>");
            this.armDiv.append("<div class='right-arm arm' id='rightarm" + i + "'></div>");

            var armSegment = new ArmSegmentClass(
                new DivClass($("#leftarm" + i)),
                new DivClass($("#rightarm" + i))
            );

            segments.push(armSegment);
        }

        this.armDiv.append("<div class='arm end' id='leftarm" + i + "'><div class='left-arm arm-end-left'></div></div>");
        this.armDiv.append("<div class='arm end' id='rightarm" + i + "'><div class='right-arm arm-end-right'></div></div>");

        var armSegment = new ArmSegmentClass(
            new DivClass($("#leftarm" + i)),
            new DivClass($("#rightarm" + i))
        );

        segments.push(armSegment);

        this.arm = new ArmClass(segments);

        this.arm.setExtension($(window).height() * 0.2);
    }

    this.armDown = function (callbacks, self) {

        self.armAnimation = setInterval(
            function () {
                if((self.arm.extension / $(window).height()) < 0.85) {
                    self.arm.setExtension(self.arm.extension + self.armSpeed);
                } else {
                    clearTimeout(self.armAnimation);

                    callbacks.forEach(function (callback) {
                        callback(self);
                    });
                }

            }, 1
        );

    }

    this.armUp = function (self) {

        self.armAnimation = setInterval(
            function (onDone) {
                if((self.arm.extension / $(window).height()) > 0.2) {
                    self.arm.setExtension(self.arm.extension - self.armSpeed);
                } else {
                    clearTimeout(self.armAnimation);
                }

            }, 1
        );

        return self.armAnimation;
    }

    this.pageUp = function (self) {

        self.pageAnimation = setInterval(
            function () {
                var currentPos = self.page.getTop();
                if ((self.arm.extension / $(window).height()) > 0.2)
                {
                    self.page.setTop(self.grabber.getTop() + self.grabber.getHeight());
                } else {
                    clearInterval(self.pageAnimation);
                }
            }, 1
        );

        return self.pageAnimation;
    }
    
    this.dropAllPages = function () {
        pages.forEach(function (page) {
            page.drop();
        });
    }

    this.pickUpPage = function (page) {
        this.dropAllPages();

        clearTimeout(this.armAnimation);
        clearTimeout(this.pageAnimation);

        this.page = page;

        this.armDown(
            [
                this.armUp,
                this.pageUp
            ],
            this);
    }

    this.moveArmToPosition = function(page) {
        var pageWidth = this.arm.segments[0].leftArm.width;
        var position = pageWidth * page;

        this.armDiv.css('left', position + 'px');
        $('#grabber').css('left', position + 'px');
    }
}

var getSegmentsRequired = function (){

    var maxSegmentHeight = Math.sin(50 * (Math.PI / 180)) * ($("#example-arm-segment").width() - getVwInPx(2));

    return $(window).height() / maxSegmentHeight;
}

var numberOfSegment = parseInt(getSegmentsRequired());

var pages = [new PageClass(0, $('#page')), new PageClass(1, $('#page')), new PageClass(2, $('#page')), new PageClass(3, $('#page')), new PageClass(4, $('#page')), new PageClass(5, $('#page'))];

var app = new AppClass($("body"), $(window), $('#scissor-arm'), pages, new DivClass($('#grabber')));

app.init(numberOfSegment);