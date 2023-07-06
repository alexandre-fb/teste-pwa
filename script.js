if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function(error) {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }
  
  var fileInput = document.getElementById('file');
  var textInput = document.getElementById('text');
  
  fileInput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    localStorage.setItem('selectedFile', file.name);
  });
  
  textInput.addEventListener('input', function(event) {
    var text = event.target.value;
    localStorage.setItem('inputText', text);
  });
  
  function setStatus(status) {
    var statusElement = document.getElementById('status');
    statusElement.textContent = status;
  }
  
  function handleConnectionChange() {
    let status;
  
    if (navigator.onLine) {
      status = 'Estou online';
      showCachedData();
    } else {
      status = 'Estou offline';
      showCachedData();
    }
  
    setStatus(status);
  }
  
  window.addEventListener('load', function() {
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
  
    handleConnectionChange();
  });
  
  function showCachedData() {
    var selectedFile = localStorage.getItem('selectedFile');
    var inputText = localStorage.getItem('inputText');
  
    if (selectedFile && inputText) {
      alert("Arquivo selecionado: " + selectedFile + "\nTexto digitado: " + inputText);
    }
  }
  