/**
 * @version 0.1
 * @author Bern Taylor
 */

// Guitar Tunings Database Violin Tuner
// https://github.com/warmwhisky/violin-tuner-cdn

var soundToPlay = false;
let MASTER_VOLUME = 0.8;


function click_gtdb_button(clicked_id) {

    let clicked_note = clicked_id.target.textContent;

    let gtdb_onebyone = document.querySelector('#gtdb_onebyone_wrap').classList.contains('gtdb_active')
    let gtdb_loop_wrap = document.querySelector('#gtdb_loop_wrap').classList.contains('gtdb_active')
    // console.log(clicked_id.target.innerHTML)
    // const soundToPlay = document.querySelector(`#${clicked_id.target.id}_sound`);
    let htz = document.querySelector('.gtdb_htz_btn.gtdb_active').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    let soundTypeSelect = document.querySelector('#gtdb_sound_select')
    let soundType = soundTypeSelect.options[soundTypeSelect.selectedIndex].text.replace(' ', '').trim().toLowerCase();
    // console.log(soundType)
    soundToPlay = document.querySelector(`#VIOLIN_${clicked_note}_sound_${soundType}_${htz}`);


    if (!clicked_id.target.classList.contains('gtdb_active')) {

        clicked_id.target.innerHTML = `<span style="color: #f0f8ff26!important;">${clicked_note}</span>`;
        clicked_id.target.classList.add('gtdb_buffering')

        // get and play the audio
        if (!gtdb_onebyone) {
            if (soundToPlay) {
                soundToPlay.load()
                soundToPlay.volume = MASTER_VOLUME;
                soundToPlay.play();
            }
        } else {
            var gtdb_play_note = document.querySelectorAll('.gtdb_play_note');
            // console.log(audios)
            if (soundToPlay) {
                soundToPlay.load()
                soundToPlay.loop = gtdb_loop_wrap;
                soundToPlay.volume = MASTER_VOLUME;
                soundToPlay.play();
            }

            for (var i3 = 0, len3 = gtdb_play_note.length; i3 < len3; i3++) {
                gtdb_play_note[i3].classList.remove('gtdb_active')
            }

            // var audios = document.querySelectorAll('audio');
            var audios = document.querySelectorAll(`[id*='_sound_${soundType}']`)
            for (var i = 0, len = audios.length; i < len; i++) {
                if (audios[i].id !== `VIOLIN_${clicked_note}_sound_${soundType}_${htz}`) {
                    audios[i].pause();
                    audios[i].currentTime = 0;
                }
            }
            returnHtz()
        }

    } else {

        soundToPlay.pause();
        soundToPlay.currentTime = 0;

        clicked_id.target.classList.remove('gtdb_active')

    }
}

function gtdbSoundLoaded(note) {
    document.querySelector(`#VIOLIN_${note}_pizzicato2_440`).innerHTML = note;
    document.querySelector(`#VIOLIN_${note}_pizzicato2_440`).classList.remove('gtdb_buffering')
    document.querySelector(`#VIOLIN_${note}_pizzicato2_440`).classList.add('gtdb_active')

    let gtdb_loop_wrap = document.querySelector('#gtdb_loop_wrap').classList.contains('gtdb_active')
    setTimeout(function () {

        if (!gtdb_loop_wrap) {
            document.querySelector(`#VIOLIN_${note}_pizzicato2_440`).classList.remove('gtdb_active')
        }
    }, 3000);
    // clicked_id.target.classList.add('gtdb_active')
}

function stopPlayback(event) {

    var audios = document.querySelectorAll('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
        audios[i].pause();
        audios[i].currentTime = 0;
    }

    var stopBtns = document.querySelectorAll('.gtdb_play_note');
    for (i = 0; i < stopBtns.length; i++) {
        stopBtns[i].classList.remove('gtdb_active');
    }
}

function onebyonePlayback(event) {
    if (event.target.classList.contains('gtdb_active')) {
        event.target.classList.remove('gtdb_active')
    } else {
        event.target.classList.add('gtdb_active')
    }
    // stopPlayback(event)
}

function loopPlayback(event) {
    var audioLoops = document.querySelectorAll('audio');
    // console.log(audioLoops);
    if (event.target.classList.contains('gtdb_active')) {

        event.target.classList.remove('gtdb_active')

        for (var i = 0, len = audioLoops.length; i < len; i++) {
            audioLoops[i].removeAttribute('loop')
        }

    } else {

        event.target.classList.add('gtdb_active')

        for (var i2 = 0, len = audioLoops.length; i2 < len; i2++) {
            audioLoops[i2].setAttribute('loop', true)
        }
    }
    // stopPlayback(event)
    return true;
}


function returnHtz() {
    let htzBtns = document.querySelectorAll('.gtdb_htz_btn')
    for (var i3 = 0, len = htzBtns.length; i3 < len; i3++) {
        if (htzBtns[i3].classList.contains('gtdb_active')) {
            return htzBtns[i3].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
        }
    }
}

