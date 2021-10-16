import React from 'react'

export default function TooltipUpgrade({openRegistrationTool}) {
    return (
        <div className="tool" >
        <span id='text'>These Sounds<br />
            are a <strong id='pro' onClick={openRegistrationTool}>Sign up</strong> feature.<br />
            Upgrade to enjoy them.</span>
    </div>
    )
}
