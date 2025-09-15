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

    // member carousel
    memberCarouselTrigger(content);
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

// member carousel functionality
function memberCarouselTrigger(content) {
    var memberIndex = 0;
    setInterval(() => {
        memberIndex = memberCarousel(memberIndex, content);
    }, 6000);
}

function memberCarousel(memberIndex, content) {
    memberIndex++;
    if(memberIndex >= 4) {
        memberIndex = 0
    }
    const memberName = content["profiles"][memberIndex]["name"];
    const memberInstrument = content["profiles"][memberIndex]["instrument"];
    const memberBio = content["profiles"][memberIndex]["bio"];
    const memberImg = content["profiles"][memberIndex]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

    $( `.${memberIndex}` ).addClass("text-white");

    return memberIndex;
}