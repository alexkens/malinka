window.jsonURL = "./media/contentDe.json";

// on load
$.when( $.ready ).then(async function() {
    // content.json
    const url = window.jsonURL;
    const response = await fetch(url);
    const content = await response.json();

    // load header
    $( "#header" ).load("partials/header.html", function() {
        // mode     
        let isDark = localStorage.getItem("theme") == "dark";
        setMode(isDark);    

        // language
        const savedLang = localStorage.getItem("language");
        setLanguage(savedLang);

        // fixed header when scrolling up
        fixedHeader();
    });

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
    const otherLanguage = lang === "En" ? "De" : "En";
    $(this).text(otherLanguage);
    setLanguage(lang);

    // set language item in local storage
    localStorage.setItem("language", lang);
});

async function setLanguage(lang) {
    // change toggle
    const otherLang = lang === "En" ? "De" : "En";
    $( "#lang" ).text(otherLang);

    // change json url, so member carousel (index.js) can change language too
    window.jsonURL = `./media/content${lang}.json`;

    // rest of html
    const file = `${lang.toLowerCase()}.json`;
    const response = await fetch(file);
    const content = await response.json();

    const elements = $('[data-i18n]');
    elements.each(function(_, e) {
        let key = e.getAttribute("data-i18n");
        let value = content[key];
        $(this).text(value);
    });
}

// darkmode
$(document).on("click", "#mode", function() {
    const html = $( "html" );
    const isDark = html.hasClass("dark");

    changeMode(isDark, html, "#mode");
});

function changeMode(isDark, html, element) {
    if(isDark) {
        html.removeClass("dark");
        $(element).text("Dark");
        localStorage.setItem("theme", "light");
        
    } else { // !isDark
        html.addClass("dark");
        $(element).text("Light");
        localStorage.setItem("theme", "dark");
    }
}

function setMode(isDark) {
    if(isDark) {
        $( "html" ).addClass("dark");
        $("#mode").text("Light");  
    } else { // !isDark
        $( "html" ).removeClass("dark");
        $("#mode").text("Dark");
    }
}

// fixed header when scrolling up
function fixedHeader() {
    $(window).on("scroll", throttle(validateHeader, 1000));
}

function throttle(func, time) {
    let lastTime = 0;
    return () => {
        const now = new Date();
        if(now - lastTime >= time) {
            func();
            time = now;
        }
    };
}

let lastScroll = 0;

function validateHeader() {
    const offset = $( "header" ).prop("scrollHeight") + 100;
    currentScroll = $(this).scrollTop();

    if(currentScroll < offset) {
        $( "header" ).removeClass("fixed");
        $( "header" ).addClass("relative");
    } else if(currentScroll >= lastScroll) {
        lastScroll = currentScroll;
        $( "header" ).removeClass("fixed");
        $( "header" ).addClass("relative");
    } else { // currentScroll < lastScroll
        lastScroll = currentScroll;
        $( "header" ).removeClass("relative");
        $( "header" ).addClass("fixed");
    }

}