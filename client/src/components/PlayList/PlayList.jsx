import React from 'react';
import background01 from '../../assets/img/background-01.svg';
import background02 from '../../assets/img/background-02.svg';
import background03 from '../../assets/img/background-03.svg';
import background04 from '../../assets/img/background-04.svg';
import background05 from '../../assets/img/background-05.svg';
import background06 from '../../assets/img/background-06.svg';
import background07 from '../../assets/img/background-07.svg';
import background08 from '../../assets/img/background-08.svg';
import background09 from '../../assets/img/background-09.svg';
import background10 from '../../assets/img/background-10.svg';
import { randomNumber } from '../../utils/randomNumber';
import TopMenu from '../TopMenu/TopMenu';
import './PlayList.css';

let toggle = true
let next
let image = [background01, background02, background03, background04, background05, background06, background07, background08, background09, background10]
let numberImage
let currentPlaylist
let background1
let background2

const PlayList = React.memo(({ startPlaylist, resetSounds, tooltip, isAuth }) => {

    const [activePlaylist, setPlaylist] = React.useState()

    if (tooltip && !activePlaylist) {
        alert('tooltip')
        toggle = true
        next = ''
        setPlaylist((prevState) => {

        })

    }



    function activateCard(e, toggle) {
        if (activePlaylist == e) {
            setPlaylist('')
            resetSounds()
        } else {
            startPlaylist(e, numberImage)
            setPlaylist(e)
        }

    }
    // function activateCard(e) {


    //     document.getElementById(e).parentNode.style.height = "160px" // playList__wrap


    //     //  предыдущий
    //     if (next) {
    //         let prev = document.getElementById(next).parentNode.firstElementChild.firstElementChild

    //         document.getElementById(next).parentNode.style.height = "128px" // playList__wrap

    //    
    //     }

    //     next = e == next ? '' : e
    //     console.log('next', next);
    //     // вкл
    //     if (toggle) {
    //         startPlaylist(e, numberImage)
    //         toggle = false

    //         currentPlaylist.removeAttribute("class")
    //         currentPlaylist.classList.add("playList__card-container-active")

    //         background1.removeAttribute("class")
    //         background2.removeAttribute("class")
    //         background1.classList.add("playList__card-background-1-active")
    //         background2.classList.add("playList__card-background-2-active")

    //         // переключить
    //     } else if (!toggle && next != '') {

    //         startPlaylist(e, numberImage)

    //         currentPlaylist.removeAttribute("class")
    //         currentPlaylist.classList.add("playList__card-container-active")

    //         background1.removeAttribute("class")
    //         background2.removeAttribute("class")
    //         background1.classList.add("playList__card-background-1-active")
    //         background2.classList.add("playList__card-background-2-active")

    //         // выкл
    //     } else {
    //         resetSounds()
    //         toggle = true
    //         currentPlaylist.removeAttribute("class")
    //         currentPlaylist.classList.add("playList__card-container")
    //     }
    // }

    function changeBackground() {

        let n = randomNumber(image)
        console.log('number ------- ', n);
        if (n == numberImage) {
            n == 1 ? n++ : n--
        }

        numberImage = n
        return image[n]
    }

    return (
        <div className="playList1">
            <TopMenu isAuth={isAuth} />
            <div className="playList__list">
                <div className="playList__wrap" >
                    <div className="playList__card" onClick={() => activateCard("Productivity")}>
                        <div className={activePlaylist == "Productivity" ? "playList__card-container-active" : "playList__card-container"}>
                            <div className={activePlaylist == "Productivity" ? "playList__card-background-1-active" : "playList__card-background-1"}></div>
                            <div className={activePlaylist == "Productivity" ? "playList__card-background-2-active" : "playList__card-background-2"}></div>
                            <div className="playList__card-content">
                                <div className="playList__card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="#FFF" fillRule="nonzero" d="M25.6,19.8 C25.1581722,20.1313708 24.5313708,20.0418278 24.2,19.6 C23.8686292,19.1581722 23.9581722,18.5313708 24.4,18.2 C26.8002538,16.3998096 28,13.7003807 28,10 C28,5.581722 24.418278,2 20,2 C15.581722,2 12,5.581722 12,10 C12,13.7003807 13.1997462,16.3998096 15.6,18.2 C16.0418278,18.5313708 16.1313708,19.1581722 15.8,19.6 C15.4686292,20.0418278 14.8418278,20.1313708 14.4,19.8 C11.4669205,17.6001904 10,14.2996193 10,10 C10,4.4771525 14.4771525,0 20,0 C25.5228475,0 30,4.4771525 30,10 C30,14.2996193 28.5330795,17.6001904 25.6,19.8 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M14.0077361,18.8758531 C14.0763006,18.3278409 14.5761347,17.9391717 15.1241469,18.0077361 C15.6721591,18.0763006 16.0608283,18.5761347 15.9922639,19.1241469 C15.5993516,22.2645608 13.8659919,23.9963304 11,23.9963304 C9.20903823,23.9963304 7.26016331,22.8862914 6.58952873,21.4099027 C6.29581884,20.7633062 6.12088021,20.0367999 6.03411872,19.2197876 C5.95747892,18.4980889 5.95228455,17.8795717 5.98350296,16.8161737 C5.99843076,16.3076859 6.00116429,16.1894115 6.00001953,16.0062499 C5.99216256,14.749134 5.14763105,14 3.990625,14 C2.83585516,14 2,14.7455712 2,16 L2,17.9981652 C2,18.5504499 1.55228475,18.9981652 1,18.9981652 C0.44771525,18.9981652 1.42108547e-14,18.5504499 1.42108547e-14,17.9981652 L1.42108547e-14,16 C1.42108547e-14,13.586833 1.77898859,12 3.990625,12 C6.2000252,12 7.98491497,13.5832702 7.99998047,15.9937501 C8.00134069,16.2113852 7.99845848,16.3360924 7.98264167,16.8748629 C7.95394416,17.8523908 7.95856323,18.4024037 8.02293612,19.0085879 C8.08872546,19.6281104 8.21495561,20.1523342 8.41047127,20.582758 C8.73762658,21.302984 9.95492207,21.9963304 11,21.9963304 C12.8006747,21.9963304 13.7339817,21.0638796 14.0077361,18.8758531 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M38.0077221,18.8759653 C38.0762246,18.3279453 38.5760148,17.9392196 39.1240347,18.0077221 C39.6720547,18.0762246 40.0607804,18.5760148 39.9922779,19.1240347 C39.5994322,22.2668005 37.8662326,24 35,24 C33.2090382,24 31.2601633,22.8899611 30.5895287,21.4135723 C30.2947649,20.7646557 30.1196638,20.0346501 30.0332222,19.212833 C29.9574447,18.492402 29.9523962,17.8745555 29.9835016,16.8133509 C29.9984415,16.303656 30.0011642,16.1857327 30.0000195,16.0025802 C29.9921509,14.7436031 29.1450582,13.989258 27.9887796,13.9871242 C26.8347087,13.9849944 26,14.7321101 26,16 L26,18 C26,18.5522847 25.5522847,19 25,19 C24.4477153,19 24,18.5522847 24,18 L24,16 C24,13.5745325 25.7780804,11.9830411 27.9924704,11.9871276 C30.2005244,11.9912024 31.9849189,13.5802246 31.9999805,15.9900805 C32.0013405,16.2076785 31.9984712,16.3319478 31.982643,16.8719485 C31.9540347,17.8479617 31.9585275,18.3978021 32.0222496,19.00362 C32.0878615,19.6274055 32.2143135,20.1545902 32.4104713,20.5864277 C32.7376266,21.3066536 33.9549221,22 35,22 C36.800434,22 37.7339012,21.0665328 38.0077221,18.8759653 Z" transform="matrix(-1 0 0 1 64 0)"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M16 16C14.3431458 16 13 14.6568542 13 13 13 11.3431458 14.3431458 10 16 10 17.6568542 10 19 11.3431458 19 13 19 14.6568542 17.6568542 16 16 16zM16 14C16.5522847 14 17 13.5522847 17 13 17 12.4477153 16.5522847 12 16 12 15.4477153 12 15 12.4477153 15 13 15 13.5522847 15.4477153 14 16 14zM24 16C22.3431458 16 21 14.6568542 21 13 21 11.3431458 22.3431458 10 24 10 25.6568542 10 27 11.3431458 27 13 27 14.6568542 25.6568542 16 24 16zM24 14C24.5522847 14 25 13.5522847 25 13 25 12.4477153 24.5522847 12 24 12 23.4477153 12 23 12.4477153 23 13 23 13.5522847 23.4477153 14 24 14zM4 25C4.55228475 25 5 25.4477153 5 26 5 26.5522847 4.55228475 27 4 27 2.8954305 27 2 27.8954305 2 29 2 30.1045695 2.8954305 31 4 31 4.74854529 31 5.72416184 30.5818786 6.85405776 29.7366137L13.3540578 24.2366137C13.7756644 23.8798697 14.4066422 23.9324512 14.7633863 24.3540578 15.1201303 24.7756644 15.0675488 25.4066422 14.6459422 25.7633863L8.1 31.3C6.60917149 32.4181214 5.25145471 33 4 33 1.790861 33 0 31.209139 0 29 0 26.790861 1.790861 25 4 25z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M12,32 C12.5522847,32 13,32.4477153 13,33 C13,33.5522847 12.5522847,34 12,34 C10.8954305,34 10,34.8954305 10,36 C10,37.1045695 10.8954305,38 12,38 C13.4831616,38 14.4645776,37.018584 15.0136061,34.835601 L17.0136061,22.835601 C17.1044011,22.2908307 17.6196287,21.922811 18.164399,22.0136061 C18.7091693,22.1044011 19.077189,22.6196287 18.9863939,23.164399 L16.9701425,35.2425356 C16.2020891,38.3147493 14.5168384,40 12,40 C9.790861,40 8,38.209139 8,36 C8,33.790861 9.790861,32 12,32 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M29,25 C29.5522847,25 30,25.4477153 30,26 C30,26.5522847 29.5522847,27 29,27 C27.8954305,27 27,27.8954305 27,29 C27,30.1045695 27.8954305,31 29,31 C29.7485453,31 30.7241618,30.5818786 31.8540578,29.7366137 L38.3540578,24.2366137 C38.7756644,23.8798697 39.4066422,23.9324512 39.7633863,24.3540578 C40.1201303,24.7756644 40.0675488,25.4066422 39.6459422,25.7633863 L33.1,31.3 C31.6091715,32.4181214 30.2514547,33 29,33 C26.790861,33 25,31.209139 25,29 C25,26.790861 26.790861,25 29,25 Z" transform="matrix(-1 0 0 1 65 0)"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M25,32 C25.5522847,32 26,32.4477153 26,33 C26,33.5522847 25.5522847,34 25,34 C23.8954305,34 23,34.8954305 23,36 C23,37.1045695 23.8954305,38 25,38 C26.4831616,38 27.4645776,37.018584 28.0136061,34.835601 L30.0136061,22.835601 C30.1044011,22.2908307 30.6196287,21.922811 31.164399,22.0136061 C31.7091693,22.1044011 32.077189,22.6196287 31.9863939,23.164399 L29.9701425,35.2425356 C29.2020891,38.3147493 27.5168384,40 25,40 C22.790861,40 21,38.209139 21,36 C21,33.790861 22.790861,32 25,32 Z" transform="matrix(-1 0 0 1 53 0)"></path>
                                            <path d="M0 0H40V40H0z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="playList__card-title">Productivity</div>
                            </div>
                        </div>
                        <img className="playList__card-background-image" src={activePlaylist == "Productivity" ? changeBackground() : ''} alt=""
                            style={activePlaylist == "Productivity" ? { display: 'block' } : { display: 'none' }} />
                    </div>
                    <span className="next" id="Productivity" style={activePlaylist == "Productivity" ? { display: 'inline-block' } : { display: 'none' }}
                        onClick={() => startPlaylist("Productivity", numberImage)} >Next</span>
                </div>

                <div className="playList__wrap" >
                    <div className="playList__card" onClick={() => activateCard("Random")}>
                        <div className={activePlaylist == "Random" ? "playList__card-container-active" : "playList__card-container"}>
                            <div className={activePlaylist == "Random" ? "playList__card-background-1-active" : "playList__card-background-1"}></div>
                            <div className={activePlaylist == "Random" ? "playList__card-background-2-active" : "playList__card-background-2"}></div>
                            <div className="playList__card-content">
                                <div className="playList__card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="#FFF" fillRule="nonzero" d="M13.6396078,29 C13.1629268,29 12.752512,29.3364597 12.6590271,29.8038839 L11.2198039,37 L28.7801961,37 L27.3409729,29.8038839 C27.247488,29.3364597 26.8370732,29 26.3603922,29 L13.6396078,29 Z M13.6396078,27 L26.3603922,27 C27.7904353,27 29.0216797,28.009379 29.3021342,29.4116516 L30.7413574,36.6077677 C30.9579813,37.6908872 30.2555479,38.7445375 29.1724284,38.9611614 C29.043282,38.9869906 28.9119001,39 28.7801961,39 L11.2198039,39 C10.1152344,39 9.2198039,38.1045695 9.2198039,37 C9.2198039,36.868296 9.23281328,36.7369141 9.25864255,36.6077677 L10.6978658,29.4116516 C10.9783203,28.009379 12.2095647,27 13.6396078,27 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M20 36C18.3431458 36 17 34.6568542 17 33 17 31.3431458 18.3431458 30 20 30 21.6568542 30 23 31.3431458 23 33 23 34.6568542 21.6568542 36 20 36zM20 34C20.5522847 34 21 33.5522847 21 33 21 32.4477153 20.5522847 32 20 32 19.4477153 32 19 32.4477153 19 33 19 33.5522847 19.4477153 34 20 34zM14 34C13.4477153 34 13 33.5522847 13 33 13 32.4477153 13.4477153 32 14 32L15 32C15.5522847 32 16 32.4477153 16 33 16 33.5522847 15.5522847 34 15 34L14 34zM25 34C24.4477153 34 24 33.5522847 24 33 24 32.4477153 24.4477153 32 25 32L26 32C26.5522847 32 27 32.4477153 27 33 27 33.5522847 26.5522847 34 26 34L25 34zM22 22C21.4477153 22 21 21.5522847 21 21 21 20.4477153 21.4477153 20 22 20L24 20C24.5522847 20 25 20.4477153 25 21 25 21.5522847 24.5522847 22 24 22L22 22zM22 18C21.4477153 18 21 17.5522847 21 17 21 16.4477153 21.4477153 16 22 16L24 16C24.5522847 16 25 16.4477153 25 17 25 17.5522847 24.5522847 18 24 18L22 18zM22 14C21.4477153 14 21 13.5522847 21 13 21 12.4477153 21.4477153 12 22 12L24 12C24.5522847 12 25 12.4477153 25 13 25 13.5522847 24.5522847 14 24 14L22 14zM22 10C21.4477153 10 21 9.55228475 21 9 21 8.44771525 21.4477153 8 22 8L24 8C24.5522847 8 25 8.44771525 25 9 25 9.55228475 24.5522847 10 24 10L22 10zM22 6C21.4477153 6 21 5.55228475 21 5 21 4.44771525 21.4477153 4 22 4L24 4C24.5522847 4 25 4.44771525 25 5 25 5.55228475 24.5522847 6 24 6L22 6z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M11.0215974,6.31297966 L8.14250707,1.51449576 C7.74259237,0.847971242 8.22270552,0 9,0 L26.9355488,1.55431223e-15 C26.9979676,0.000649456697 26.9979676,0.000649456697 27.0603054,0.00389484303 C28.1627238,0.0727959954 29.0005551,1.02233814 28.9316539,2.12475657 L27.6152553,23.1871349 C27.5164362,24.7682396 26.2052874,26 24.6210976,26 L15.3483283,26 C13.78304,26 12.4808259,24.7965404 12.3576338,23.2361075 L11.0215974,6.31297966 Z M10.7661904,2 L12.8574929,5.48550424 C12.9370161,5.61804294 12.9847335,5.7672116 12.9968981,5.92129751 L14.3514301,23.0787025 C14.3924941,23.5988468 14.8265655,24 15.3483283,24 L24.6210976,24 C25.1491608,24 25.5862105,23.5894132 25.6191501,23.0623783 L26.9355488,2 L10.7661904,2 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M28,6 L28,4 L30.5,4 C32.4329966,4 34,5.56700338 34,7.5 L34,13.5 C34,15.4329966 32.4329966,17 30.5,17 L28,17 L28,15 L30.5,15 C31.3284271,15 32,14.3284271 32,13.5 L32,7.5 C32,6.67157288 31.3284271,6 30.5,6 L28,6 Z"></path>
                                            <path d="M0 0H40V40H0z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="playList__card-title">Random</div>
                            </div>
                        </div>
                        <img className="playList__card-background-image" src={activePlaylist == "Random" ? changeBackground() : ''} alt=""
                            style={activePlaylist == "Random" ? { display: 'block' } : { display: 'none' }} />
                    </div>
                    <span className="next" id="Random" style={activePlaylist == "Random" ? { display: 'inline-block' } : { display: 'none' }}
                        onClick={() => startPlaylist("Random", numberImage)} >Next</span>
                </div>

                <div className="playList__wrap" >
                    <div className="playList__card" onClick={() => activateCard("Relax")}>
                        <div className={activePlaylist == "Relax" ? "playList__card-container-active" : "playList__card-container"}>
                            <div className={activePlaylist == "Relax" ? "playList__card-background-1-active" : "playList__card-background-1"}></div>
                            <div className={activePlaylist == "Relax" ? "playList__card-background-2-active" : "playList__card-background-2"}></div>
                            <div className="playList__card-content">
                                <div className="playList__card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="#FFF" fillRule="nonzero" d="M30.4348573,28.8249931 L31.5651427,27.1750069 C32.2825685,27.666463 33.2372433,28 34,28 C36.2195246,28 38,26.2395819 38,24.0407717 C38,22.0392473 36.644192,20.3168521 34.8203242,19.9837259 L35.1796758,18.0162741 C37.9779593,18.5273756 40,21.0961415 40,24.0407717 C40,27.3492552 37.319054,30 34,30 C32.8062302,30 31.4672115,29.5321839 30.4348573,28.8249931 Z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M.0190094498 16C.0190094498 14.895422.914446835 13.9999846 2.01902531 13.9999846L34.0201851 14C35.1304537 14.0031607 36.0233215 14.9011374 36.0201769 16.0057043 36.0109178 19.2497893 35.3056791 22.3906654 33.9079594 25.4190582 32.5839378 28.2877716 30.6151667 31.2347978 28.0047982 34.2639863 27.0549727 35.3662063 25.6721336 36.0000094 24.217121 36.0000094L18.0101347 36 11.7605016 36C10.3350468 36 8.97735974 35.3915877 8.02865929 34.3276723 5.27231962 31.2365482 3.28716119 28.2589488 2.07836462 25.388057.830636994 22.4247039.144354368 19.3188809.0204676323 16.0763587.0192525245 16.0381886.0192525245 16.0381886.0190094498 16zM3.92163538 24.611943C5.03764438 27.2624644 6.90250444 30.0596246 9.52139187 32.9966015 10.0906127 33.6349513 10.9052278 34 11.7605016 34L18.0101362 34 24.2171225 34.0000094C25.0901303 34.0000094 25.9198347 33.6197271 26.4897308 32.9583942 28.985022 30.0627466 30.851408 27.2689792 32.0920406 24.5809418 33.3702042 21.8115873 34.0117529 18.9543636 34.0201846 15.9999846L2.01900946 15.9999846C2.13372257 19.0024189 2.76761425 21.8711428 3.92163538 24.611943zM17.2928932.292893219C17.6834175-.0976310729 18.3165825-.0976310729 18.7071068.292893219 19.0976311.683417511 19.0976311 1.31658249 18.7071068 1.70710678 18.213657 2.20055655 18 2.62787058 18 3 18 3.57228574 18.1874079 3.97833627 18.8320503 4.9452998 19.6874079 6.22833627 20 6.90561907 20 8 20 8.96120391 19.5469904 9.86722321 18.7071068 10.7071068 18.3165825 11.0976311 17.6834175 11.0976311 17.2928932 10.7071068 16.9023689 10.3165825 16.9023689 9.68341751 17.2928932 9.29289322 17.786343 8.79944345 18 8.37212942 18 8 18 7.42771426 17.8125921 7.02166373 17.1679497 6.0547002 16.3125921 4.77166373 16 4.09438093 16 3 16 2.03879609 16.4530096 1.13277679 17.2928932.292893219zM23.2928932.292893219C23.6834175-.0976310729 24.3165825-.0976310729 24.7071068.292893219 25.0976311.683417511 25.0976311 1.31658249 24.7071068 1.70710678 24.213657 2.20055655 24 2.62787058 24 3 24 3.57228574 24.1874079 3.97833627 24.8320503 4.9452998 25.6874079 6.22833627 26 6.90561907 26 8 26 8.96120391 25.5469904 9.86722321 24.7071068 10.7071068 24.3165825 11.0976311 23.6834175 11.0976311 23.2928932 10.7071068 22.9023689 10.3165825 22.9023689 9.68341751 23.2928932 9.29289322 23.786343 8.79944345 24 8.37212942 24 8 24 7.42771426 23.8125921 7.02166373 23.1679497 6.0547002 22.3125921 4.77166373 22 4.09438093 22 3 22 2.03879609 22.4530096 1.13277679 23.2928932.292893219zM11.2928932.292893219C11.6834175-.0976310729 12.3165825-.0976310729 12.7071068.292893219 13.0976311.683417511 13.0976311 1.31658249 12.7071068 1.70710678 12.213657 2.20055655 12 2.62787058 12 3 12 3.57228574 12.1874079 3.97833627 12.8320503 4.9452998 13.6874079 6.22833627 14 6.90561907 14 8 14 8.96120391 13.5469904 9.86722321 12.7071068 10.7071068 12.3165825 11.0976311 11.6834175 11.0976311 11.2928932 10.7071068 10.9023689 10.3165825 10.9023689 9.68341751 11.2928932 9.29289322 11.786343 8.79944345 12 8.37212942 12 8 12 7.42771426 11.8125921 7.02166373 11.1679497 6.0547002 10.3125921 4.77166373 10 4.09438093 10 3 10 2.03879609 10.4530096 1.13277679 11.2928932.292893219z"></path>
                                            <path fill="#FFF" fillRule="nonzero" d="M11 22.618034L11 27 17 27 17 22.618034 14 21.118034 11 22.618034zM18.4472136 21.1055728C18.7859976 21.2749648 19 21.6212279 19 22L19 28C19 28.5522847 18.5522847 29 18 29L10 29C9.44771525 29 9 28.5522847 9 28L9 22C9 21.6212279 9.21400238 21.2749648 9.5527864 21.1055728L13 19.381966 13 15C13 14.4477153 13.4477153 14 14 14 14.5522847 14 15 14.4477153 15 15L15 19.381966 18.4472136 21.1055728zM11.236068 36C10.8572959 36 10.5110328 36.2140024 10.3416408 36.5527864L9.61803399 38 26.381966 38 25.6583592 36.5527864C25.4889672 36.2140024 25.1427041 36 24.763932 36L11.236068 36zM11.236068 34L24.763932 34C25.9002482 34 26.9390376 34.6420071 27.4472136 35.6583592L28.1708204 37.1055728C28.6647989 38.0935298 28.2643502 39.2948759 27.2763932 39.7888544 26.9986823 39.9277098 26.6924562 40 26.381966 40L9.61803399 40C8.51346449 40 7.61803399 39.1045695 7.61803399 38 7.61803399 37.6895098 7.69032417 37.3832837 7.82917961 37.1055728L8.5527864 35.6583592C9.06096245 34.6420071 10.0997518 34 11.236068 34z"></path>
                                            <path d="M0 0H40V40H0z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="playList__card-title">Relax</div>
                            </div>
                        </div>
                        <img className="playList__card-background-image" src={activePlaylist == "Relax" ? changeBackground() : ''} alt=""
                            style={activePlaylist == "Relax" ? { display: 'block' } : { display: 'none' }} />
                    </div>
                    <span className="next" id="Relax" style={activePlaylist == "Relax" ? { display: 'inline-block' } : { display: 'none' }}
                        onClick={() => startPlaylist("Relax", numberImage)} >Next</span>
                </div>
            </div>
        </div>
    )
})
export default PlayList

