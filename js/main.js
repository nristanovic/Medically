// regular expressions

var reName = /^[A-ZŠĐČĆŽ][A-Za-zŠĐČĆŽšđčćž,.'-]+(\s[A-ZŠĐČĆŽ][A-Za-zŠĐČĆŽšđčćž,.'-]+)*$/;
var reMail = /^[a-z0-9](([\.-\_]?[a-z0-9]+)*|[a-z0-9]+)\@[a-z0-9](([\.-\_]?[a-z0-9]+)*|[a-z0-9]+)\.[a-z]{2,63}$/;
var reMsg = /^[a-zA-Z0-9~!@#$%^&*()`\[\]{}<>;':,./?| ]{8,}$/;
var rePhone = /^\+1[0-9]{6,6}$/;

// form anti spam

var fcSubmitted = false;
var faSubmitted = false;

// appointment form json

var appointment = {};

// google map on contact page

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

$(document).ready(function() {

  $('#loading').fadeOut(300);

  // head slideshow

  headSlideshow();

  // zebra

  $('#aboutContainer > table > tbody > tr:odd').css('background-color', '#eee');
  $('#dps > ul > li:odd').css('background-color', '#eee');

  // fixed navigation

  if($(this).scrollTop() > 150) {
    $('#navigation').addClass('fixed');
    $('#hcBoxes').css({top: '520px'});
  }

  $(window).scroll(function() {
    if($(this).scrollTop() > 150) {
      $('#navigation').addClass('fixed');
      $('#hcBoxes').css({top: '520px'});
    } else {
      $('#navigation').removeClass('fixed');
      $('#hcBoxes').css({top: '470px'});
    }
  });

  // navigation hover slide

  $('#navigation > ul > li').hover(function() {
    $(this)
    .find('.border')
    .not('.activePage, .dropBorder')
    .clearQueue()
    .animate({
      width: '30px'
    }, 300);
  },
  function() {
    $(this)
    .find('.border')
    .not('.activePage, .dropBorder')
    .clearQueue()
    .animate({
      width: '0'
    }, 300);
  });

  $('#navigation > ul > li > ul > li').hover(function() {
    $(this)
    .find('.dropBorder')
    .not('.activePage')
    .clearQueue()
    .animate({
      width: '30px'
    }, 300);
  },
  function() {
    $(this)
    .find('.dropBorder')
    .not('.activePage')
    .clearQueue()
    .animate({
      width: '0'
    }, 300);
  });

  // dropdown navigation

  $('#navigation > ul > li').hover(function() {
    $(this)
      .find('ul')
      .stop(true, true)
      .slideDown(300);
  }, function() {
    $(this)
      .find('ul')
      .stop(true,true)
      .fadeOut(200);
  });

  // search fade

  $('#navigation > i').click(function() {
    $('#search')
    .stop(true, true)
    .fadeToggle(300)
    .focus()
  });

  // make an appointment button

  $('#slideshowContent > a').hover(function() {
    $(this)
    .clearQueue()
    .animate({
      backgroundColor: '#eee',
      color: '#444'
    }, 200);
  }, function() {
    $(this)
    .clearQueue()
    .animate({
      backgroundColor: '#444',
      color: '#eee'
    }, 200);
  });

$('#slideshowContent > a').click(function() {
  $('html, body').animate({
    scrollTop: $('#appContainer').offset().top - 50
  }, 2000);
});

  // hcBox hover

  $('.hcBoxBG').hover(function() {
    var $hcBoxBG = $(this)

    $hcBoxBG
    .clearQueue()
    .animate({
      backgroundPositionY: '0'
    }, 400);

    $hcBoxBG
    .find('i, h1, p')
    .clearQueue()
    .animate({
      color: '#fff'
    }, 400);
  }, function() {
    var $hcBoxBG = $(this)

    $hcBoxBG
    .clearQueue()
    .animate({
      backgroundPositionY: '180px'
    }, 400);

    $hcBoxBG
    .find('i, h1, p')
    .clearQueue()
    .animate({
      color: '#444'
    }, 400);
  });

  // departments fade in/out

  $('#dps > ul > li').click(function() {
    var $li = $(this);
    var $liSpan = $(this).find('span');
    var $dpsAbout = $('.dpsAbout');

    $li
    .addClass('activeDpsLi')
    .siblings(this)
    .removeClass('activeDpsLi');

    if($liSpan.text() == "outpatient clinic") {
      changeDps('.outClinic');
    }
    else if($liSpan.text() == "gynaecological clinic") {
      changeDps('.gynClinic');
    }
    else if($liSpan.text() == "dental clinic") {
      changeDps('.denClinic');
    }
    else if($liSpan.text() == "cardiac clinic") {
      changeDps('.carClinic');
    }
    else {
      changeDps('.outSurgery');
    }
  });

  // make an appointment form

  $('#faSubmit').hover(function() {
    $(this)
      .clearQueue()
      .animate({
        backgroundColor: '#fff',
        color: '#17c0c3'
      }, 200);
  }, function() {
    $(this)
    .clearQueue()
    .animate({
      backgroundColor: '#17c0c3',
      color: '#fff'
    }, 200);
  });

  $('#faReset').hover(function() {
    $(this)
      .clearQueue()
      .animate({
        backgroundColor: '#fff'
      }, 200);
  }, function() {
    $(this)
    .clearQueue()
    .animate({
      backgroundColor: '#ddd'
    }, 200);
  });

  $('#faName, #faMail, #faPhone').keyup(function() {
    var $faName = $('#faName').val();
    var $faMail = $('#faMail').val();
    var $faPhone = $('#faPhone').val();

    if($('#faName').is(':focus')) {
      reBorderColor(reName, $faName, '#faName');
    } else if($('#faMail').is(':focus')) {
      reBorderColor(reMail, $faMail, '#faMail');
    } else {
      reBorderColor(rePhone, $faPhone, '#faPhone');
    }
  });

  $('#faDoctor, #faDepartment, #faDate').change(function() {
    var $faDoctor = $('#faDoctor > option:selected').val();
    var $faDepartment = $('#faDepartment > option:selected').val();
    var $faDate = $('#faDate').datepicker('getDate');

    if($('#faDoctor').is(':focus')) {
      onChangeBorderChange($faDoctor, '#faDoctor');
    } else if($('#faDepartment').is(':focus')) {
      onChangeBorderChange($faDepartment, '#faDepartment');
    } else {
      onChangeBorderChange($faDate, '#faDate');
    }
  });

  $('#faName').blur(function() {
    var $faName = $('#faName').val();
    reBorderColorBlur($faName, '#faName')
  });

  $('#faMail').blur(function() {
    var $faMail = $('#faMail').val();
    reBorderColorBlur($faMail, '#faMail')
  });

  $('#faPhone').blur(function() {
    var $faPhone = $('#faPhone').val();
    reBorderColorBlur($faPhone, '#faPhone')
  });

  $('#faDoctor').blur(function() {
    var $faDoctor = $('#faDoctor > option:selected').val();
    reBorderColorBlur($faDoctor, '#faDoctor')
  });

  $('#faDepartment').blur(function() {
    var $faDepartment = $('#faDepartment > option:selected').val();
    reBorderColorBlur($faDepartment, '#faDepartment')
  });

  $('#faDate').blur(function() {
    var $faDate = $('#faDate').datepicker('getDate');
    reBorderColorBlur($faDate, '#faDate')
  });

  $('#faSubmit').click(function() {
    var $faName = $('#faName').val();
    var $faMail = $('#faMail').val();
    var $faPhone = $('#faPhone').val();
    var $faDoctor = $('#faDoctor > option:selected').val();
    var $faDepartment = $('#faDepartment > option:selected').val();
    var $faDate = $('#faDate').datepicker('getDate');

    if(!reName.test($faName) || !reMail.test($faMail) || !rePhone.test($faPhone) || $faDoctor == "0" || $faDepartment == "0" || $faDate == null)  {
      $('#appointmentError')
      .html('Please correct errors before submitting this form.')
      .css({
        color: '#e35959',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(faeFadeOut, 3000);
    } else if(faSubmitted) {
      $('#appointmentError')
      .html('You have already submitted this form.')
      .css({
        color: '#e35959',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(faeFadeOut, 3000);
    } else {
      faSubmitted = true;

      $('#appointmentError')
      .html('Form submitted successfully, thank you.')
      .css({
        color: '#59e35c',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(faeFadeOut, 3000);

      appointment.name = $faName;
      appointment.mail = $faMail;
      appointment.phone = $faPhone;
      appointment.doctor = $faDoctor;
      appointment.department = $faDepartment;
      appointment.date = $faDate;

      $ajax({
        type: 'post',
        dataType: 'json',
        url: 'medically.r1stv.com/appointments.php',
        data: appointment
      });
    }
  });

  if($('#faDate').length > 0) {
    $('#faDate').datepicker({
      minDate: 0,
      maxDate: '+1y',
      showButtonPanel: true,
      beforeShow: function() {
        $(".ui-datepicker").css('font-size', '14px')
      }
    });
  }

  // ferquently asked questions

  $('#collapse > h2').hover(function() {
    $(this)
    .clearQueue()
    .animate({
      backgroundColor: '#17c0c3',
      borderColor: '#17c0c3',
      color: '#fff'
    }, 200);
  },
  function() {
    $(this)
    .clearQueue()
    .not('.faqActive')
    .animate({
      backgroundColor: '#eee',
      borderColor: '#ddd',
      color: '#444'
    }, 200);
  });

  $('#collapse > h2').click(function() {
    var $collapseh2 = $(this)

    $collapseh2
    .toggleClass('faqActive')
    .siblings('h2')
    .removeClass('faqActive');

    $collapseh2
    .next()
    .stop(true, true)
    .slideToggle(500)
    .css({
      borderColor: '#17c0c3'
    })
    .siblings('p')
    .slideUp()
    .css({
      borderColor: '#ddd'
    });

    $collapseh2
    .clearQueue()
    .animate({
      backgroundColor: '#17c0c3',
      borderColor: '#17c0c3',
      color: '#fff'
    }, 200)
    .siblings('h2')
    .clearQueue()
    .animate({
      backgroundColor: '#eee',
      borderColor: '#ddd',
      color: '#444'
    }, 200);
  });

  // doctors, comments, partners slideshow

  if($('#commSlideshow').length > 0 && $('#partSlideshow').length > 0 && $('#docSlideshow').length > 0) {
    $('#commSlideshow').slick();
    $('#partSlideshow').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
    });
    $('#docSlideshow').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false
    });
  }
      // doctors page

  if($('#doctorsDocSlideshow').length > 0) {
    $('#doctorsDocSlideshow').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      arrows: false
    });
  }

  // regular expressions for footer contact form

  $('#fcName, #fcMail, #fcMsg').keyup(function() {
    var $fcName = $('#fcName').val();
    var $fcMail = $('#fcMail').val();
    var $fcMsg = $('#fcMsg').val();

    if($('#fcName').is(':focus')) {
      reBorderColor(reName, $fcName, '#fcName');
    } else if($('#fcMail').is(':focus')) {
      reBorderColor(reMail, $fcMail, '#fcMail');
    } else {
      reBorderColor(reMsg, $fcMsg, '#fcMsg');
    }
  });

  $('#fcName').blur(function() {
    var $fcName = $('#fcName').val();
    reBorderColorBlur($fcName, '#fcName')
  });

  $('#fcMail').blur(function() {
    var $fcMail = $('#fcMail').val();
    reBorderColorBlur($fcMail, '#fcMail')
  });

  $('#fcMsg').blur(function() {
    var $fcMsg = $('#fcMsg').val();
    reBorderColorBlur($fcMsg, '#fcMsg')
  });

  $('#fcSubmit').click(function() {
    var $fcName = $('#fcName').val();
    var $fcMail = $('#fcMail').val();
    var $fcMsg = $('#fcMsg').val();

    if(!reName.test($fcName) ||  !reMail.test($fcMail) || !reMsg.test($fcMsg)) {
      $('#footerContactError')
      .html('Please correct errors before submitting this form.')
      .css({
        color: '#e35959',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(fceFadeOut, 3000);
    } else if(fcSubmitted) {
      $('#footerContactError')
      .html('You have already submitted this form.')
      .css({
        color: '#e35959',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(fceFadeOut, 3000);
    } else {
      fcSubmitted = true;

      $('#footerContactError')
      .html('Form submitted successfully, thank you.')
      .css({
        color: '#59e35c',
        display: 'none'
      })
      .stop(true, true)
      .fadeIn(300);

      setTimeout(fceFadeOut, 3000);
    }
  });

  // footer contact form submit button hover

  $('#footerContact > input[type="button"]').hover(function() {
    $(this).clearQueue().animate({backgroundColor: '#17c0c3'}, 200);
  }, function() {
    $(this).clearQueue().animate({backgroundColor: '#505456'}, 200);
  });

  // go to top

  $('.fsRight').click(function(){
		$('html, body').animate({scrollTop : 0}, 800);
	});

  // --- departments.html ---

  $('#leftSection > ul > li > a').hover(function() {
    $(this).clearQueue().animate({color: '#444'}, 200);
  }, function() {
    $(this).clearQueue().animate({color: '#fff'}, 200);
  });

});

// head slideshow

var hsNum = 1;

function headSlideshow() {
  var fileName = hsNum + '.jpg';
  var url = 'url(\'img/headSlideshow/' + fileName + '\')';
  if(hsNum < 3) {
    $('#headerSlideshow')
    .css('display', 'none')
    .fadeIn(1700)
    .css('background-image', url);
    hsNum++;
  } else {
    hsNum = 1;
    $('#headerSlideshow')
    .css('display', 'none')
    .fadeIn(1700)
    .css('background-image', url);
  }
  setTimeout(headSlideshow, 6700);
}

// departments change

function changeDps(selector) {
  $(selector)
  .stop(true, true)
  .addClass('activeDps')
  .css('display', 'none')
  .fadeIn(1000)
  .siblings('.dpsAbout')
  .removeClass('activeDps')
  .fadeOut();
}

// regular expressions border color on keyup

function reBorderColor(regExp, selectorValue, selector) {
  if(!regExp.test(selectorValue)) {
    $(selector)
    .clearQueue()
    .animate({
      borderColor: '#e35959'
    }, 300);
  } else {
    $(selector)
    .clearQueue()
    .animate({
      borderColor: '#59e35c'
    }, 300);
  }
}

// regular expressions border color on blur

function reBorderColorBlur(selectorValue, selector) {
  if(selectorValue == '' || selectorValue == '0' || selectorValue == null) {
    $(selector)
    .clearQueue()
    .animate({
      borderColor: '#505456'
    }, 300);
  }
}

// app form border color

function onChangeBorderChange(selectorValue, selector) {
  if(selectorValue == '0' || selectorValue == null) {
    $(selector)
    .clearQueue()
    .animate({
      borderColor: '#e35959'
    }, 300);
  } else {
    $(selector)
    .clearQueue()
    .animate({
      borderColor: '#59e35c'
    }, 300);
  }
}

// form error fade out

function fceFadeOut() {
  $('#footerContactError').fadeOut(2000);
}

function faeFadeOut() {
  $('#appointmentError').fadeOut(2000);
}
