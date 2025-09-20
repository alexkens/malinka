// on load
$.when( $.ready ).then(async function() {

    // content.json
    const url = "./media/content.json"
    const response = await fetch(url);
    const content = await response.json();

    // load header
    $( "#header" ).load("partials/header.html");

    // load footer
    $( "#footer" ).load("partials/footer.html", function() {
        const number = content["contact"]["number"];
        const email = content["contact"]["email"];
        const facebookLink = content["contact"]["facebook-link"];

        $( "#footer-tel" ).text(number);
        $( "#footer-email" ).text(email);
        $( '#facebook-link' ).prop("href", facebookLink);

        
    });

    // footer contact form
    // contactForm();
});

// header
$(document).on("click", '#sidebar-toggle', function() {
    let aside = $( "#aside aside" );
    if(aside.length == 0) {
        $( "#aside" ).load("partials/aside.html");
    } else {
        if(aside.css("display") === "none") {
            aside.css("display", "block");
        } else { // display != none
            aside.css("display", "none");
        }
    }
});


$(document).on("click", "#lang", async function() {
    const lang = $(this).text();
    $(this).text(lang === "En" ? "De" : "En");
    
    const file = `${lang.toLowerCase()}.json`;
    const response = await fetch(file);
    const content = await response.json();

    const elements = $('[data-i18n]');
    elements.each(function(index, e) {
        let key = e.getAttribute("data-i18n");
        let value = content[key];
        $(this).text(value);
    });

});



/*

function darkmode() {

    const body = document.body;
    const darkmodeButton = document.getElementById("darkmodeButton");

    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        darkmodeButton.innerHTML = "Darkmode";

    } else {
        body.classList.add("dark");
        darkmodeButton.innerHTML = "Lightmode";
    }
}





*/