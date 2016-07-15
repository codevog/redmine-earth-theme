if ($('meta[name="viewport"]').attr('content').length == 0) {
    document.write('<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; user-scalable=0;" />');
}

function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function leftMenu() {
    $('#top-menu').insertBefore($('#wrapper3'));
}

function addElements() {
    $('<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>').appendTo($(".top-menu-wrapper"));
    var menuLeft = $('#top-menu'),
        body = $('body'),
        search = $('#quick-search'),
        menuButton = $('#menu');
    menuButton.click(function () {
        $(this).toggleClass('active');
        body.toggleClass('menu-push-toright');
        menuButton.toggleClass('menu-push-toright');
        search.toggleClass('menu-push-toright');
        menuLeft.toggleClass('open');
    });
}

function mainMenu() {
    var menu = $('#main-menu'),
        body = $('body');
    if (menu.children().length == 1) {
        $('<div id="burger-main-menu"><div class="one"></div><div class="two"></div><div class="three"></div></div>').appendTo($(".top-menu-wrapper"));
        var menuButton = $('#burger-main-menu');
        menuButton.click(function () {
            $(this).toggleClass('active');
            body.toggleClass('show-main-menu');
            menuButton.toggleClass('show-main-menu');
            menu.toggleClass('open');
        });
    } else {
        menu.hide();
    }
}

function returnMenu() {
    $('#top-menu').appendTo($('.top-menu-wrapper'));
}

function wrapTable(table) {
    if ($(table).length >= 1) {
        $(table).wrap('<div class="table-wrapper"></div>');
    }
}

function staffMenu() {
    var menu = $('#staff-report-main-menu');
    if (menu.length == 1) {
        menu.insertBefore($('#sidebar'));
    }
}

function ganttsResponsive() {
    $('.controller-gantts #content > table:first').remove().clone(true, true).appendTo("#query_form").wrap('<div id="gantts" class="gantts autoscroll"></div>');
    $('.controller-calendars #content > table:first').remove().clone(true, true).appendTo("#query_form").wrap('<div id="calendars" class="calendars autoscroll"></div>');
    var newGantts = $('#gantts').find('table'),
        newGanttsWidth = function () {
        $(window).width() < 750 ? newGantts.width($('.gantt_hdr').width() + $('#gantt_area').find('> div').width() + 10) : newGantts.width('100%');
    };
    newGanttsWidth();
    $(window).on('resize', newGanttsWidth);
}

function fixesV3() {
    $('link[rel=stylesheet][href="/stylesheets/responsive.css"]').remove();

    $('.js-project-menu > ul').detach().appendTo('#main-menu');
    $('.js-general-menu > ul').detach().appendTo('#top-menu');
    $('.js-sidebar > *').detach().appendTo('#sidebar');
    $('.js-profile-menu ul').detach().appendTo('#account');
    $('.js-flyout-menu-toggle-button, .js-flyout-menu').remove();
}

$(document).ready(function () {
    fixesV3();
    var menu = $('#main-menu'),
        logged = $('#loggedas'),
        sidebar = $('#sidebar'),
        main = $('#main'),
        wrapper = $('#wrapper3'),
        header = $('#header');
    $('#top-menu').wrap('<div class="top-menu-wrapper"></div>');
    menu.addClass('clearfix').wrap('<div class="main-menu-wrapper"></div>');
    $('#quick-search').wrap('<div class="header-wrapper clearfix"></div>');
    $('.header-wrapper').append('<a href="/" class="logo"><span></span></a>');
    header.find('> h1').appendTo('.header-wrapper');
    logged.find('a').detach().appendTo(logged.contents().wrap('<span class="logged"></span>').end());
    if (getViewportWidth() <= 1023) {
        $('#account').insertAfter(logged);
        leftMenu();
        if ($('#menu').length != 1) {
            addElements();
        }
    }
    if (getViewportWidth() <= 1023) {
        if ($('#burger-main-menu').length != 1) {
            mainMenu();
        }
    }
    wrapTable('table.list, table.cal, table.query-columns');
    $('.query-columns').parent().parent().removeAttr('style');
    ganttsResponsive();
    if (menu.children().length == 0) {
        menu.hide();
    }
    staffMenu();
    if (sidebar && sidebar.children().length > 0) {
        var sidebarButton = '<a class="fa fa-plus-square sidebar-menu-trigger"></a>';
        main.prepend(sidebarButton);
        $('.sidebar-menu-trigger').click(function () {
            $(this).toggleClass('open');
            sidebar.toggleClass('open');
        });
    }
    $('.add-filter').prependTo("#filters").wrap('<table class="filters-add"></table>');
    if (wrapper.find('> .top-menu-wrapper').children().length != 1) {
        $('.top-menu-wrapper').prependTo(wrapper);
    }
    if ($('.pagination + .pages').length == 1) {
        $('.pages').appendTo($('.pagination'));
    }
});

$(window).resize(function () {
    if (getViewportWidth() <= 1023) {
        $('#account').insertAfter($('#loggedas'));
        leftMenu();
        if ($('#menu').length != 1) {
            addElements();
        }
    }
    if (getViewportWidth() <= 1023) {
        if ($('#burger-main-menu').length != 1) {
            mainMenu();
        }
    }
    if (getViewportWidth() > 1023) {
        returnMenu();
    }
});

$(window).load(function() {
    $('#wrapper').addClass('hide-preloader');
});