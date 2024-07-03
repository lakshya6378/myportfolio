if(navigator.serviceWorker){
        navigator.serviceWorker.register('service-worker.js')
      }


let beforeInstallEvent;

// Reference the install button from DOM.