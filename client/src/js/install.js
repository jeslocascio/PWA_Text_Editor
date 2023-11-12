const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

//An event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.removeAttribute('hidden');
});

//Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    console.log("CLICKED");
    const result = await promptEvent.userChoice;
    console.log(result);
    window.deferredPrompt = null;
    butInstall.setAttribute('hidden', true);
});

//An event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
    window.deferredPrompt = null;
});
    
