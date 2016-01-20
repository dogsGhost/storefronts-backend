(function (document) {
  var loginForm = document.querySelector('#loginForm');

  var reportError = function (msg) {
    var errorNode = document.createElement('p');
    errorNode.id = 'errorNode';
    errorNode.className = 'bg-danger message';
    errorNode.innerHTML = '<strong>' + msg + '</strong>';
    loginForm.parentNode.insertBefore(errorNode, loginForm);
  };

  var validateForm = function (e) {
    e.preventDefault();
    var fields = e.target.querySelectorAll('[name]');
    var results = validator([fields[0].value, fields[1].value]);

    if (!results.isValid) {
      if (!document.querySelector('#errorNode')) {
        reportError(results.errorMsg);
      }
    } else {
      e.target.submit();
    }
  };

  loginForm.addEventListener('submit', validateForm, false);
})(document);
