$.when( $.ready ).then(async function() {

    const video = $( ".video-container" );
    const img = $( ".img-container" );

    const videoList = [
        "file_1.mp4",
        "file_2.mp4",
        "file_3.mp4",
        "file_4.mp4",
        "file_5.mp4",
    ];

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

    for(let index in videoList) {
        const src = `media/video/${videoList[index]}`;
        if(index == 0) {
            const v = `<div class="mx-4"><video class="w-130 shadow-md  rounded-lg" src=${src} controls muted autoplay></video></div>`;
            video.append(v);
        } else {
            const v = `<div class="mx-4"><video class="w-130 shadow-md rounded-lg" src=${src} controls></video></div>`;
            video.append(v);
        }
    }

    for(let index in imgList) {
        const src = `media/img/${imgList[index]}`;
        const v = `<div class="relative hover:opacity-75">
                        <img class="img${index} w-130 shadow-md rounded-lg" src=${src} alt="">
                    </div>`;
        img.append(v);
    }

    // visibility, with JQuery fadeTo and intersection observer api
    const observerOptions = {
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 0.01,
    };
    const observer = new IntersectionObserver(intersectHandler, observerOptions);
    function intersectHandler(entries, observer) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                $(entry.target).fadeTo("slow", 1);
                observer.unobserve(entry.target);
            } else {
                $(entry.target).fadeTo(1000, 0.2);
            }
        })
    }

    // elements to be faded in
    const elements = [$("#header"), $("#footer"), $(".video-title"), $(".img-title")];

    for(let index in elements) {
        if(elements[index].length !== 0) {
            elements[index].addClass("opacity-30");
            observer.observe(elements[index][0]);
        }
    }

    $("video").each((_, e) => {
        e.classList.add("opacity-30");
        observer.observe(e);
    });
    $("img").each((_, e) => {
        e.classList.add("opacity-30");
        observer.observe(e);
    });
    
    galleryZoomViewListener(imgList);
});

function galleryZoomViewListener(imgList) {

    var currentImage = "";

    // svg listener
    const imgElements = $( ".img-container div" );
    imgElements.each((_, el) => {
        $(el)
            .on("mouseenter", function() {
                const svg = `<img class="zoom-svg w-10 absolute inline top-[45%] left-[45%]" src="media/svg/zoom-in-1462-svgrepo-com.svg">`;
                $(this ).append(svg);
            })
            .on("mouseleave", function() {
                $( ".zoom-svg" ).remove();
            });
    });

    // open overlay
    $( ".img-container div img" ).on("click", function() {
        $( "#overlay" ).removeClass("hidden");
        $( "#overlay" ).addClass("block");
        $( "#overlay-img" ).attr("src", $(this).attr("src"));

        currentImage = $(this)[0].classList[0];
    });    

    $( "#overlay-arrowL" ).on("click", function(e) {
        e.stopPropagation();

        const overlayImg = $( "#overlay-img" );
        let count = parseInt(currentImage.at(-1));
        count - 1 < 0 ? count = imgList.length - 1 : count--;
        currentImage = `img${count}`;
        updateViewImg(count, currentImage, overlayImg);
    });
    $( "#overlay-arrowR" ).on("click", function(e) {
        e.stopPropagation();

        const overlayImg = $( "#overlay-img" );
        let count = parseInt(currentImage.at(-1));
        count + 1 >= imgList.length ? count = 0 : count++;
        currentImage = `img${count}`;
        updateViewImg(count, currentImage, overlayImg);
    });

    // close overlay
    $( "#overlay" ).on("click", function() {
        $(this).addClass("hidden");
    });
}

function updateViewImg(count, currentImage, overlayImg) {
    const newSrc = `media/img/${currentImage}.jpg`;
    overlayImg.attr("src", newSrc);
}