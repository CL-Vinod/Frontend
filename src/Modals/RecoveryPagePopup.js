import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';

import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function RecoveryPagePopup({messageType, popupText, handleClick, isModalActive}) {
    return (
        <>
            {
                isModalActive && <div className='popup_modal'>
                    <div className="overlay" onClick={handleClick}></div>
                    <div className={`popup ${messageType} `} >
                        <div className={`popupIcon  ${messageType === "successPopup" ? "fasquareSuccess" : "faSquareFailure"} `}>
                            <div className='popupIcon_inside_circle '>
                                {messageType === "successPopup" ?
                                    <FontAwesomeIcon className='popupIcon faCircleCheck' icon={faCircleCheck} /> :
                                    <FontAwesomeIcon className='popupIcon faTriangleExclamation' icon={faTriangleExclamation} />
                                }
                            </div>
                        </div>

                        <div className='popupText'>{popupText}</div>

                        <div className='popupIcon_inside_circle' id='popup_cancel_button_section'>

                            <FontAwesomeIcon icon={faXmark} className='popup_cancel_button' onClick={handleClick} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RecoveryPagePopup