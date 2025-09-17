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
    contactForm();
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


function contactForm() {
    const form = $( "footer div input" );

    form.on('click', () => {
        
    });
}
