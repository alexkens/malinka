// on load
$.when( $.ready ).then(async function() {

    // content.json
    const url = "./media/content.json"
    const response = await fetch(url);
    const content = await response.json();

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