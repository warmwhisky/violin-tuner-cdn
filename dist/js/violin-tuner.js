/**
 * @version 0.1
 * @author Bern Taylor
 */

// Guitar Tunings Database Violin Tuner
// https://github.com/warmwhisky/violin-tuner-cdn

var soundToPlay = false;
function click_gtdb_button(clicked_id) {

    let gtdb_onebyone = document.querySelector('#gtdb_onebyone_wrap').classList.contains('gtdb_active')
    let gtdb_loop_wrap = document.querySelector('#gtdb_loop_wrap').classList.contains('gtdb_active')
    console.log(clicked_id.target.innerHTML)
    // const soundToPlay = document.querySelector(`#${clicked_id.target.id}_sound`);
    let htz = document.querySelector('.gtdb_htz_btn.gtdb_active').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    let soundTypeSelect = document.querySelector('#gtdb_sound_select')
    let soundType = soundTypeSelect.options[soundTypeSelect.selectedIndex].text.replace(' ', '').trim().toLowerCase();
    // console.log(soundType)
    soundToPlay = document.querySelector(`#VIOLIN_${clicked_id.target.textContent}_sound_${soundType}_${htz}`);

    if (!clicked_id.target.classList.contains('gtdb_active')) {

        // get and play the audio
        // soundToPlay = new Audio(`/sounds/violin/pizzicato2/440/${clicked_id.target.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()}.mp3`) || false;
        // console.log(soundToPlay)
        if (!gtdb_onebyone) {
            if (soundToPlay) {
                soundToPlay.load()
                soundToPlay.volume = 0.8;
                soundToPlay.play();
            }
        } else {
            var gtdb_play_note = document.querySelectorAll('.gtdb_play_note');
            // console.log(audios)
            if (soundToPlay) {
                console.log(clicked_id.target)
                clicked_id.target.classList.add('bugger')
                soundToPlay.load()
                clicked_id.target.classList.remove('bugger')
                soundToPlay.loop = gtdb_loop_wrap;
                soundToPlay.volume = 0.8;
                soundToPlay.play();
            }

            for (var i3 = 0, len3 = gtdb_play_note.length; i3 < len3; i3++) {
                gtdb_play_note[i3].classList.remove('gtdb_active')
            }

            // var audios = document.querySelectorAll('audio');
            var audios = document.querySelectorAll(`[id*='_sound_${soundType}']`)
            for (var i = 0, len = audios.length; i < len; i++) {
                if(audios[i].id !== `VIOLIN_${clicked_id.target.textContent}_sound_${soundType}_${htz}`) {
                    audios[i].volume = 0.01;
                    audios[i].pause();
                    audios[i].currentTime = 0;
                }
            }
            returnHtz()
        }

        clicked_id.target.classList.add('gtdb_active')
        setTimeout(function () {

            if (!gtdb_loop_wrap) {
                clicked_id.target.classList.remove('gtdb_active')
            }
        }, 3000);

    } else {

        soundToPlay.pause();
        soundToPlay.currentTime = 0;

        clicked_id.target.classList.remove('gtdb_active')

    }
}

function stopPlayback(event) {

    var audios = document.querySelectorAll('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
        audios[i].pause();
        audios[i].currentTime = 0;
    }

    var stopBtns = document.querySelectorAll('.gtdb_play_note');
    for(i=0; i<stopBtns.length; i++) {
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
    console.log(audioLoops);
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
    document.querySelector('#gtdb_htz432_wrap').classList.toggle('gtdb_active')
    document.querySelector('#gtdb_htz440_wrap').classList.toggle('gtdb_active')
    let htzBtns = document.querySelectorAll('.gtdb_htz_btn')
    for (var i3 = 0, len = htzBtns.length; i3 < len; i3++) {
        if(htzBtns[i3].classList.contains('gtdb_active')) {
            gtdbHTZ = htzBtns[i3].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
            let gtdbSource = document.getElementsByTagName('source');
            for (var i4 = 0, len4 = gtdbSource.length; i4 < len4; i4++) {
                if(gtdbHTZ === '432') {
                    gtdbSource[i4].src = gtdbSource[i4].src.replace('/440/','/432/')
                } else {
                    gtdbSource[i4].src = gtdbSource[i4].src.replace('/432/','/440/')
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
sound_types = `<option class="gtdb_sound_switch">Pizzicato</option>`;
sound_types += `<option class="gtdb_sound_switch" selected>Pizzicato 2</option>`;
sound_types += `<option class="gtdb_sound_switch">Legato</option>`;
sound_types += `<option class="gtdb_sound_switch">Section</option>`;
sound_types += `<option class="gtdb_sound_switch">Sine</option>`;
let gtdb_sound_select = `<select id="gtdb_sound_select" onchange="stopPlayback(event)">${sound_types}</select>`;
document.querySelector('#sounds_switch_wrap').innerHTML = gtdb_sound_select;
