import React from 'react'

export default function Menu({ setPage, logout, setDropdown, dropdown, playList, openPlayList }) {

    const dr = (e) => {
        e.stopPropagation()
        setDropdown(!dropdown)
    }
    const play = (e) => {
        e.stopPropagation()
        openPlayList(!dropdown)
    }

    return (
        <div className="menu">
            <div className="logo">
                <div onClick={() => setPage('body')}>Noise</div>
            </div>
            <div className="gear" onClick={(e) => dr(e)}>
                <div id="svg-222">
                    <svg className={dropdown ? "settings-active" : "settings"} width="20" height="20" viewBox="0 0 20 20">
                        <g strokeLinecap="round" strokeLinejoin="round" fill="#ffffff" fillRule="nonzero">
                            <path d="M11.305 2.259l-.66.724a.869.869 0 01-1.29.002l-.658-.726a1.869 1.869 0 00-3.25 1.344l.047.98a.87.87 0 01-.912.916l-.98-.05A1.869 1.869 0 002.258 8.7l.727.66a.87.87 0 01.001 1.292l-.727.657a1.869 1.869 0 001.35 3.251l.978-.05a.868.868 0 01.912.912l-.05.979a1.87 1.87 0 003.249 1.346l.66-.728a.87.87 0 011.29-.001l.658.728a1.87 1.87 0 003.248-1.343l-.05-.982a.869.869 0 01.912-.912l.978.05a1.869 1.869 0 001.348-3.254l-.728-.657a.87.87 0 010-1.29l.728-.657a1.87 1.87 0 00-1.345-3.254l-.979.05a.867.867 0 01-.908-.911l.05-.978a1.869 1.869 0 00-3.254-1.348zm1.72.45c.34.14.553.48.535.847l-.05.979a1.869 1.869 0 001.957 1.96l.98-.05a.869.869 0 01.624 1.513l-.728.656a1.87 1.87 0 000 2.776l.728.657a.869.869 0 01-.627 1.512l-.978-.05a1.868 1.868 0 00-1.961 1.962l.05.978a.868.868 0 01-1.51.623l-.655-.725a1.869 1.869 0 00-2.774 0l-.66.726a.868.868 0 01-1.51-.625l.05-.975a1.868 1.868 0 00-1.961-1.962l-.978.05a.868.868 0 01-.629-1.511l.727-.657a1.87 1.87 0 000-2.775l-.726-.66a.869.869 0 01.625-1.51l.976.05a1.867 1.867 0 001.963-1.966l-.047-.976a.869.869 0 011.51-.625l.657.724a1.867 1.867 0 002.774 0l.659-.724a.87.87 0 01.979-.222z"></path>
                            <path d="M10 6.643a3.357 3.357 0 100 6.714 3.357 3.357 0 000-6.714zm0 1a2.357 2.357 0 110 4.714 2.357 2.357 0 010-4.714z"></path>
                        </g>
                    </svg>
                </div>
                <div className={dropdown ? "dropdown-active" : "dropdown"} >
                    <div className="dropdown-btn" onClick={() => setPage('account')}>Account</div>
                    <div className="dropdown-btn" >Stop</div>
                    <div className="dropdown-btn" onClick={() => logout()}>Log Out</div>
                </div>
            </div>
            <svg className={playList ? "playList-active" : "playList"} viewBox="0 0 256 256" onClick={(e) => play(e)}>
                <rect width="256" height="256" fill="none" />
                <path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M132.41106,190.73266l50.43543,31.95385c6.44693,4.08451,14.45124-1.99032,12.53819-9.51579l-14.57192-57.32241a8.75742,8.75742,0,0,1,2.83756-8.87589l45.2273-37.64345c5.94268-4.9462,2.87542-14.80876-4.75965-15.30428l-59.06388-3.83326a8.41836,8.41836,0,0,1-7.24792-5.3506l-22.02834-55.473a8.31887,8.31887,0,0,0-15.55566,0L98.19383,84.84083a8.41836,8.41836,0,0,1-7.24792,5.3506L31.882,94.02469c-7.63507.49552-10.70233,10.35808-4.75965,15.30428l45.2273,37.64345a8.75742,8.75742,0,0,1,2.83756,8.87589L61.6734,209.00846c-2.29566,9.03056,7.30952,16.32036,15.04583,11.41895l46.86971-29.69475A8.21431,8.21431,0,0,1,132.41106,190.73266Z" />
            </svg>
        </div>
    )
}
