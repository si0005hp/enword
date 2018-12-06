document.addEventListener('keydown', function (e) {
  if (e.key.toLowerCase() == 'q' && e.ctrlKey) {
    const enword = window.getSelection().toString();
    if (window.confirm(`Register "${enword}" ?`)) {
      console.log(enword);
    }
  }
});