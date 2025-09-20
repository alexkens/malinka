$.when( $.ready ).then(async function() {

    const url = window.jsonURL;
    const response = await fetch(url);
    const content = await response.json();

    const gigs = ["current", "archive"];
    for(let key in gigs) {

        console.log(key);
        console.log(gigs[key]);

        const contentJSON = content["gigs"][gigs[key]];
        const contentARRAY = [];
        for(const k in contentJSON) {
            if(contentJSON.hasOwnProperty(k)) {
                contentARRAY.push(contentJSON[k]);
            }
        }

        for(let index=contentARRAY.length-1; index >= 0; index--) {
            const gig = contentARRAY.at(index);
            const date = gig["date"];
            const address = gig["address"];

            const appointment = `<div class="bg-slate-300 w-120 rounded-xl p-6  text-slate-700 shadow-md"><h3 class="font-bold">${date}</h3><p>${address}</p></div>`;

            $( `.${gigs[key]}-container` ).append(appointment);
        }
    }
});