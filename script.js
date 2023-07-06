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
  var saveBtn = document.getElementById('saveBtn');
  var messageElement = document.getElementById('message');
  var infoElement = document.getElementById('info');
  
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
    window.addEventListener('online', function() {
      handleConnectionChange();
      alert("Você ficou online e os dados podem ser enviados.");
    });
    window.addEventListener('offline', function() {
      handleConnectionChange();
      alert("Você ficou offline, os dados carregados só poderão ser enviados quando estiver online.");
    });
  
    handleConnectionChange();
  });
  
  function showCachedData() {
    var selectedFile = localStorage.getItem('selectedFile');
    var inputText = localStorage.getItem('inputText');
  
    if (selectedFile && inputText) {
      if (navigator.onLine) {
        messageElement.textContent = "Os dados podem ser enviados.";
      } else {
        messageElement.textContent = "Você está offline, assim que estiver online os dados podem ser enviados.";
      }
  
      infoElement.innerHTML = ""; // Limpa o conteúdo existente
  
        var infoContent = document.createElement('div');
        infoContent.innerHTML = "Arquivo selecionado: " + selectedFile + "<br><br>Texto digitado: " + inputText;


      infoElement.appendChild(infoContent);
    }
  }
  
  saveBtn.addEventListener('click', function() {
    var selectedFile = localStorage.getItem('selectedFile');
    var inputText = localStorage.getItem('inputText');
    
    if (selectedFile && inputText) {
      if (navigator.onLine) {
        messageElement.textContent = "Você está online, os dados podem ser enviados.";
      } else {
        messageElement.textContent = "Você está offline, assim que estiver online os dados podem ser enviados.";
      }
    }
  
    showCachedData();
  });
  