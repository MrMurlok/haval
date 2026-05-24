(function () {
  function initSliders() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.js-car-slider').forEach((slider) => {
      new Swiper(slider, {
        loop: false,
        speed: 450,
        allowTouchMove: true,
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });
    });
  }

  function initFancybox() {
    if (!window.jQuery || !jQuery.fancybox) return;

    jQuery('[data-fancybox]').fancybox({
      touch: false,
      smallBtn: true,
      buttons: [],
      animationEffect: 'zoom-in-out',
      backFocus: false,
    });
  }

  function initPhoneMask() {
    const input = document.querySelector('.js-phone-input');
    if (!input) return;

    input.addEventListener('input', () => {
      const numbers = input.value.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
      let result = '+7';
      const digits = numbers.startsWith('7') ? numbers.slice(1) : numbers;

      if (digits.length > 0) result += ' (' + digits.slice(0, 3);
      if (digits.length >= 3) result += ')';
      if (digits.length > 3) result += ' ' + digits.slice(3, 6);
      if (digits.length > 6) result += '-' + digits.slice(6, 8);
      if (digits.length > 8) result += '-' + digits.slice(8, 10);

      input.value = result;
    });
  }

  function initForms() {
    document.querySelectorAll('.js-request-form').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const success = form.querySelector('.js-form-success');
        const phone = form.querySelector('.js-phone-input');

        if (phone && phone.value.replace(/\D/g, '').length < 11) {
          phone.focus();
          phone.setAttribute('aria-invalid', 'true');
          return;
        }

        if (phone) phone.removeAttribute('aria-invalid');
        if (success) success.hidden = false;
        form.reset();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    initFancybox();
    initPhoneMask();
    initForms();
  });
})();
