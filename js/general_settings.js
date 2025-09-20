window.jsonURL = "./media/contentDe.json";

// on load
$.when( $.ready ).then(async function() {
    // mode
    if(localStorage.getItem("theme") === "dark") {
        $("html").addClass("dark");
        $("#mode").text("Light");
    }

    // content.json
    const url = window.jsonURL;
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

// change language
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

    // change json url, so member carousel (index.js) can change language too
    window.jsonURL = `./media/content${lang}.json`;
});

// darkmode
$(document).on("click", "#mode", function() {
    const html = $( "html" );
    const isDark = html.hasClass("dark");

    if(isDark) {
        html.removeClass("dark");
        $(this).text("Dark");
        localStorage.setItem("theme", "light");
        
    } else { // !isDark
        html.addClass("dark");
        $(this).text("Light");
        localStorage.setItem("theme", "dark");
    }
});