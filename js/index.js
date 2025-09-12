// header

const x = $( "#logo" ).html();
console.log(x);


$("#sidebar-toggle").on("click", function() {

    $( "#aside" ).load("aside.txt");

    // $("aside").css("display", "block");
});