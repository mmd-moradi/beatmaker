class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad() {
        this.classList.toggle("active")
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        if (this.bpm == 0) {
            return
        }
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval)
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.textContent = "Stop"
            this.playBtn.classList.add("active")
        } else {
            this.playBtn.textContent = "Play"
            this.playBtn.classList.remove("active")
        }
    }
    changeSound(event) {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }

    }
    mute(event) {
        const muteIndex = event.target.getAttribute("data-track");
        event.target.classList.toggle("active");
        if (event.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(event) {
        const tempoText = document.querySelector(".tempo-nr");
        this.bpm = event.target.value;
        console.log(this.bpm);
        tempoText.textContent = this.bpm;
    }
    updateTempo(event) {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")) {
            this.start();
        }
    }

}   


const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    })
})

drumkit.playBtn.addEventListener("click", function () {
    drumkit.updateBtn();
    drumkit.start();
})

drumkit.selects.forEach(select => {
    select.addEventListener("change", function (event) {
        drumkit.changeSound(event);
    })
})

drumkit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
        drumkit.mute(event);
    })
})

drumkit.tempoSlider.addEventListener("input", function(event){
    drumkit.changeTempo(event);
})

drumkit.tempoSlider.addEventListener("change", function(event){
    drumkit.updateTempo(event);
})