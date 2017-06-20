  function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }

  $(function() {
      $('.city-contacts__select').select2({
          minimumResultsForSearch: Infinity
      });

      $('.modal-select#city').select2({
          minimumResultsForSearch: Infinity,
          width: '100%',
          placeholder: 'Выберите город'
      });

      $('.modal-select#type').select2({
          minimumResultsForSearch: Infinity,
          width: '100%',
          placeholder: 'Выберите тип услуги'
      });

      $('.modal-select#subject').select2({
          minimumResultsForSearch: Infinity,
          width: '100%',
          placeholder: 'Выберите наиболее подходящую тему'
      });

      function adaptive() {
          if ($(window).width() <= 991) {
              $('.info-content-slider').on('initialized.owl.carousel', function(event) {
                  if (!($('.info-content-inner-container.owl-loaded').length)) {
                      $('.info-content-inner-container').owlCarousel({
                          items: 1,
                          autoHeight: true,
                          onTranslated: function() {
                              setTimeout(function() {
                                  $('.info-content-slider').trigger('refresh.owl.carousel');
                              }, 200);
                          }
                      });
                  }
              });

              if (collision($('.mobile-menu-wrapper'), $('.mobile-menu-bottom'))) {
                  $('.mobile-menu-bottom').addClass('mobile-menu-bottom--static');
              } else {
                  $('.mobile-menu-bottom').removeClass('mobile-menu-bottom--static');
              }
          }
      }

      adaptive();

      $(window).resize(adaptive);

      $('.main-slider').owlCarousel({
          items: 1,
          dots: true,
          arrows: true,
          nav: true,
          navText: ["<img src='img/icons/slider-arrow-left.png' alt='' />", "<img src='img/icons/slider-arrow-right.png' alt='' />"]
      });

      $('.offers-content-slider, .info-content-slider, .modal-content-slider').owlCarousel({
          items: 1,
          autoHeight: true,
          animateOut: 'fadeOut',
          mouseDrag: false,
          touchDrag: false
      });

      $('.offer-trigger').click(function() {
          $(this).addClass('offer-trigger--active').siblings().removeClass('offer-trigger--active');
          $('.offers-content-slider').trigger('to.owl.carousel', [$(this).attr('data-offer'), 0]);
      });


      $('.info-trigger').click(function() {
          $(this).addClass('info-trigger--active').siblings().removeClass('info-trigger--active');
          $('.info-content-slider').trigger('to.owl.carousel', [$('.info-content[data-type=' + $(this).attr('data-type') + ']').parent().index(), 0]);
      });

      $('.modal-trigger').click(function() {
          $(this).addClass('modal-trigger--active').siblings().removeClass('modal-trigger--active');
          $('.modal-content-slider').trigger('to.owl.carousel', [$('.modal-content-wrapper[data-form=' + $(this).attr('data-form') + ']').parent().index(), 0]);
      });

      var infoObj = {
          "news": [{
              "link": "http://google.com",
              "title": "«ПРОСТОР Телеком» приступает к оказанию услуг телефонии в Пензе",
              "content": "Корпоративные клиенты в Пензе теперь могут приобрести городские телефонные номера у оператора связи \"ПРОСТОР Телеком\"",
              "date": "7 ноября 2014"
          }, {
              "link": "http://google.com",
              "title": "Компания «ПРОСТОР Телеком» отмечает свой день рождения",
              "content": "17 лет назад в Петербурге была основана компания \"ПРОСТОР Телеком\". За эти годы компания  из небольшого интернет-провайдера превратилась в универсального оператора связи федерального масштаба.",
              "date": "14 ноября 2014"
          }, {
              "link": "http://google.com",
              "title": "Осенью подключение пакета «Интернет + Телефон» бесплатно!",
              "content": "С 15 сентября корпоративные клиенты в Пензе могут бесплатно подключить пакет \"Интернет + Телефон\"",
              "date": "21 ноября 2014"
          }],
          "publications": [{
              "link": "http://google.com",
              "title": "«ПРОСТОР Телеком» приступает к оказанию услуг телефонии в Пензе",
              "content": "Корпоративные клиенты в Пензе теперь могут приобрести городские телефонные номера у оператора связи \"ПРОСТОР Телеком\"",
              "date": "7 ноября 2014"
          }, {
              "link": "http://google.com",
              "title": "Компания «ПРОСТОР Телеком» отмечает свой день рождения",
              "content": "17 лет назад в Петербурге была основана компания \"ПРОСТОР Телеком\". За эти годы компания  из небольшого интернет-провайдера превратилась в универсального оператора связи федерального масштаба.",
              "date": "14 ноября 2014"
          }, {
              "link": "http://google.com",
              "title": "Осенью подключение пакета «Интернет + Телефон» бесплатно!",
              "content": "С 15 сентября корпоративные клиенты в Пензе могут бесплатно подключить пакет \"Интернет + Телефон\"",
              "date": "21 ноября 2014"
          }]
      };


      $('[data-ajax-btn]').click(function() {
          var that = $(this);
          for (category in infoObj) {
              infoObj[category].forEach(function(obj, index) {
                  $('.info-content[data-type=' + that.attr('data-ajax-btn') + '] .info-content-inner-container').append('<div class="col-md-4">' +
                      '<article class="info-article">' +
                      '<a href="' + obj.title + '" class="info-article__title">' +
                      obj.title +
                      '</a>' +
                      '<p class="info-article__text">' +
                      obj.content +
                      '</p>' +
                      '<p class="info-article__date">' +
                      obj.date +
                      '</p>' +
                      '</article>',
                      '</div>');
              });
          }

          $('.info-content-slider').trigger('refresh.owl.carousel');
      });

      $('.mobile-menu-trigger, .mobile-menu-close').click(function() {
          $('.mobile-menu').toggleClass('mobile-menu--active');
          $('body').toggleClass('prevent-scroll');
      });

      $('.mobile-cities-trigger, .mobile-cities-close').click(function() {
          $('.mobile-cities').toggleClass('mobile-cities--active');
      });

      $('.mobile-search-trigger, .mobile-search-close').click(function() {
          $('.mobile-search').toggleClass('mobile-search--active');
      });

  });
