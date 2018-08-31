$(document).ready(function () {
    // $('#upload').click(function () {
    //     $.each($('#menu').children(), function (index, item) {
    //         $(item).removeClass('active');
    //     });
    //     $('#upload').addClass('active');
    // });

    // clever way, @ref: https://stackoverflow.com/questions/22518099/bootstrap-menu-change-li-active-class-on-click
    $("#menu a").on("click", function () {
        $("#menu a").removeClass("active");
        $(this).addClass("active");
    });
});