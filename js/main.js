/* =========================================================
   Pro Merchant Savings — Site scripts
   Vanilla JS · no dependencies · no external services
   ========================================================= */
(function () {
  'use strict';

  var BUSINESS_EMAIL = 'promerchantsavings@gmail.com';
  var LEAD_ENDPOINT = '/api/ghl-lead';

  /* ---------------- Mobile navigation ---------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) close();
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var nodes = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = year;
  }

  /* ---------------- FAQ: one open at a time ---------------- */
  function initFaq() {
    var groups = document.querySelectorAll('[data-faq]');
    for (var g = 0; g < groups.length; g++) {
      (function (group) {
        var items = group.querySelectorAll('details');
        for (var i = 0; i < items.length; i++) {
          items[i].addEventListener('toggle', function () {
            if (!this.open) return;
            for (var j = 0; j < items.length; j++) {
              if (items[j] !== this) items[j].removeAttribute('open');
            }
          });
        }
      })(groups[g]);
    }
  }

  /* ---------------- Quote / contact form ---------------- */
  function fieldWrap(input) {
    return input.closest('.field') || input.parentNode;
  }

  function setError(input, message) {
    var wrap = fieldWrap(input);
    var slot = wrap.querySelector('.error');
    if (message) {
      wrap.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
      if (slot) slot.textContent = message;
    } else {
      wrap.classList.remove('has-error');
      input.removeAttribute('aria-invalid');
      if (slot) slot.textContent = '';
    }
  }

  function validateField(input) {
    var value = (input.value || '').trim();
    var name = input.getAttribute('data-label') || input.name || 'This field';

    if (input.hasAttribute('required') && !value) {
      setError(input, name + ' is required.');
      return false;
    }
    if (value && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
      setError(input, 'Please enter a valid email address.');
      return false;
    }
    if (value && input.type === 'tel') {
      var digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        setError(input, 'Please enter a 10-digit phone number.');
        return false;
      }
    }
    setError(input, '');
    return true;
  }

  function showStatus(box, type, html) {
    if (!box) return;
    box.className = 'form-status is-visible is-' + type;
    box.innerHTML = html;
    box.setAttribute('role', 'status');
  }

  function splitName(full) {
    var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { first: '', last: '' };
    if (parts.length === 1) return { first: parts[0], last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  }

  function bindForm(form) {
    var status = form.querySelector('.form-status') || document.getElementById('form-status');
    var submitBtn = form.querySelector('[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.innerHTML : '';
    var formName = form.getAttribute('data-form-name') ||
      (document.title ? document.title.split('|')[0].trim() + ' Form' : 'Website Form');
    var fields = form.querySelectorAll('input[required], input[type="email"], input[type="tel"], select[required], textarea[required]');
    var sending = false;

    for (var i = 0; i < fields.length; i++) {
      (function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
          if (fieldWrap(field).classList.contains('has-error')) validateField(field);
        });
      })(fields[i]);
    }

    function busy(on) {
      sending = on;
      if (!submitBtn) return;
      submitBtn.disabled = on;
      submitBtn.innerHTML = on ? 'Sending&hellip;' : submitLabel;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (sending) return;

      // Honeypot: silently ignore bots.
      var hp = form.querySelector('[name="company-website"]');
      if (hp && hp.value) return;

      var valid = true;
      var firstBad = null;
      for (var k = 0; k < fields.length; k++) {
        if (!validateField(fields[k])) {
          valid = false;
          if (!firstBad) firstBad = fields[k];
        }
      }

      if (!valid) {
        showStatus(status, 'error', 'Please correct the highlighted fields, or simply call <a href="tel:+16144191601">(614) 419-1601</a> and we will take your details over the phone.');
        if (firstBad) firstBad.focus();
        return;
      }

      var get = function (n) {
        var el = form.elements[n];
        return el && el.value ? String(el.value).trim() : '';
      };
      var checked = function (n) {
        var el = form.elements[n];
        return !!(el && el.checked);
      };

      var fullName = get('name');
      var parts = splitName(fullName);

      var payload = {
        formName: formName,
        name: fullName,
        firstName: parts.first,
        lastName: parts.last,
        phone: get('phone'),
        email: get('email'),
        message: get('message'),
        business: get('business'),
        industry: get('industry'),
        volume: get('volume'),
        processor: get('processor'),
        preferred: get('preferred'),
        consent: checked('consent'),
        pageUrl: window.location.href
      };

      busy(true);
      showStatus(status, 'info', 'Sending your request&hellip;');

      var request = window.fetch
        ? window.fetch(LEAD_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(function (response) {
            if (!response.ok) throw new Error('Request failed');
            return response;
          })
        : Promise.reject(new Error('fetch unavailable'));

      request.then(function () {
        busy(false);
        showStatus(
          status,
          'success',
          '<strong>Thank you &mdash; your request has been received.</strong><br>' +
          'We have your details and a specialist will reply within one business day. ' +
          'Need answers sooner? Call <a href="tel:+16144191601">(614) 419-1601</a>.'
        );
        form.reset();
        for (var r = 0; r < fields.length; r++) setError(fields[r], '');
      }).catch(function () {
        busy(false);
        showStatus(
          status,
          'error',
          '<strong>Sorry &mdash; we could not send your request.</strong><br>' +
          'Please call <a href="tel:+16144191601">(614) 419-1601</a> or email ' +
          '<a href="mailto:' + BUSINESS_EMAIL + '">' + BUSINESS_EMAIL + '</a> and we will take your details directly.'
        );
      });
    });
  }

  function initForm() {
    var forms = document.querySelectorAll('form[data-form-name], #quote-form');
    var seen = [];
    for (var i = 0; i < forms.length; i++) {
      if (seen.indexOf(forms[i]) !== -1) continue;
      seen.push(forms[i]);
      bindForm(forms[i]);
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) targets[i].style.opacity = '1';
      return;
    }

    for (var j = 0; j < targets.length; j++) {
      targets[j].style.opacity = '0';
      targets[j].style.transform = 'translateY(16px)';
      targets[j].style.transition = 'opacity .55s ease, transform .55s ease';
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

    for (var m = 0; m < targets.length; m++) io.observe(targets[m]);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initYear();
    initFaq();
    initForm();
    initReveal();
  });
})();
