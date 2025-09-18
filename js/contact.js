$( "#target" ).on("submit", function(event) {
    
    const nameVal = $("form #name").val() ?? "";
    const emailVal = $("form #email").val() ?? "";
    const telVal = $("form #tel").val() ?? "";
    const messageVal = $("form #message").val() ?? "";

    const body = `Name: ${nameVal}, Telefonnummer: ${telVal} Nachricht: ${messageVal}`;
    

    event.preventDefault(); // stops the form from reloading the page
});