// import React from 'react';
// import background01 from '../../assets/img/background-01.svg';
// import background02 from '../../assets/img/background-02.svg';
// import background03 from '../../assets/img/background-03.svg';
// import background04 from '../../assets/img/background-04.svg';
// import background05 from '../../assets/img/background-05.svg';
// import background06 from '../../assets/img/background-06.svg';
// import background07 from '../../assets/img/background-07.svg';
// import background08 from '../../assets/img/background-08.svg';
// import background09 from '../../assets/img/background-09.svg';
// import background10 from '../../assets/img/background-10.svg';
// import { randomNumber } from '../../utils/randomNumber';
// import TopMenu from '../TopMenu/TopMenu';
// import './PlayList.css';

// let toggle = true
// let next
// let image = [background01, background02, background03, background04, background05, background06, background07, background08, background09, background10]
// let numberImage
// let currentPlaylist
// let background1
// let background2

// const PlayList = React.memo(({ startPlaylist, resetSounds, tooltip, isAuth }) => {

//     if (tooltip) {
//         // alert('tooltip')
//         toggle = true
//         next = ''
//         currentPlaylist.removeAttribute("class")
//         currentPlaylist.classList.add("playList__card-container")
//         background1.removeAttribute("class")
//         background2.removeAttribute("class")
//         background1.classList.add("playList__card-background-1")
//         background2.classList.add("playList__card-background-2")
//     }

