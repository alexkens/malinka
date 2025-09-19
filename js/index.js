// content.json
async function getJSON() {
    const url = "./media/content.json"
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const content = await response.json();
        return content;
    } catch (error) {
        console.error(error.message);
    }
}

// on load
$.when( $.ready ).then(async function() {
    const content = await getJSON();

    // hero
    const firstImg =  "media/img/hero.png";
    $( "#hero-carousel" ).prop("src", firstImg);
    $( "#hero-carousel" ).css("animation", "fadein 3s");

    heroCarouselTrigger();

    memberCarouselInit(content);
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
    CarouselClickListener("#hero-wrapper");
    setInterval(heroCarouselR, 8000);
}


// ----------------new member carousel ----------------------------
var state = {
    currIndex: 0,
    prevIndex: -1,
    intervalId: 0,
};

function findState() {
    const ul = $( "#member-carousel" );

    // if()
}

function carouselStep(content, automatic=false) {
    // update state
    state.prevIndex = state.currIndex;
    state.currIndex = index;

    const memberName = content["profiles"][state.currIndex]["name"];
    const memberInstrument = content["profiles"][state.currIndex]["instrument"];
    const memberBio = content["profiles"][state.currIndex]["bio"];
    const memberImg = content["profiles"][state.currIndex]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

    changeElement(".members-inner", "opac");

    $( `#member-carousel .${state.currIndex}` ).addClass("text-white");
    if(state.prevIndex != -1) {
        $( `#member-carousel .${state.prevIndex}` ).removeClass("text-white");
    }

    if(automatic) {
        state.prevIndex = state.currIndex;
        if(state.currIndex == 3) {
            state.currIndex = 0;
        } else {
            state.currIndex++;
        }
    }
}

function automatic(content) {
    intervalId ??= setInterval(() => {
         carouselStep(content, true);
    }, 5000);
}

function arrowR(content) {
    $( ".member-arrowR" ).on("click", function() {
        // stop carousel
        clearInterval(intervalId);
        intervalId = null;

        // go one step into right direction
        carouselStep(content, );
    });
}










// ----------------new member carousel ----------------------------






// member carousel init
function memberCarouselInit(content) {

    const memberName = content["profiles"][0]["name"];
    const memberInstrument = content["profiles"][0]["instrument"];
    const memberBio = content["profiles"][0]["bio"];
    const memberImg = content["profiles"][0]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

    changeElement(".members-inner", "opac");

    $( `#member-carousel .${0}` ).addClass("text-white");
}

// member carousel functionality
let intervalId;
function memberCarouselTrigger(content) {

    CarouselClickListener("#members");
    arrowRClickListener(content);

    var memberIndex = 0;
    intervalId ??= setInterval(() => {
        memberIndex = memberCarousel(memberIndex, content);
    }, 5000);
}

function arrowRClickListener(content) {
    $( ".member-arrowR" ).on("click", function() {
        clearInterval(intervalId);
        intervalId = null;
        memberCarousel(memberIndex, content);
    });
}

function memberCarousel(memberIndex, content) {

    let previousIndex = memberIndex;
    memberIndex++;
    if(memberIndex > 3) {
        memberIndex = 0;
    }

    const memberName = content["profiles"][memberIndex]["name"];
    const memberInstrument = content["profiles"][memberIndex]["instrument"];
    const memberBio = content["profiles"][memberIndex]["bio"];
    const memberImg = content["profiles"][memberIndex]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

    changeElement(".members-inner", "opac");

    $( `#member-carousel .${memberIndex}` ).addClass("text-white");
    $( `#member-carousel .${previousIndex}` ).removeClass("text-white");

    return memberIndex;
}

function changeElement(id, animation) {
    const wrapper = $( id );
    wrapper.removeClass(animation);
    const offsetWidth = wrapper[0].offsetWidth; // force reflow
    wrapper.addClass(animation);
}

function CarouselClickListener(carouselId){
    $( carouselId ).on("click", function() {
        clearInterval(intervalId);
        intervalId = null;
    });
}