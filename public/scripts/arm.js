DivClass = function Div(jqueryDiv) {
    this.jqueryDiv = jqueryDiv;
    this.rotation = 0;
    this.width = jqueryDiv.width();

    this.getBorder = function () {
        border = this.jqueryDiv.css('border-radius');

        border = border.slice(0, -2);

        return parseFloat(border);
    }

    this.widthBetweenCenters = this.width - (this.getBorder());

    this.getTop = function () {
        distanceFromTop = this.jqueryDiv.css('top');
        distanceFromTop = distanceFromTop.slice(0, -2);

        return parseFloat(distanceFromTop);
    }

    this.getHeight = function () {
        distanceFromTop = this.jqueryDiv.css('height');
        distanceFromTop = distanceFromTop.slice(0, -2);

        return parseFloat(distanceFromTop);
    }

    this.setTop = function (top) {
        this.jqueryDiv.css('top', top + 'px');
    }

    this.setLeft = function (left) {
        this.jqueryDiv.css('left', left + 'px');
    }

    this.rotate = function (degrees) {
        this.rotation = degrees;
        this.jqueryDiv.css({'transform' : 'rotate('+ degrees +'deg)'});
    }

    this.getLeft = function () {
        distanceFromTop = this.jqueryDiv.css('left');
        distanceFromTop = distanceFromTop.slice(0, -2);

        return parseFloat(distanceFromTop);
    }

    this.getCurrentExtension = function () {
        var width = this.widthBetweenCenters;

        var distanceFromTop = width * Math.sin(this.rotation * (Math.PI / 180));

        if (this.jqueryDiv.hasClass('end')) {
            return this.getTop();
        }

        return this.getTop() + distanceFromTop;

    }
}

ArmClass = function Arm(segments) {
    this.segments = segments;
    this.extension = 0;
    
    this.position = 0;

    this.setExtension = function (extension) {
        
        this.extension = extension;
        
        var previousSegment;

        var segmentExtension = extension / this.segments.length;

        var armWidth = this.segments[0].leftArm.width - getVwInPx(4);

        var angle = Math.asin(segmentExtension / armWidth) / (Math.PI / 180);

        this.segments.forEach(function (segment) {

            segment.setRotation(angle);

            if (previousSegment != undefined) {
                segment.setStartPos(previousSegment.getEndPos());
            }

            previousSegment = segment;
        });

        var grabberPos = previousSegment.getEndPos();
        $('#grabber').css('top', grabberPos + 'px');
    };
}

ArmSegmentClass = function ArmSegment(leftArm, rightArm) {
    this.leftArm = leftArm;
    this.rightArm = rightArm;

    this.expansion = 0;

    this.setRotation = function (rotation) {

        this.leftArm.rotate(rotation);
        this.rightArm.rotate(-rotation);

    }

    this.setStartPos = function (startPos) {
        leftArm.setTop(startPos);
        rightArm.setTop(startPos);
    }

    this.getEndPos = function () {
        return leftArm.getCurrentExtension();
    }
}