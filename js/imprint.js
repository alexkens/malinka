$.when( $.ready ).then(function () {
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
    const elements = [$("#header"), $("#footer"), $("h1")];

    for(let index in elements) {
        
        if(elements[index].length === 0) {
            console.log(elements[index]);
        } else {
            elements[index].addClass("opacity-30");
            observer.observe(elements[index][0]);
        }
    }
    
    $("h2").each((_, e) => {
        e.classList.add("opacity-30");
        observer.observe(e);
    });
    $("p").each((_, e) => {
        e.classList.add("opacity-30");
        observer.observe(e);
    });
});