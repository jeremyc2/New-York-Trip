if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("../serviceworker.js")
        .then(serviceWorkerRegistration => {
            console.log("Service Worker registered successfully :)")
        })
        .catch(error => {
            console.log("Could not register Service Worker :(")
            console.log(error)
        })
}

function scrollToSecondSlide() {
    document.querySelector('#second-slide').scrollIntoView({ 
        behavior: 'smooth' 
      });
}

document.addEventListener('DOMContentLoaded', () => {

    if(document.location.origin == "https://jeremyc2.github.io")
        document.styleSheets[document.styleSheets.length - 1].disabled = true;

    fetch("/cost")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById("total-cost").innerHTML = data;
        });

        let controller = new ScrollMagic.Controller();

        // May use Scrollmagic and GSAP
        new ScrollMagic.Scene({triggerElement: '#first-slide' , triggerHook: 'onLeave', offset: 100})
            .setClassToggle('.cue', 'hide')
            // .addIndicators({name: 'cue'})
            .addTo(controller);

})