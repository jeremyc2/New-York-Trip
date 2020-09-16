let controller = null;

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

    if(document.location.origin == "https://jeremyc2.github.io") {
        var githubStylesheet = document.styleSheets.length - 1
        var styleRulesLength = document.styleSheets[githubStylesheet].rules.length
        if(document.styleSheets[githubStylesheet].href == null) {
            console.log("removing github stylesheet...")
            for(var x = 0; x < styleRulesLength; x++) {
                document.styleSheets[githubStylesheet].removeRule(x)
            }
        }
        // document.styleSheets[document.styleSheets.length - 1].disabled = true;
    }

    fetch("/cost")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById("total-cost").innerHTML = data;
        });

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