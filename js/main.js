(function () {
  const RING_LENGTH = 251.2;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setProgress(element, current, max) {
    if (!element) return;

    const ratio = max > 0 ? clamp(current / max, 0, 1) : 0;
    element.style.strokeDasharray = String(RING_LENGTH);
    element.style.strokeDashoffset = String(RING_LENGTH - RING_LENGTH * ratio);
  }

  function formatNumber(value, withZero = true) {
    return withZero ? String(value).padStart(2, "0") : String(value);
  }

  function initCountdown() {
    const countdown = document.querySelector('[data-countdown]');
    if (!countdown) return;

    const deadline =
      Date.now() +
      8 * 24 * 60 * 60 * 1000 +
      8 * 60 * 60 * 1000 +
      56 * 60 * 1000 +
      28 * 1000;

    const fields = {
      days: countdown.querySelector('[data-time="days"]'),
      hours: countdown.querySelector('[data-time="hours"]'),
      minutes: countdown.querySelector('[data-time="minutes"]'),
      seconds: countdown.querySelector('[data-time="seconds"]'),
    };

    const progress = {
      days: countdown.querySelector('[data-progress="days"]'),
      hours: countdown.querySelector('[data-progress="hours"]'),
      minutes: countdown.querySelector('[data-progress="minutes"]'),
      seconds: countdown.querySelector('[data-progress="seconds"]'),
    };

    function render() {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      fields.days.textContent = String(days);
      fields.hours.textContent = formatNumber(hours, false);
      fields.minutes.textContent = formatNumber(minutes);
      fields.seconds.textContent = formatNumber(seconds);

      setProgress(progress.days, Math.min(days, 10), 10);
      setProgress(progress.hours, hours, 24);
      setProgress(progress.minutes, minutes, 60);
      setProgress(progress.seconds, seconds, 60);

      if (diff === 0) {
        clearInterval(timerId);
      }
    }

    render();
    const timerId = setInterval(render, 1000);
  }

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
    initCountdown();
    initSliders();
    initFancybox();
    initPhoneMask();
    initForms();
  });
})();
