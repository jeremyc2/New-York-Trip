let controller = null;
var basepath = "/"

if ('serviceWorker' in navigator) {
    if(document.location.hostname !== 'localhost') {
        basepath = "/New-York-Trip/"
    }
    navigator.serviceWorker.register(basepath + "serviceworker.js", {scope: basepath})
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

    if(navigator.serviceWorker.controller != null) {
        fetch(basepath + "cost")
            .then(response => {
                return response.text();
            })
            .then(data => {
                document.getElementById("total-cost").innerHTML = data;
            });
    }

    gsap.registerPlugin(CSSRulePlugin)

    controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({triggerElement: '#first-slide' , triggerHook: 'onLeave', offset: 100})
        .setClassToggle('.cue', 'hide')
        // .addIndicators({name: 'cue'})
        .addTo(controller);

})

window.addEventListener('load', () => {

        // https://greensock.com/docs/v3/Plugins/CSSRulePlugin
        // var rule = CSSRulePlugin.getRule("#second-slide::before");

        // new ScrollMagic.Scene({triggerElement: '#second-slide' , triggerHook: 'onEnter', offset: 100, duration: 500})
        //     .setTween(rule, {cssRule: {filter: "brightness(100%)"}})
        //     // .addIndicators({name: 'fade second slide'})
        //     .addTo(controller);


})