function switchHtz(event) {
    stopPlayback(event)
    document.querySelector('#gtdb_htz432_wrap').classList.toggle('gtdb_active')
    document.querySelector('#gtdb_htz440_wrap').classList.toggle('gtdb_active')
    let htzBtns = document.querySelectorAll('.gtdb_htz_btn')
    for (var i3 = 0, len = htzBtns.length; i3 < len; i3++) {
        if (htzBtns[i3].classList.contains('gtdb_active')) {
            gtdbHTZ = htzBtns[i3].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
            let gtdbSource = document.getElementsByTagName('source');
            for (var i4 = 0, len4 = gtdbSource.length; i4 < len4; i4++) {
                if (gtdbHTZ === '432') {
                    gtdbSource[i4].src = gtdbSource[i4].src.replace('/440/', '/432/')
                } else {
                    gtdbSource[i4].src = gtdbSource[i4].src.replace('/432/', '/440/')
                }
                // console.log(gtdbSource[i4].src)
            }
            // console.log(gtdbHTZ)
        }

    }
    return true;
}

let sound_types;
letz = 440;
sound_types = `<option value="pizzicato" class="gtdb_sound_switch">Pizzicato</option>`;
sound_types += `<option value="pizzicato2" class="gtdb_sound_switch" selected>Pizzicato 2</option>`;
sound_types += `<option value="legato" class="gtdb_sound_switch">Legato</option>`;
sound_types += `<option value="section" class="gtdb_sound_switch">Section</option>`;
sound_types += `<option value="sine" class="gtdb_sound_switch">Sine</option>`;
let gtdb_sound_select = `<select id="gtdb_sound_select" onchange="stopPlayback(event)">${sound_types}</select>`;
document.querySelector('#sounds_switch_wrap').innerHTML = gtdb_sound_select;


// Get the modal
var gtdb_modal_modal = document.getElementById("gtdb_modal_myModal");

// Get the button that opens the modal
var gtdb_modal_btn = document.getElementById("gtdb_modal_myBtn");

// Get the <span> element that closes the modal
var gtdb_modal_span = document.getElementsByClassName("gtdb_modal_close")[0];

// When the user clicks on the button, open the modal
gtdb_modal_btn.onclick = function () {
    gtdb_modal_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
gtdb_modal_span.onclick = function () {
    gtdb_modal_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == gtdb_modal_modal) {
        gtdb_modal_modal.style.display = "none";
    }
}

// get url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('default_sound')) {
    let gtdb_sound_select = document.querySelector('#gtdb_sound_select')
    gtdb_sound_select.value = urlParams.get('default_sound')
}

if (urlParams.has('background_colour')) {
    var sheet0 = document.createElement('style')
    sheet0.innerHTML = `body {background-color: #${urlParams.get('background_colour')}!important;}`;
    document.body.appendChild(sheet0);
}
if (urlParams.has('main_colour')) {
    var sheet = document.createElement('style')
    sheet.innerHTML = `.gtdb_play_note {background-color: #${urlParams.get('main_colour')}!important;}`;
    sheet.innerHTML += `.gtdb_btn {background-color: #${urlParams.get('main_colour')}!important;}`;
    sheet.innerHTML += `#gtdb_sound_select {border-color: #${urlParams.get('main_colour')}!important;background-color: #${urlParams.get('main_colour')}!important;}`;
    sheet.innerHTML += `.gtdb_btn_plug {background-color: #${urlParams.get('main_colour')}!important;}`;
    document.body.appendChild(sheet);
}

if (urlParams.has('text_colour')) {
    var sheet2 = document.createElement('style')
    sheet2.innerHTML = `.gtdb_play_note {color: #${urlParams.get('text_colour')}!important;}`;
    sheet2.innerHTML += `.gtdb_btn {color: #${urlParams.get('text_colour')}!important;}`;
    sheet2.innerHTML += `span.gtdb_stop {background-color: #${urlParams.get('text_colour')}!important;}`;
    sheet2.innerHTML += `.gtdb_btn_plug {color: #${urlParams.get('text_colour')}!important;}`;
    document.body.appendChild(sheet2);
}

if (urlParams.has('active_colour')) {
    var sheet3 = document.createElement('style')
    sheet3.innerHTML = `.gtdb_play_note.gtdb_active {background-color: #${urlParams.get('active_colour')}!important;}`;
    sheet3.innerHTML += `div.gtdb_btn.gtdb_active {background-color: #${urlParams.get('active_colour')}!important;}`;
    document.body.appendChild(sheet3);
}

if (urlParams.has('htz')) {
    // document.querySelector('#gtdb_htz432_wrap').classList.toggle('gtdb_active')
    // document.querySelector('#gtdb_htz440_wrap').classList.toggle('gtdb_active')
    let htzBtns = document.querySelectorAll('.gtdb_htz_btn')
    for (var i3 = 0, len = htzBtns.length; i3 < len; i3++) {
        gtdbHTZ = htzBtns[i3].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
        let gtdbSource = document.getElementsByTagName('source');
        for (var i4 = 0, len4 = gtdbSource.length; i4 < len4; i4++) {
            if (urlParams.get('htz') == '432') {
                document.querySelector('#gtdb_htz432_wrap').classList.add('gtdb_active')
                document.querySelector('#gtdb_htz440_wrap').classList.remove('gtdb_active')
                gtdbSource[i4].src = gtdbSource[i4].src.replace('/440/', '/432/')
            } else {
                document.querySelector('#gtdb_htz432_wrap').classList.remove('gtdb_active')
                document.querySelector('#gtdb_htz440_wrap').classList.add('gtdb_active')
                gtdbSource[i4].src = gtdbSource[i4].src.replace('/432/', '/440/')
            }
        }

    }
}

