// on load
$.when( $.ready ).then(async function() {

    // content.json
    const url = "./media/content.json"
    const response = await fetch(url);
    const content = await response.json();

    // hero
    const firstImg =  "media/img/hero.png";
    $( "#hero-carousel" ).prop("src", firstImg);
    $( "#hero-carousel" ).css("animation", "fadein 3s");

    // hero carousel
    heroCarouselTrigger();

    // member
    const memberName = content["profiles"]["0"]["name"];
    const memberInstrument = content["profiles"]["0"]["instrument"];
    const memberBio = content["profiles"]["0"]["bio"];
    const memberImg = content["profiles"]["0"]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

    // footer
    const number = content["contact"]["number"];
    const email = content["contact"]["email"];
    const facebookLink = content["contact"]["facebook-link"];
    $( "#footer-tel" ).text(number);
    $( "#footer-email" ).text(email);
    $( '#facebook-link' ).prop("href", facebookLink);
});

// header
$("#sidebar-toggle").on("click", function() {

    let aside = $( "#aside aside" );
    
    if(aside.length == 0) {

        $( "#aside" ).load("aside.html");

    } else {

        if(aside.css("display") === "none") {
            aside.css("display", "block");
        } else { // display != none
            aside.css("display", "none");
        }
    }
});

// hero carousel
const imgList = [
    "hero.png",
    "img3.jpg",
    "img5.jpg",
    "img6.jpg",
    "img8.jpg",
];
var index = 1;

function heroCarousel(index, add) {

    if(index > imgList.length-1) {
        index = 0;
    }
    if(index < 0) {
        index = imgList.length-1;
    }

    $hero = $( "#hero-wrapper" );
    $heroCarousel = $( "#hero-carousel" );
    $heroCarousel.prop("src", `media/img/${imgList[index]}`);
    
    $heroCarousel.css("animation", "none");
    $hero.css("animation", "none");
    const offsetWidth = $heroCarousel[0].offsetWidth; // force reflow

    if(add == 1) {
        $heroCarousel.css("animation", "fadeinR 2s");
        $hero.css("animation", "blur 1.5s");
    } else {
        $heroCarousel.css("animation", "fadeinL 2s");
        $hero.css("animation", "blur 1.5s");
    }

    return index + add;
}

function heroCarouselR() {
    index = heroCarousel(index, 1);
}

function heroCarouselL() {
    index = heroCarousel(index, -1);
}

// actual carousel functionality
function heroCarouselTrigger() {
    setInterval(heroCarouselR, 8000);
}

// member
function memberCarousel() {
    const list = [
        "tatjana.jpg",
        "vadim.jpg",
        "larissa.jpg",
        "marek.jpg",
    ];
}