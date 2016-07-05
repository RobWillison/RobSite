var PageClass = function Page(position, div) {
    this.position = position;
    this.div = div;

    this.getTop = function () {
        distanceFromTop = this.div.css('top');
        distanceFromTop = distanceFromTop.slice(0, -2);

        return parseFloat(distanceFromTop);
    }

    this.setTop = function (top) {
        this.div.css('top', top + 'px');
    }
    
    this.drop = function () {
        var currentPosition = this.div.css('top');
        currentPosition = currentPosition.slice(0, -2);

        currentPosition = parseFloat(currentPosition);

        var self = this;

        var interval = setInterval(function () {
            if (currentPosition < ($(window).height() * 0.95)) {
                currentPosition += getVwInPx(1);

                self.div.css('top', currentPosition + 'px');
            } else {
                clearInterval(interval);
            }
        }, 1);


    }

};