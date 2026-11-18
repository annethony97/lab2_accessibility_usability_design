// MPLS Dog Boarding: booking form validation demo

(function () {
  var form = document.getElementById('booking-form');
  var status = document.getElementById('form-status');
  var dropOff = document.getElementById('drop-off');
  var pickUp = document.getElementById('pick-up');
  var fields = [
    {
      input: document.getElementById('owner-name'),
      error: document.getElementById('owner-name-error'),
      requiredMessage: 'Enter your name.'
    },
    {
      input: document.getElementById('owner-email'),
      error: document.getElementById('owner-email-error'),
      requiredMessage: 'Enter your email address.'
    },
    {
      input: document.getElementById('dog-name'),
      error: document.getElementById('dog-name-error'),
      requiredMessage: "Enter your dog's name."
    },
    {
      input: dropOff,
      error: document.getElementById('drop-off-error'),
      requiredMessage: 'Choose a drop-off date.'
    },
    {
      input: pickUp,
      error: document.getElementById('pick-up-error'),
      requiredMessage: 'Choose a pick-up date.'
    }
  ];

  function localDateString(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function todayString() {
    return localDateString(new Date());
  }

  function updateDateLimits() {
    var today = todayString();
    dropOff.min = today;
    pickUp.min = dropOff.value && dropOff.value > today ? dropOff.value : today;
  }

  function clearError(field) {
    field.error.textContent = '';
    field.error.hidden = true;
    field.input.removeAttribute('aria-invalid');
  }

  function showError(field, message) {
    field.error.textContent = message;
    field.error.hidden = false;
    field.input.setAttribute('aria-invalid', 'true');
  }

  fields.forEach(function (field) {
    field.input.addEventListener('input', function () {
      clearError(field);
      status.textContent = 'This demo validates your request but does not send it.';
    });
    field.input.addEventListener('change', function () {
      clearError(field);
      updateDateLimits();
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';
    fields.forEach(clearError);
    updateDateLimits();

    var firstInvalid = null;
    fields.forEach(function (field) {
      var input = field.input;
      var message = '';

      if (!input.value.trim()) {
        message = field.requiredMessage;
      } else if (input === document.getElementById('owner-email') && input.validity.typeMismatch) {
        message = 'Enter an email like name@example.com.';
      } else if (input === dropOff && input.value < todayString()) {
        message = 'Choose today or a future date for drop-off.';
      } else if (input === pickUp && dropOff.value && input.value < dropOff.value) {
        message = 'Choose a pick-up date on or after the drop-off date.';
      }

      if (message) {
        showError(field, message);
        if (!firstInvalid) {
          firstInvalid = input;
        }
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Replace this simulated success with the real Node.js request in the next module.
    status.textContent = 'Request validated. This demo did not send it; the live service would reply within one business day.';
  });

  updateDateLimits();
})();
