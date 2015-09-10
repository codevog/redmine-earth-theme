document.write('<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; user-scalable=0;" />');

(function (window) {

    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function leftMenu() {
    var wrapper = $('#wrapper3');
    $('#top-menu').insertBefore(wrapper);
}

function addElements(){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>' ).appendTo( $( ".top-menu-wrapper" ) );
    var menuLeft = document.getElementById( 'top-menu' ),
        showLeft = document.getElementById( 'menu' ),
        body = document.body,
        search = document.getElementById( 'quick-search' ),
        menuButton = document.getElementById( 'menu' );

    showLeft.onclick = function() {
        classie.toggle( this, 'active' );
        classie.toggle( body, 'menu-push-toright' );
        classie.toggle( menuButton, 'menu-push-toright' );
        classie.toggle( search, 'menu-push-toright' );
        classie.toggle( menuLeft, 'open' );
    };
}

function mainMenu() {
    if ($('#main-menu').children().length == 1) {
        $( '<div id="burger-main-menu"><div class="one"></div><div class="two"></div><div class="three"></div></div>' ).appendTo( $( ".top-menu-wrapper" ) );
        var menu = document.getElementById( 'main-menu'),
            menuButton = document.getElementById( 'burger-main-menu'),
            body = document.body;
        menuButton.onclick = function() {
            classie.toggle( this, 'active');
            classie.toggle( body, 'show-main-menu' );
            classie.toggle( menuButton, 'show-main-menu' );
            classie.toggle( menu, 'open' );
        }
    } else {
        $('#main-menu').hide();
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

    $('.controller-gantts #content > table:first').remove().clone(true,true).appendTo( "#query_form" ).wrap('<div id="gantts" class="gantts autoscroll"></div>');
    $('.controller-calendars #content > table:first').remove().clone(true,true).appendTo( "#query_form" ).wrap('<div id="calendars" class="calendars autoscroll"></div>');

    var $newGantts = $('#gantts > table'),

        newGanttsWidth = function(){
            $(window).width() < 750 ? $newGantts.width($('.gantt_hdr').width() + $('#gantt_area > div').width() + 10) : $newGantts.width('100%');

        };

    newGanttsWidth();

    $(window).on('resize', newGanttsWidth);
}

jQuery(document).ready(function(){
    jQuery('#top-menu').wrap('<div class="top-menu-wrapper"></div>');
    jQuery('#main-menu').addClass('clearfix').wrap('<div class="main-menu-wrapper"></div>');
    jQuery('#quick-search').wrap('<div class="header-wrapper clearfix"></div>');
    jQuery('.header-wrapper').append('<a href="/" class="logo"><span></span></a>');
    jQuery('#header > h1').appendTo('.header-wrapper');
    jQuery('#loggedas a').detach().appendTo(jQuery('#loggedas').contents().wrap('<span class="logged"></span>').end());

    var sidebar = jQuery('#sidebar'),
        main = jQuery('#main');

    if (getViewportWidth() <= 1023) {
        jQuery('#account').insertAfter(jQuery('#loggedas'));
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
    ganttsResponsive();

    if ($('#main-menu').children().length == 0 ) {
        $('#main-menu').hide();
    }

    staffMenu();

    if (sidebar && sidebar.children().length > 0) {
        var sidebarButton = '<a class="fa fa-plus-square sidebar-menu-trigger"></a>';
        main.prepend(sidebarButton);
    }

    jQuery('.sidebar-menu-trigger').click(function() {
        classie.toggle( this, 'open' );
        classie.toggle( document.getElementById("sidebar"), 'open' );
    });

    jQuery('.add-filter').prependTo( "#filters" ).wrap('<table class="filters-add"></table>');

    if ($('#wrapper3 > .top-menu-wrapper').children().length != 1) {
        $('.top-menu-wrapper').prependTo($('#wrapper3'));
    }
});

$(window).resize(function() {

    if (getViewportWidth() <= 1023) {
        jQuery('#account').insertAfter(jQuery('#loggedas'));
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