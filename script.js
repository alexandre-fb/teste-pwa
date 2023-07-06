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
      messageElement.classList.remove('offline');
    } else {
      status = 'Estou offline';
      showCachedData();
      messageElement.classList.add('offline');
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
        messageElement.textContent = "Está online, os dados podem ser enviados.";
      } else {
        messageElement.textContent = "Você está offline, assim que estiver online os dados podem ser enviados. Mas ainda pode selecionar arquivo e escrever que ficará armazenado no cache.";
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
        messageElement.textContent = "Você está offline, assim que estiver online os dados podem ser enviados. Mas ainda pode selecionar arquivo e escrever que ficará armazenado no cache.";
      }
    }
  
    showCachedData();
  });
  

// Verifica se a API Permission é suportada pelo navegador
if ('permissions' in navigator) {
    // Solicita permissão de câmera
    navigator.permissions.query({ name: 'camera' })
      .then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
          // Permissão já concedida
          openCamera();
        } else if (permissionStatus.state === 'prompt') {
          // A permissão ainda não foi concedida, exibe um botão para solicitar permissão
          var permissionButton = document.getElementById('permissionButton');
          permissionButton.style.display = 'block';
          permissionButton.addEventListener('click', function() {
            // Solicita permissão de câmera novamente
            navigator.permissions.request({ name: 'camera' })
              .then(function(newPermissionStatus) {
                if (newPermissionStatus.state === 'granted') {
                  // Permissão concedida
                  openCamera();
                } else {
                  // Permissão negada
                  console.log('A permissão de câmera foi negada pelo usuário.');
                }
              });
          });
        } else {
          // A permissão foi negada
          console.log('A permissão de câmera foi negada pelo usuário.');
        }
      })
      .catch(function(error) {
        console.log('Erro ao verificar a permissão de câmera:', error);
      });
  } else {
    console.log('A API Permission não é suportada neste navegador.');
  }

  // Função para abrir a câmera do usuário
  // Dentro da função openCamera()
function openCamera() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          var cameraPreview = document.getElementById('cameraPreview');
          cameraPreview.innerHTML = '<video id="cameraVideo" autoplay></video>';
  
          var videoElement = document.getElementById('cameraVideo');
          videoElement.srcObject = stream;
        })
        .catch(function(error) {
          console.log('Erro ao acessar a câmera:', error);
        });
    } else {
      console.log('A câmera não é suportada neste dispositivo.');
    }
  }


  function captureImage() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          var cameraPreview = document.getElementById('cameraPreview');
          cameraPreview.innerHTML = '<video id="cameraVideo" autoplay></video>';
  
          var videoElement = document.getElementById('cameraVideo');
          videoElement.srcObject = stream;
  
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
  
          videoElement.addEventListener('loadedmetadata', function() {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
  
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
            canvas.toBlob(function(blob) {
              var imageUrl = URL.createObjectURL(blob);
              console.log('imageUrl', imageUrl)
              localStorage.setItem('capturedImage', imageUrl);
              console.log('Imagem capturada e salva no cache.');
  
              var imagePreview = document.getElementById('imagePreview');
            //   imagePreview.innerHTML = ''; // Limpa o conteúdo existente
  
              var imageElement = document.createElement('img');
              imageElement.src = imageUrl;
              imagePreview.appendChild(imageElement);
            }, 'image/jpeg', 0.8);
          });
        })
        .catch(function(error) {
          console.log('Erro ao acessar a câmera:', error);
        });
    } else {
      console.log('A câmera não é suportada neste dispositivo.');
    }
  }
  


  