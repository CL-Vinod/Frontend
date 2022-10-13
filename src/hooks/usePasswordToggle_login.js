import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faE, faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import "../css/login.css"
const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(true);

    const Icon = (

        
        <button className="buttonshowhide">
            <FontAwesomeIcon className="hideicon" icon={visible ? faEyeSlash : faEye} onClick={() => setVisiblity(visiblity => !visiblity)}></FontAwesomeIcon>
            </button>
    );

    const InputType = visible ? "text" : "password";

    return [InputType,Icon];
};

export default usePasswordToggle;