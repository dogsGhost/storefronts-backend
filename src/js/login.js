(function (window, document, undefined) {
  var loginForm = document.querySelector('#loginForm');

  var reportError = function () {
    var errorNode = document.createElement('strong');
    errorNode.id = 'errorNode';
    errorNode.className = 'bg-danger';
    var msg = 'Invalid username/password combination';

    errorNode.appendChild(document.createTextNode(msg));
    loginForm.parentNode.insertBefore(errorNode, loginForm);

  };

  var validateForm = function (e) {
    e.preventDefault();

    var fields = e.target.querySelectorAll('[name]');
    var valid = true;

    for (var i = 0, len = fields.length; i < len; i++) {
      if (/ +|\/+|<+|"+|'+/.test(fields[i].value)) {
        valid = false;
      }
    }

    if (!valid) {
      if (!document.querySelector('#errorNode')) {
        reportError();
      }
    } else {
      console.log('valid input values');
    }

  };

  loginForm.addEventListener('submit', validateForm, false);
})(window, document);
