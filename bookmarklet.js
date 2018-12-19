document.addEventListener('keydown', function (e) {
  if (e.key.toLowerCase() == 'q' && e.ctrlKey) {
    const word = window.getSelection().toString().trim().toLowerCase();
    if (word.length === 0) return;
    if (!window.confirm(`Register "${word}" ?`)) return;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://localhost:8000/word');
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status == 200) { alert(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`word=${encodeURIComponent(word)}`);
    return xhr;
  }
});
alert('ok');