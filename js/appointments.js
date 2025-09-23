$.when( $.ready ).then(async function() {

    const url = window.jsonURL;
    const response = await fetch(url);
    const content = await response.json();
    const gigs = ["current", "archive"];

    for(let key in gigs) {
        const contentJSON = content["gigs"][gigs[key]];
        const contentARRAY = [];
        for(const k in contentJSON) {
            if(contentJSON.hasOwnProperty(k)) {
                contentARRAY.push(contentJSON[k]);
            }
        }

        for(let index=contentARRAY.length-1; index >= 0; index--) {
            const gig = contentARRAY.at(index);
            const date = gig["date"];
            const address = gig["address"];

            const appointment = `<div class="archive-date bg-slate-300 rounded-xl p-6  text-slate-700 shadow-md"><h3 class="font-bold">${date}</h3><p>${address}</p></div>`;

            $( `.${gigs[key]}-container` ).append(appointment);
        }
    }

    // visibility, with JQuery fadeTo and intersection observer api
    const observerOptions = {
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 0.01,
    };
    const observer = new IntersectionObserver(intersectHandler, observerOptions);
    function intersectHandler(entries, observer) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                $(entry.target).fadeTo("slow", 1);
                observer.unobserve(entry.target);
            } else {
                $(entry.target).fadeTo(1000, 0.2);
            }
        })
    }

    // elements to be faded in
    const elements = [$("#header"), $("#footer"), $("main h1"), $(".current-title"), $(".archive-title")];

    for(let index in elements) {
        
        if(elements[index].length === 0) {
            console.log(elements[index]);
        } else {
            elements[index].addClass("opacity-30");
            observer.observe(elements[index][0]);
        }
    }

    $(".archive-container .archive-date").each((_, e) => {
        e.classList.add("opacity-30");
        observer.observe(e);
    });
});