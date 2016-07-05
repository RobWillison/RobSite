var onGoToPage = function (event) {
    var page = event.data.page.position;
    event.preventDefault();

    app.moveArmToPosition(page);
    app.pickUpPage(event.data.page);
};

$('#home').click({page: pages[0]}, onGoToPage);

$('#about').click({page: pages[1]}, onGoToPage);
$('#projects').click({page: pages[2]}, onGoToPage);
$('#qualifications').click({page: pages[3]}, onGoToPage);
$('#experience').click({page: pages[4]}, onGoToPage);
$('#contact').click({page: pages[5]}, onGoToPage);


