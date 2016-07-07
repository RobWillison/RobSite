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

    this.setHeight = function (height) {
        this.div.css('height', height + 'px');
    }
    
    this.drop = function () {
        var currentPosition = this.div.css('top');
        currentPosition = currentPosition.slice(0, -2);

        currentPosition = parseFloat(currentPosition);

        var self = this;

        var interval = setInterval(function () {
            if (currentPosition < ($(window).height() * 1)) {
                currentPosition += getVwInPx(1);

                self.div.css('top', currentPosition + 'px');
                self.div.css('height', ($(window).height() - currentPosition) + 'px');
            } else {
                clearInterval(interval);
            }
        }, 1);


    }

};