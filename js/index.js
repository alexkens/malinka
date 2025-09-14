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