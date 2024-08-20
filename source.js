let musics = [
    {
        name: "Bi Ehsas",
        cover: "./img/Shadmehr.jpg",
        music: new Audio("./music/Shadmehr Aghili - Bi Ehsas.mp3")
    },
    {
        name: "Ye Moghehaei",
        cover: "./img/shayea.jpg",
        music: new Audio("./music/Shayea - Ye Moghehaei.mp3")
    },
    {
        name: "Donbal Khodam Migardam",
        cover: "./img/moein-z.jpg",
        music: new Audio("./music/Moein Z - Donbale Khodam Migardam.mp3")
    },
    {
        name: "Farsh",
        cover: "./img/iranmanesh.jpg",
        music: new Audio("./music/Hooman Iranmanesh - Farsh.mp3")
    }
]

let title = document.getElementById('title');
let img = document.getElementById('img');
let range = document.getElementById('input');
let backward = document.getElementById('backward');
let pause = document.getElementById('pause');
let forward = document.getElementById('forward');

let currentMusic = 0;
range.value = 0;

let audio = musics[currentMusic].music
img.src = musics[currentMusic].cover
title.innerText = musics[currentMusic].name

let havePlay = false;
let endPlay = false;

// مقدار رنج متناسب با اهنگ
audio.addEventListener("canplay", e=>{
    range.max = audio.duration
})



// تکون خوردن موقعیت با زمان اهنگ
audio.addEventListener("timeupdate", e=>{
    range.value = audio.currentTime
    if(audio.currentTime === audio.duration) {
        endPlay = true;
        changeMusic("next")
    }
})

//  کلیک کردن روی خط  جا به جا شدن آهنگ
range.addEventListener("input", e=>{
    audio.currentTime = range.value
})

// پخش آهنگ
pause.addEventListener("click", e=>{
    if(audio.paused){
        pause.innerHTML = '<i class="fa-regular fa-pause"></i>'
        audio.play()
        img.style.animationPlayState = "running"
    }
    else{
        pause.innerHTML = '<i class="fa-regular fa-play"></i>'
        audio.pause()
        img.style.animationPlayState = "paused"
    }
})

// اهنگ بعدی
forward.addEventListener("click", e=>{
    changeMusic("next")
})
// اهنگ قبلی
backward.addEventListener("click", e=>{
    changeMusic("prev")
})


function changeMusic(state) {
    if(!audio.paused){
        havePlay = true;
    }
    audio.pause()
    range.value = 0;
    audio.currentTime = 0;
    if(state === "next"){
        if(currentMusic === musics.length - 1)
            currentMusic = 0;
        else currentMusic += 1;
    }else{
        if(currentMusic === 0)
            currentMusic = musics.length - 1;
        else currentMusic -= 1;
    }
    audio = musics[currentMusic].music
    img.src = musics[currentMusic].cover
    title.innerText = musics[currentMusic].name

    if (havePlay || endPlay) audio.play();
    havePlay = false;
    endPlay = false;
    
    // مقدار رنج متناسب با اهنگ
    audio.addEventListener("canplay", e=>{
        range.max = audio.duration
    })

    // تکون خوردن موقعیت با زمان اهنگ
    audio.addEventListener("timeupdate", e=>{
        range.value = audio.currentTime
        if(audio.currentTime === audio.duration) {
            endPlay = true;
            changeMusic("next")
        }
    })
        
}