//     function activateCard(e) {

//         currentPlaylist = document.getElementById(e).parentNode.firstElementChild.firstElementChild
//         document.getElementById(e).parentNode.style.height = "160px" // playList__wrap

//         background1 = currentPlaylist.querySelector(".playList__card-background-1")
//         background2 = currentPlaylist.querySelector(".playList__card-background-2")

//         //  предыдущий
//         if (next) {
//             let prev = document.getElementById(next).parentNode.firstElementChild.firstElementChild

//             document.getElementById(next).parentNode.style.height = "128px" // playList__wrap

//             prev.removeAttribute("class")
//             prev.classList.add("playList__card-container")

//             let background1 = prev.querySelector(".playList__card-background-1-active")
//             let background2 = prev.querySelector(".playList__card-background-2-active")
//             background1.removeAttribute("class")
//             background2.removeAttribute("class")
//             background1.classList.add("playList__card-background-1")
//             background2.classList.add("playList__card-background-2")
//         }

//         next = e == next ? '' : e
//         console.log('next', next);
//         // вкл
//         if (toggle) {
//             startPlaylist(e, numberImage)
//             toggle = false

//             currentPlaylist.removeAttribute("class")
//             currentPlaylist.classList.add("playList__card-container-active")

//             background1.removeAttribute("class")
//             background2.removeAttribute("class")
//             background1.classList.add("playList__card-background-1-active")
//             background2.classList.add("playList__card-background-2-active")

