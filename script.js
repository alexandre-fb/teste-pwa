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
