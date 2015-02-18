$(function() {
  var stickyMenu = function() {
    var menuLogo = $('#menulogo');
    var top = $(window).scrollTop();
    var menuTop = $('#navanchor').offset().top;
    var spacer = $('#spacer');
    var menu = $("#header-inner");

    if (top > menuTop - 20) {
      menu.addClass('stuck');      
      menuLogo.removeClass('hidden');
    } else {      
      if (top<=menuTop) {        
        menu.removeClass('stuck');
        menuLogo.addClass('hidden');
      }
    }

  };

  $(window).resize(function() {
    handleResponsiveSmallLogo();
  });

  function handleResponsiveSmallLogo() {    
    var w = $(window).width();
    if (w < 479) {
      $('#header-inner').append($('#menulogo'));
    } else {     
      stickyMenu();      
      $('#nav-container-inner').prepend($('#menulogo'));
    }
  }

  $(window).scroll(stickyMenu);
  stickyMenu();
  handleResponsiveSmallLogo();
});