//             // переключить
//         } else if (!toggle && next != '') {

//             startPlaylist(e, numberImage)

//             currentPlaylist.removeAttribute("class")
//             currentPlaylist.classList.add("playList__card-container-active")

//             background1.removeAttribute("class")
//             background2.removeAttribute("class")
//             background1.classList.add("playList__card-background-1-active")
//             background2.classList.add("playList__card-background-2-active")

//             // выкл
//         } else {
//             resetSounds()
//             toggle = true
//             currentPlaylist.removeAttribute("class")
//             currentPlaylist.classList.add("playList__card-container")
//         }
//     }

//     function changeBackground() {

//         let n = randomNumber(image)
//         console.log('number ------- ', n);
//         if (n == numberImage) {
//             n == 1 ? n++ : n--
//         }

//         numberImage = n
//         return image[n]
//     }

//     return (
//         <div className="playList1">
//             <TopMenu isAuth={isAuth} />
//             <div className="playList__list">
//                 <div className="playList__wrap" >
//                     <div className="playList__card" onClick={() => activateCard("Productivity")}>
//                         <div className="playList__card-container">
//                             <div className="playList__card-background-1"></div>
//                             <div className="playList__card-background-2"></div>
//                             <div className="playList__card-content">
//                                 <div className="playList__card-icon">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
//                                         <g fill="none" fillRule="evenodd">
//                                             <path fill="#FFF" fillRule="nonzero" d="M25.6,19.8 C25.1581722,20.1313708 24.5313708,20.0418278 24.2,19.6 C23.8686292,19.1581722 23.9581722,18.5313708 24.4,18.2 C26.8002538,16.3998096 28,13.7003807 28,10 C28,5.581722 24.418278,2 20,2 C15.581722,2 12,5.581722 12,10 C12,13.7003807 13.1997462,16.3998096 15.6,18.2 C16.0418278,18.5313708 16.1313708,19.1581722 15.8,19.6 C15.4686292,20.0418278 14.8418278,20.1313708 14.4,19.8 C11.4669205,17.6001904 10,14.2996193 10,10 C10,4.4771525 14.4771525,0 20,0 C25.5228475,0 30,4.4771525 30,10 C30,14.2996193 28.5330795,17.6001904 25.6,19.8 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M14.0077361,18.8758531 C14.0763006,18.3278409 14.5761347,17.9391717 15.1241469,18.0077361 C15.6721591,18.0763006 16.0608283,18.5761347 15.9922639,19.1241469 C15.5993516,22.2645608 13.8659919,23.9963304 11,23.9963304 C9.20903823,23.9963304 7.26016331,22.8862914 6.58952873,21.4099027 C6.29581884,20.7633062 6.12088021,20.0367999 6.03411872,19.2197876 C5.95747892,18.4980889 5.95228455,17.8795717 5.98350296,16.8161737 C5.99843076,16.3076859 6.00116429,16.1894115 6.00001953,16.0062499 C5.99216256,14.749134 5.14763105,14 3.990625,14 C2.83585516,14 2,14.7455712 2,16 L2,17.9981652 C2,18.5504499 1.55228475,18.9981652 1,18.9981652 C0.44771525,18.9981652 1.42108547e-14,18.5504499 1.42108547e-14,17.9981652 L1.42108547e-14,16 C1.42108547e-14,13.586833 1.77898859,12 3.990625,12 C6.2000252,12 7.98491497,13.5832702 7.99998047,15.9937501 C8.00134069,16.2113852 7.99845848,16.3360924 7.98264167,16.8748629 C7.95394416,17.8523908 7.95856323,18.4024037 8.02293612,19.0085879 C8.08872546,19.6281104 8.21495561,20.1523342 8.41047127,20.582758 C8.73762658,21.302984 9.95492207,21.9963304 11,21.9963304 C12.8006747,21.9963304 13.7339817,21.0638796 14.0077361,18.8758531 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M38.0077221,18.8759653 C38.0762246,18.3279453 38.5760148,17.9392196 39.1240347,18.0077221 C39.6720547,18.0762246 40.0607804,18.5760148 39.9922779,19.1240347 C39.5994322,22.2668005 37.8662326,24 35,24 C33.2090382,24 31.2601633,22.8899611 30.5895287,21.4135723 C30.2947649,20.7646557 30.1196638,20.0346501 30.0332222,19.212833 C29.9574447,18.492402 29.9523962,17.8745555 29.9835016,16.8133509 C29.9984415,16.303656 30.0011642,16.1857327 30.0000195,16.0025802 C29.9921509,14.7436031 29.1450582,13.989258 27.9887796,13.9871242 C26.8347087,13.9849944 26,14.7321101 26,16 L26,18 C26,18.5522847 25.5522847,19 25,19 C24.4477153,19 24,18.5522847 24,18 L24,16 C24,13.5745325 25.7780804,11.9830411 27.9924704,11.9871276 C30.2005244,11.9912024 31.9849189,13.5802246 31.9999805,15.9900805 C32.0013405,16.2076785 31.9984712,16.3319478 31.982643,16.8719485 C31.9540347,17.8479617 31.9585275,18.3978021 32.0222496,19.00362 C32.0878615,19.6274055 32.2143135,20.1545902 32.4104713,20.5864277 C32.7376266,21.3066536 33.9549221,22 35,22 C36.800434,22 37.7339012,21.0665328 38.0077221,18.8759653 Z" transform="matrix(-1 0 0 1 64 0)"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M16 16C14.3431458 16 13 14.6568542 13 13 13 11.3431458 14.3431458 10 16 10 17.6568542 10 19 11.3431458 19 13 19 14.6568542 17.6568542 16 16 16zM16 14C16.5522847 14 17 13.5522847 17 13 17 12.4477153 16.5522847 12 16 12 15.4477153 12 15 12.4477153 15 13 15 13.5522847 15.4477153 14 16 14zM24 16C22.3431458 16 21 14.6568542 21 13 21 11.3431458 22.3431458 10 24 10 25.6568542 10 27 11.3431458 27 13 27 14.6568542 25.6568542 16 24 16zM24 14C24.5522847 14 25 13.5522847 25 13 25 12.4477153 24.5522847 12 24 12 23.4477153 12 23 12.4477153 23 13 23 13.5522847 23.4477153 14 24 14zM4 25C4.55228475 25 5 25.4477153 5 26 5 26.5522847 4.55228475 27 4 27 2.8954305 27 2 27.8954305 2 29 2 30.1045695 2.8954305 31 4 31 4.74854529 31 5.72416184 30.5818786 6.85405776 29.7366137L13.3540578 24.2366137C13.7756644 23.8798697 14.4066422 23.9324512 14.7633863 24.3540578 15.1201303 24.7756644 15.0675488 25.4066422 14.6459422 25.7633863L8.1 31.3C6.60917149 32.4181214 5.25145471 33 4 33 1.790861 33 0 31.209139 0 29 0 26.790861 1.790861 25 4 25z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M12,32 C12.5522847,32 13,32.4477153 13,33 C13,33.5522847 12.5522847,34 12,34 C10.8954305,34 10,34.8954305 10,36 C10,37.1045695 10.8954305,38 12,38 C13.4831616,38 14.4645776,37.018584 15.0136061,34.835601 L17.0136061,22.835601 C17.1044011,22.2908307 17.6196287,21.922811 18.164399,22.0136061 C18.7091693,22.1044011 19.077189,22.6196287 18.9863939,23.164399 L16.9701425,35.2425356 C16.2020891,38.3147493 14.5168384,40 12,40 C9.790861,40 8,38.209139 8,36 C8,33.790861 9.790861,32 12,32 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M29,25 C29.5522847,25 30,25.4477153 30,26 C30,26.5522847 29.5522847,27 29,27 C27.8954305,27 27,27.8954305 27,29 C27,30.1045695 27.8954305,31 29,31 C29.7485453,31 30.7241618,30.5818786 31.8540578,29.7366137 L38.3540578,24.2366137 C38.7756644,23.8798697 39.4066422,23.9324512 39.7633863,24.3540578 C40.1201303,24.7756644 40.0675488,25.4066422 39.6459422,25.7633863 L33.1,31.3 C31.6091715,32.4181214 30.2514547,33 29,33 C26.790861,33 25,31.209139 25,29 C25,26.790861 26.790861,25 29,25 Z" transform="matrix(-1 0 0 1 65 0)"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M25,32 C25.5522847,32 26,32.4477153 26,33 C26,33.5522847 25.5522847,34 25,34 C23.8954305,34 23,34.8954305 23,36 C23,37.1045695 23.8954305,38 25,38 C26.4831616,38 27.4645776,37.018584 28.0136061,34.835601 L30.0136061,22.835601 C30.1044011,22.2908307 30.6196287,21.922811 31.164399,22.0136061 C31.7091693,22.1044011 32.077189,22.6196287 31.9863939,23.164399 L29.9701425,35.2425356 C29.2020891,38.3147493 27.5168384,40 25,40 C22.790861,40 21,38.209139 21,36 C21,33.790861 22.790861,32 25,32 Z" transform="matrix(-1 0 0 1 53 0)"></path>
//                                             <path d="M0 0H40V40H0z"></path>
//                                         </g>
//                                     </svg>
//                                 </div>
//                                 <div className="playList__card-title">Productivity</div>
//                             </div>
//                         </div>
//                         <img className="playList__card-background-image" src={next == "Productivity" ? changeBackground() : ''} alt=""
//                             style={next == "Productivity" ? { display: 'block' } : { display: 'none' }} />
//                     </div>
//                     <span className="next" id="Productivity" style={next == "Productivity" ? { display: 'inline-block' } : { display: 'none' }} onClick={() => startPlaylist("Productivity", numberImage)} >Next</span>
//                 </div>

