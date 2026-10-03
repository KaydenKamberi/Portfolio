(function () {
  "use strict";
  var form = document.querySelector('form[name="contact"]');
  if (!form) return;

  // Native HTML validation remains available when JavaScript is disabled.
  form.noValidate = true;
  var phone = form.elements.namedItem("phone");
  var message = form.elements.namedItem("message");
  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector(".contact-status");
  var submissionError = document.getElementById("submit-error");
  var counter = document.getElementById("message-count");
  var names = ["name", "email", "phone", "business", "project_type", "contact_pref", "message"];
  var sending = false;

  function preference() {
    var checked = form.querySelector('input[name="contact_pref"]:checked');
    return checked ? checked.value : "";
  }

  function updatePhone() {
    phone.required = preference() === "Text" || preference() === "Call";
    document.getElementById("phone-label").textContent = phone.required ? "*" : "(optional)";
  }

  function validate(name) {
    var field = form.elements.namedItem(name);
    var value = name === "contact_pref" ? preference() : field.value.trim();
    var error = "";
    switch (name) {
      case "name":
        if (value.length < 2 || value.length > 80) error = "Enter your name using 2–80 characters.";
        break;
      case "email":
        if (!value || field.validity.typeMismatch) error = "Enter a valid email address.";
        break;
      case "phone":
        if (!value && phone.required) error = "Enter your phone number so I can text or call you.";
        else if (value && !/^\d{10}$/.test(value.replace(/[\s()-]/g, ""))) error = "Enter a 10-digit phone number.";
        break;
      case "business":
        if (value.length > 100) error = "Keep the business name to 100 characters or fewer.";
        break;
      case "project_type":
        if (!["New website", "Redesign", "One-page site", "Not sure yet"].includes(value)) error = "Choose what you need.";
        break;
      case "contact_pref":
        if (!["Email", "Text", "Call"].includes(value)) error = "Choose Email, Text, or Call.";
        break;
      case "message":
        if (value.length < 10 || field.value.length > 1000) error = "Write 10–1,000 characters about your project.";
        break;
    }
    var errorNode = form.querySelector('[data-error-for="' + name + '"]');
    errorNode.textContent = error;
    errorNode.hidden = !error;
    var controls = form.querySelectorAll('[name="' + name + '"]');
    controls.forEach(function (control) {
      if (error) control.setAttribute("aria-invalid", "true");
      else control.removeAttribute("aria-invalid");
    });
    return !error;
  }

  function updateCounter() {
    counter.hidden = false;
    counter.textContent = message.value.length + " / 1,000";
  }

  names.forEach(function (name) {
    form.querySelectorAll('[name="' + name + '"]').forEach(function (field) {
      field.addEventListener("blur", function () { validate(name); });
      field.addEventListener("input", function () {
        if (field.hasAttribute("aria-invalid")) validate(name);
      });
    });
  });
  form.querySelectorAll('input[name="contact_pref"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      updatePhone();
      validate("contact_pref");
      if (phone.hasAttribute("aria-invalid")) validate("phone");
    });
  });
  message.addEventListener("input", updateCounter);
  updatePhone();
  updateCounter();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending) return;
    submissionError.hidden = true;
    updatePhone();
    var valid = names.map(validate).every(Boolean);
    if (!valid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    sending = true;
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "Sending your message.";
    try {
      var response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error("Submission failed");
      window.location.assign("/thanks/");
    } catch (error) {
      submissionError.hidden = false;
      status.textContent = "";
      button.disabled = false;
      button.textContent = "Send message";
      sending = false;
    }
  });
})();