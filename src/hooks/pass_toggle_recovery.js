import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faE, faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import "../css/passwordrec.css"
const usePasswordTogglerec = () => {
    const [visible, setVisiblity] = useState(true);

    const Icon = (

        
        <button className="buttonshowhide2">
            <FontAwesomeIcon className="hideicon2" icon={visible ? faEyeSlash : faEye} onClick={() => setVisiblity(visiblity => !visiblity)}></FontAwesomeIcon>
            </button>
    );

    const InputType = visible ? "text" : "password";

    return [InputType,Icon];
};

export default usePasswordTogglerec;