//                 <div className="playList__wrap" >
//                     <div className="playList__card" onClick={() => activateCard("Random")}>
//                         <div className="playList__card-container">
//                             <div className="playList__card-background-1"></div>
//                             <div className="playList__card-background-2"></div>
//                             <div className="playList__card-content">
//                                 <div className="playList__card-icon">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
//                                         <g fill="none" fillRule="evenodd">
//                                             <path fill="#FFF" fillRule="nonzero" d="M13.6396078,29 C13.1629268,29 12.752512,29.3364597 12.6590271,29.8038839 L11.2198039,37 L28.7801961,37 L27.3409729,29.8038839 C27.247488,29.3364597 26.8370732,29 26.3603922,29 L13.6396078,29 Z M13.6396078,27 L26.3603922,27 C27.7904353,27 29.0216797,28.009379 29.3021342,29.4116516 L30.7413574,36.6077677 C30.9579813,37.6908872 30.2555479,38.7445375 29.1724284,38.9611614 C29.043282,38.9869906 28.9119001,39 28.7801961,39 L11.2198039,39 C10.1152344,39 9.2198039,38.1045695 9.2198039,37 C9.2198039,36.868296 9.23281328,36.7369141 9.25864255,36.6077677 L10.6978658,29.4116516 C10.9783203,28.009379 12.2095647,27 13.6396078,27 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M20 36C18.3431458 36 17 34.6568542 17 33 17 31.3431458 18.3431458 30 20 30 21.6568542 30 23 31.3431458 23 33 23 34.6568542 21.6568542 36 20 36zM20 34C20.5522847 34 21 33.5522847 21 33 21 32.4477153 20.5522847 32 20 32 19.4477153 32 19 32.4477153 19 33 19 33.5522847 19.4477153 34 20 34zM14 34C13.4477153 34 13 33.5522847 13 33 13 32.4477153 13.4477153 32 14 32L15 32C15.5522847 32 16 32.4477153 16 33 16 33.5522847 15.5522847 34 15 34L14 34zM25 34C24.4477153 34 24 33.5522847 24 33 24 32.4477153 24.4477153 32 25 32L26 32C26.5522847 32 27 32.4477153 27 33 27 33.5522847 26.5522847 34 26 34L25 34zM22 22C21.4477153 22 21 21.5522847 21 21 21 20.4477153 21.4477153 20 22 20L24 20C24.5522847 20 25 20.4477153 25 21 25 21.5522847 24.5522847 22 24 22L22 22zM22 18C21.4477153 18 21 17.5522847 21 17 21 16.4477153 21.4477153 16 22 16L24 16C24.5522847 16 25 16.4477153 25 17 25 17.5522847 24.5522847 18 24 18L22 18zM22 14C21.4477153 14 21 13.5522847 21 13 21 12.4477153 21.4477153 12 22 12L24 12C24.5522847 12 25 12.4477153 25 13 25 13.5522847 24.5522847 14 24 14L22 14zM22 10C21.4477153 10 21 9.55228475 21 9 21 8.44771525 21.4477153 8 22 8L24 8C24.5522847 8 25 8.44771525 25 9 25 9.55228475 24.5522847 10 24 10L22 10zM22 6C21.4477153 6 21 5.55228475 21 5 21 4.44771525 21.4477153 4 22 4L24 4C24.5522847 4 25 4.44771525 25 5 25 5.55228475 24.5522847 6 24 6L22 6z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M11.0215974,6.31297966 L8.14250707,1.51449576 C7.74259237,0.847971242 8.22270552,0 9,0 L26.9355488,1.55431223e-15 C26.9979676,0.000649456697 26.9979676,0.000649456697 27.0603054,0.00389484303 C28.1627238,0.0727959954 29.0005551,1.02233814 28.9316539,2.12475657 L27.6152553,23.1871349 C27.5164362,24.7682396 26.2052874,26 24.6210976,26 L15.3483283,26 C13.78304,26 12.4808259,24.7965404 12.3576338,23.2361075 L11.0215974,6.31297966 Z M10.7661904,2 L12.8574929,5.48550424 C12.9370161,5.61804294 12.9847335,5.7672116 12.9968981,5.92129751 L14.3514301,23.0787025 C14.3924941,23.5988468 14.8265655,24 15.3483283,24 L24.6210976,24 C25.1491608,24 25.5862105,23.5894132 25.6191501,23.0623783 L26.9355488,2 L10.7661904,2 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M28,6 L28,4 L30.5,4 C32.4329966,4 34,5.56700338 34,7.5 L34,13.5 C34,15.4329966 32.4329966,17 30.5,17 L28,17 L28,15 L30.5,15 C31.3284271,15 32,14.3284271 32,13.5 L32,7.5 C32,6.67157288 31.3284271,6 30.5,6 L28,6 Z"></path>
//                                             <path d="M0 0H40V40H0z"></path>
//                                         </g>
//                                     </svg>
//                                 </div>
//                                 <div className="playList__card-title">Random</div>
//                             </div>
//                         </div>
//                         <img className="playList__card-background-image" src={next == "Random" ? changeBackground() : ''} alt=""
//                             style={next == "Random" ? { display: 'block' } : { display: 'none' }} />
//                     </div>
//                     <span className="next" id="Random" style={next == "Random" ? { display: 'inline-block' } : { display: 'none' }} onClick={() => startPlaylist("Random", numberImage)} >Next</span>
//                 </div>

