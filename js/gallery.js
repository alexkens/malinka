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
        "img0.jpg",
    ];

    for(let index in videoList) {
        const src = `media/video/${videoList[index]}`;
        if(index == 0) {
            const v = `<div class=""><video class="w-130 shadow-md  rounded-lg" src=${src} controls muted autoplay></video></div>`;
            video.append(v);
        } else {
            const v = `<div class=""><video class="w-130 shadow-md rounded-lg" src=${src} controls></video></div>`;
            video.append(v);
        }
    }

    for(let index in imgList) {
        const src = `media/img/${imgList[index]}`;
        const v = `<div class="">
                        <img class="w-130 shadow-md rounded-lg" src=${src} alt="">
                    </div>`;
        img.append(v);
    }

});