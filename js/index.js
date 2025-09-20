// content.json
async function getJSON() {
    const url = window.jsonURL;
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

    listItemClickListener(content);
    initMember();
    automatic();
    stopMemberCarousel();
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

function CarouselClickListener(carouselId){
    $( carouselId ).on("click", function() {
        clearInterval(intervalId);
        intervalId = null;
    });
}


// ----------------new member carousel ----------------------------
var state = {
    currIndex: -1,
    prevIndex: -1,
    intervalId: null,
};

async function carouselStep(automatic=false, newIndex=null) {

    const content = await getJSON();
    
    if(automatic) {
        state.prevIndex = state.currIndex;
        if(state.currIndex == 3 || state.currIndex > 3 || state.currIndex < 0) {
            state.currIndex = 0;
        } else {
            state.currIndex++;
        }
    } else {
        if(newIndex != null && newIndex >= 0 && newIndex <= 3) {
            state.prevIndex = state.currIndex;
            state.currIndex = newIndex;
        }
    }

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
}

function initMember() {
    carouselStep(true);
}

function automatic() {
    state.intervalId ??= setInterval(() => {
         carouselStep(true);
    }, 6000);
}

async function memberArrow(add) {
    const content = await getJSON();

    // stop carousel
    clearInterval(state.intervalId);
    state.intervalId = null;

    // get new index
    if(state.currIndex + add > 3) {
        carouselStep(false, 0);
    } else if(state.currIndex + add < 0) {
        carouselStep(false, 3);
    } else {
        carouselStep(false, state.currIndex + add);
    }
}

function listItemClickListener(content) {
    $( "#member-carousel li" ).on("click", function() {
        // stop carousel
        clearInterval(state.intervalId);
        state.intervalId = null;

        // go the step
        carouselStep(false, parseInt(this.className));
    });
}

function changeElement(id, animation) {
    const wrapper = $( id );
    wrapper.removeClass(animation);
    const offsetWidth = wrapper[0].offsetWidth; // force reflow
    wrapper.addClass(animation);
}

function stopMemberCarousel(){
    $( "#members" ).on("click", function() {
        clearInterval(state.intervalId);
        state.intervalId = null;
    });
}