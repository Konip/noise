import React from 'react'

interface TooltipUpgradeProps {
    openRegistrationTool(): void
}

const TooltipUpgrade: React.FC<TooltipUpgradeProps> = ({ openRegistrationTool }) => {
    return (
        <div className="tool" >
            <span id='text'>These Sounds<br />
                are a <strong id='pro' onClick={openRegistrationTool}>Sign up</strong> feature.<br />
                Upgrade to enjoy them.</span>
        </div>
    )
}
export default TooltipUpgrade
