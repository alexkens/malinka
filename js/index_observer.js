// visibilty, with JQuery fadeTo and intersection observer api
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

// div, p, h2
$("div").each((_, e) => {
    e.classList.add("opacity-30");
    observer.observe(e);
});

/*
$("p").each((_, e) => {
    e.classList.add("opacity-30");
    observer.observe(e);
});
$("h2").each((_, e) => {
    e.classList.add("opacity-30");
    observer.observe(e);
});
*/