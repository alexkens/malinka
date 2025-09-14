// on load
$.when( $.ready ).then(async function() {

    // content.json
    const url = "./media/content.json"
    const response = await fetch(url);
    const content = await response.json();

    // hero
    const firstImg =  "media/img/hero.png";
    $( "#hero-carousel img" ).prop("src", firstImg);

    // member
    const memberName = content["profiles"]["0"]["name"];
    const memberInstrument = content["profiles"]["0"]["instrument"];
    const memberBio = content["profiles"]["0"]["bio"];
    const memberImg = content["profiles"]["0"]["img"];

    $( ".member-name" ).text(memberName);
    $( ".member-instrument" ).text(memberInstrument);
    $( ".member-text" ).text(memberBio);
    $( ".member-img" ).prop("src", memberImg);

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
    "img0.jpg",
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
];
var index = 0;

function heroCarouselRight() {

    $( "#hero-carousel img" ).prop("src", `media/img/${imgList[index]}`);
    if(index + 1 == imgList.length) {
        index = 0;
    } else {
        index++;
    }
}
function heroCarouselLeft() {

    $( "#hero-carousel img" ).prop("src", `media/img/${imgList[index]}`);
    if(index - 1 == -1) {
        index = imgList.length - 1;
    } {
        index--;
    }
}