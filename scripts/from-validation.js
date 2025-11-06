(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const form = document.getElementById('feedbackForm');
    if (!form) return; 

    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMsg');

    const fields = {
      name: {
        el: document.getElementById('name'),
        err: document.getElementById('nameError'),
        validate(value) {
          const v = value.trim();
          if (!v) return 'Введите имя.';
          const re = /^[A-Za-zА-Яа-яЁё\s-]{2,50}$/;
          if (!re.test(v)) return 'Имя: только буквы, пробелы и дефисы.';
        }
      },
      email: {
        el: document.getElementById('email'),
        err: document.getElementById('emailError'),
        validate(value) {
          const v = value.trim();
          if (!v) return 'Укажите адрес эл. почты.';
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!re.test(v)) return 'Укажите корректный адрес эл. почты.';
        }
      },
      message: {
        el: document.getElementById('message'),
        err: document.getElementById('messageError'),
        validate(value) {
          const v = value.trim();
          if (!v) return 'Введите сообщение.';
          if (v.length < 10) return 'Сообщение должно быть не короче 10 символов.';
          if (v.length > 1000) return 'Сообщение не должно превышать 1000 символов.';
        }
      }
    };

    function clearErrors() {
      Object.values(fields).forEach(({ el, err }) => {
        err.textContent = '';
        err.style.display = 'none';
        el.classList.remove('is-invalid');
      });
      successMsg.style.display = 'none';
    }

    function showError(el, errNode, text) {
      errNode.textContent = text;
      errNode.style.display = 'block';
      el.classList.add('is-invalid');
    }

    function validateAll() {
      clearErrors();
      let ok = true;
      for (const key in fields) {
        const { el, err, validate } = fields[key];
        const msg = validate(el.value);
        if (msg) {
          showError(el, err, msg);
          ok = false;
        }
      }
      return ok;
    }

    Object.values(fields).forEach(({ el }) => {
      el.addEventListener('input', () => {
        const { err, validate } = fields[el.id];
        const msg = validate(el.value);
        if (msg) {
          showError(el, err, msg);
        } else {
          err.textContent = '';
          err.style.display = 'none';
          el.classList.remove('is-invalid');
        }
        successMsg.style.display = 'none';
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateAll()) return;

      submitBtn.disabled = true;

      const formData = new FormData(form);
      const data = {
        name: formData.get('name')?.trim() || '',
        email: formData.get('email')?.trim() || '',
        message: formData.get('message')?.trim() || ''
      };

      try {
        form.reset();
        successMsg.style.display = 'block';
        setTimeout(() => (successMsg.style.display = 'none'), 3000);
      } catch (err) {
        alert('Не удалось отправить сообщение. Попробуйте позже.');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()