//                 <div className="playList__wrap" >
//                     <div className="playList__card" onClick={() => activateCard("Relax")}>
//                         <div className="playList__card-container">
//                             <div className="playList__card-background-1"></div>
//                             <div className="playList__card-background-2"></div>
//                             <div className="playList__card-content">
//                                 <div className="playList__card-icon">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
//                                         <g fill="none" fillRule="evenodd">
//                                             <path fill="#FFF" fillRule="nonzero" d="M30.4348573,28.8249931 L31.5651427,27.1750069 C32.2825685,27.666463 33.2372433,28 34,28 C36.2195246,28 38,26.2395819 38,24.0407717 C38,22.0392473 36.644192,20.3168521 34.8203242,19.9837259 L35.1796758,18.0162741 C37.9779593,18.5273756 40,21.0961415 40,24.0407717 C40,27.3492552 37.319054,30 34,30 C32.8062302,30 31.4672115,29.5321839 30.4348573,28.8249931 Z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M.0190094498 16C.0190094498 14.895422.914446835 13.9999846 2.01902531 13.9999846L34.0201851 14C35.1304537 14.0031607 36.0233215 14.9011374 36.0201769 16.0057043 36.0109178 19.2497893 35.3056791 22.3906654 33.9079594 25.4190582 32.5839378 28.2877716 30.6151667 31.2347978 28.0047982 34.2639863 27.0549727 35.3662063 25.6721336 36.0000094 24.217121 36.0000094L18.0101347 36 11.7605016 36C10.3350468 36 8.97735974 35.3915877 8.02865929 34.3276723 5.27231962 31.2365482 3.28716119 28.2589488 2.07836462 25.388057.830636994 22.4247039.144354368 19.3188809.0204676323 16.0763587.0192525245 16.0381886.0192525245 16.0381886.0190094498 16zM3.92163538 24.611943C5.03764438 27.2624644 6.90250444 30.0596246 9.52139187 32.9966015 10.0906127 33.6349513 10.9052278 34 11.7605016 34L18.0101362 34 24.2171225 34.0000094C25.0901303 34.0000094 25.9198347 33.6197271 26.4897308 32.9583942 28.985022 30.0627466 30.851408 27.2689792 32.0920406 24.5809418 33.3702042 21.8115873 34.0117529 18.9543636 34.0201846 15.9999846L2.01900946 15.9999846C2.13372257 19.0024189 2.76761425 21.8711428 3.92163538 24.611943zM17.2928932.292893219C17.6834175-.0976310729 18.3165825-.0976310729 18.7071068.292893219 19.0976311.683417511 19.0976311 1.31658249 18.7071068 1.70710678 18.213657 2.20055655 18 2.62787058 18 3 18 3.57228574 18.1874079 3.97833627 18.8320503 4.9452998 19.6874079 6.22833627 20 6.90561907 20 8 20 8.96120391 19.5469904 9.86722321 18.7071068 10.7071068 18.3165825 11.0976311 17.6834175 11.0976311 17.2928932 10.7071068 16.9023689 10.3165825 16.9023689 9.68341751 17.2928932 9.29289322 17.786343 8.79944345 18 8.37212942 18 8 18 7.42771426 17.8125921 7.02166373 17.1679497 6.0547002 16.3125921 4.77166373 16 4.09438093 16 3 16 2.03879609 16.4530096 1.13277679 17.2928932.292893219zM23.2928932.292893219C23.6834175-.0976310729 24.3165825-.0976310729 24.7071068.292893219 25.0976311.683417511 25.0976311 1.31658249 24.7071068 1.70710678 24.213657 2.20055655 24 2.62787058 24 3 24 3.57228574 24.1874079 3.97833627 24.8320503 4.9452998 25.6874079 6.22833627 26 6.90561907 26 8 26 8.96120391 25.5469904 9.86722321 24.7071068 10.7071068 24.3165825 11.0976311 23.6834175 11.0976311 23.2928932 10.7071068 22.9023689 10.3165825 22.9023689 9.68341751 23.2928932 9.29289322 23.786343 8.79944345 24 8.37212942 24 8 24 7.42771426 23.8125921 7.02166373 23.1679497 6.0547002 22.3125921 4.77166373 22 4.09438093 22 3 22 2.03879609 22.4530096 1.13277679 23.2928932.292893219zM11.2928932.292893219C11.6834175-.0976310729 12.3165825-.0976310729 12.7071068.292893219 13.0976311.683417511 13.0976311 1.31658249 12.7071068 1.70710678 12.213657 2.20055655 12 2.62787058 12 3 12 3.57228574 12.1874079 3.97833627 12.8320503 4.9452998 13.6874079 6.22833627 14 6.90561907 14 8 14 8.96120391 13.5469904 9.86722321 12.7071068 10.7071068 12.3165825 11.0976311 11.6834175 11.0976311 11.2928932 10.7071068 10.9023689 10.3165825 10.9023689 9.68341751 11.2928932 9.29289322 11.786343 8.79944345 12 8.37212942 12 8 12 7.42771426 11.8125921 7.02166373 11.1679497 6.0547002 10.3125921 4.77166373 10 4.09438093 10 3 10 2.03879609 10.4530096 1.13277679 11.2928932.292893219z"></path>
//                                             <path fill="#FFF" fillRule="nonzero" d="M11 22.618034L11 27 17 27 17 22.618034 14 21.118034 11 22.618034zM18.4472136 21.1055728C18.7859976 21.2749648 19 21.6212279 19 22L19 28C19 28.5522847 18.5522847 29 18 29L10 29C9.44771525 29 9 28.5522847 9 28L9 22C9 21.6212279 9.21400238 21.2749648 9.5527864 21.1055728L13 19.381966 13 15C13 14.4477153 13.4477153 14 14 14 14.5522847 14 15 14.4477153 15 15L15 19.381966 18.4472136 21.1055728zM11.236068 36C10.8572959 36 10.5110328 36.2140024 10.3416408 36.5527864L9.61803399 38 26.381966 38 25.6583592 36.5527864C25.4889672 36.2140024 25.1427041 36 24.763932 36L11.236068 36zM11.236068 34L24.763932 34C25.9002482 34 26.9390376 34.6420071 27.4472136 35.6583592L28.1708204 37.1055728C28.6647989 38.0935298 28.2643502 39.2948759 27.2763932 39.7888544 26.9986823 39.9277098 26.6924562 40 26.381966 40L9.61803399 40C8.51346449 40 7.61803399 39.1045695 7.61803399 38 7.61803399 37.6895098 7.69032417 37.3832837 7.82917961 37.1055728L8.5527864 35.6583592C9.06096245 34.6420071 10.0997518 34 11.236068 34z"></path>
//                                             <path d="M0 0H40V40H0z"></path>
//                                         </g>
//                                     </svg>
//                                 </div>
//                                 <div className="playList__card-title">Relax</div>
//                             </div>
//                         </div>
//                         <img className="playList__card-background-image" src={next == "Relax" ? changeBackground() : ''} alt=""
//                             style={next == "Relax" ? { display: 'block' } : { display: 'none' }} />
//                     </div>
//                     <span className="next" id="Relax" style={next == "Relax" ? { display: 'inline-block' } : { display: 'none' }} onClick={() => startPlaylist("Relax", numberImage)} >Next</span>
//                 </div>
//             </div>
//         </div>
//     )
// })
// export default PlayList