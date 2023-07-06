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

function setStatus(status) {
    var statusElement = document.getElementById('status');
    statusElement.textContent = status;
}

window.addEventListener('load', function() {
    function handleConnectionChange() {
        var status = navigator.onLine ? 'Estou online' : 'Estou offline';
        setStatus(status);
    }

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    // Verificar o estado de conexão ao carregar a página
    handleConnectionChange();
});

//trata inputs
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

window.addEventListener('load', function() {
    if (navigator.onLine) {
      showCachedData();
    } else {
      window.addEventListener('online', showCachedData);
    }
  });
  
  function showCachedData() {
    var selectedFile = localStorage.getItem('selectedFile');
    var inputText = localStorage.getItem('inputText');
    
    if (selectedFile && inputText) {
      alert("Arquivo selecionado: " + selectedFile + "\nTexto digitado: " + inputText);
    }
  }
  

