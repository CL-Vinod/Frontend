import React,{useEffect,useState} from "react";
import "../css/resetPassword.css"
import Footer from './footer'
import Header from './header'
import {Link,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

import data from "./questions.json"


import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from "formik";
import * as yup from 'yup';



export default function Resetpassword() {

    const navigate = useNavigate()

    const [isCheckboxTicked, setIsCheckboxTicked] = useState(true);

    // states containing values of 3 questions selected by user(handled seperately and not using formik)
    const [value_Question1, setValue_Question1] = useState("default");
    const [value_Question2, setValue_Question2] = useState("default");
    const [value_Question3, setValue_Question3] = useState("default");

    // const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    //   );

    //   const reset_alert = async event => {

    //     toast.success("Pasword succesfully reset", {
    //       position: "top-right",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true, 
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       icon: {faTriangleExclamation},

    //     }

    //   ); 

    //   await delay(3000);

    // console.log('after');

    // navigate("/login_user")
    //   }


    // states containing values of 3 questions previously selected by user before the user wants to change the question selected( these are used inside handleSelect functions)
    const [previousOption1, setPreviousOption1] = useState(null);
    const [previousOption2, setPreviousOption2] = useState(null);
    const [previousOption3, setPreviousOption3] = useState(null);

    // password visibility state to toggle the eye icon

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      const reset_alert = async event => {

        toast.success("Pasword succesfully reset", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true, 
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: {faTriangleExclamation},
        
        }
      
      ); 
      
      await delay(3000);
    
    console.log('after');
    
    navigate("/login_user")
      }

    const [optionElements, setOptionElements] = useState(null);

    // formik is used to handle the inputs (* note that 3 states of questions are not handled by formik but
    //  under the onsubmit function of formik , the 3 questions are posted along with other states using JSON)

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
            answer1: "",
            answer2: "",
            answer3: ""

        },
        validationSchema: yup.object({

            newPassword: yup.string()
                .required('Please Enter Password')
                .min(8, 'Password must be minimum 8 characters')
                .max(16, 'Passsword cannot be more than 16 characters'),
            // .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/, 'Password is not strong enough'),

            confirmPassword: yup.string()
                .required('Please Re-enter Password')
                .when("newPassword", {
                    is: val => (val && val.length > 0 ? true : false),
                    then: yup.string().oneOf(
                        [yup.ref("newPassword")],
                        "Both Password need to be the same"),
                }),


            answer1: yup.string()
                .required('Please enter the answer'),

            answer2: yup.string()
                .required('Please enter the answer'),

            answer3: yup.string()
                .required('Please enter the answer')

        }),
        onSubmit: values => {

            if (!isCheckboxTicked) {
                alert("Please select the option to agree with the user terms and conditions to continue");
                return
            }
 
            const questions = {
                question1: value_Question1,
                question2: value_Question2,
                question3: value_Question3
            }
         
            // const data = {
            //     questions: questions,
            //     values: values
            // }
            const a= {...formik.getFieldProps("newPassword")}
            const b={...formik.getFieldProps("confirmPassword")}
            const c={...formik.getFieldProps("answer1")}
            const d={...formik.getFieldProps("answer2")}
            const e={...formik.getFieldProps("answer3")}

            const newPassword = a.value;
            const confirmPassword = b.value;
            const question1 = questions["question1"];
            const question2 = questions["question2"];
            const question3 = questions["question3"];
            const answer1 = c.value;
            const answer2 = d.value;
            const answer3 = e.value;
            
            Axios.post('http://localhost:3001/resetpassword', {newPassword, confirmPassword, question1, question2, question3, answer1, answer2, answer3}).then((response)=>{  //a post axios request to send the info into the backend (we are sending it to the api having url 3001)
          if(response.data.message == "Passwords don't match"){
            alert("Passwords don't match");
            console.log(response.data.message);
        }else
        {
              reset_alert();
              navigate("/login_user");
          }

        })

        }
        
    });
        
        
  



    // To load up the questions from json file
    useEffect(() => {
        setOptionElements(
            data.questions.map((question) =>
                <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
            ))

    }, [])

    // checkbox state
    const toggleCheckbox = () => {
        setIsCheckboxTicked(!isCheckboxTicked);
    }

    // functions for handling selection of the combination of 3 questions, 3 different functions are used for handling 3 questions
    const handleSelect1 = (e) => {

        if (previousOption1 === null) {
            const newOptions =
                data.questions.map((question) => {

                    if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                        setPreviousOption1(question);
                        setValue_Question1(e.target.value)
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                    }
                    if ((previousOption2 && question.id === previousOption2.id) || (previousOption3 && question.id === previousOption3.id)) {
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                    }
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

                }

                )
            console.log(newOptions)
            setOptionElements(newOptions);
        }
        else {
            const previous_copy = previousOption1;

            const newOptions = data.questions.map((question) => {

                if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                    setPreviousOption1(question);
                    setValue_Question1(e.target.value)
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                if (question.id === previous_copy.id) {
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
                }
                if ((previousOption2 && question.id === previousOption2.id) || (previousOption3 && question.id === previousOption3.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

            }
            )
            // console.log(...newOptions)
            setOptionElements(newOptions)
        }

    }

    const handleSelect2 = (e) => {

        if (previousOption2 === null) {
            const newOptions =
                data.questions.map((question) => {

                    if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                        setPreviousOption2(question);
                        setValue_Question2(e.target.value)
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                    }
                    if ((previousOption3 && question.id === previousOption3.id) || (previousOption1 && question.id === previousOption1.id)) {
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                    }
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

                }

                )
            console.log(newOptions)
            setOptionElements(newOptions);
        }
        else {
            const previous_copy = previousOption2;



            const newOptions = data.questions.map((question) => {

                if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                    setPreviousOption2(question);
                    setValue_Question2(e.target.value)
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                if (question.id === previous_copy.id) {
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
                }
                if ((previousOption3 && question.id === previousOption3.id) || (previousOption1 && question.id === previousOption1.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

            }
            )

            setOptionElements(newOptions)
        }

    }


    const handleSelect3 = (e) => {

        if (previousOption3 === null) {
            const newOptions =
                data.questions.map((question) => {

                    if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                        setPreviousOption3(question);
                        setValue_Question3(e.target.value)
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                    }
                    if ((previousOption2 && question.id === previousOption2.id) || (previousOption1 && question.id === previousOption1.id)) {
                        return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                    }
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

                }

                )
            console.log(newOptions)
            setOptionElements(newOptions);
        }
        else {
            const previous_copy = previousOption3;

            // setOptionElements(optionElements.filter((ele) => parseInt(e.target.selectedOptions[0].id) !== ele.props.id))


            const newOptions = data.questions.map((question) => {

                if (question.id === parseInt(e.target.selectedOptions[0].id)) {
                    setPreviousOption3(question);
                    setValue_Question3(e.target.value)
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                if (question.id === previous_copy.id) {
                    return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
                }
                if ((previousOption2 && question.id === previousOption2.id) || (previousOption1 && question.id === previousOption1.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>;
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>

            }
            )

            setOptionElements(newOptions)
        }

    }

    // functions for canceling the question selected 

    const cancelSelect1 = (e) => {

        setValue_Question1("default");
        const newOptions = data.questions.map(
            (question) => {

                if ((previousOption2 && question.id === previousOption2.id) || (previousOption3 && question.id === previousOption3.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
            }
        )
        setOptionElements(newOptions);
        setPreviousOption1(null);

    }
    const cancelSelect2 = (e) => {




        setValue_Question2("default");
        const newOptions = data.questions.map(
            (question) => {
                // if (previousOption1.id === question.id) return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
                if ((previousOption1 && question.id === previousOption1.id) || (previousOption3 && question.id === previousOption3.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
            }
        )
        setOptionElements(newOptions);
        setPreviousOption2(null);

    }
    const cancelSelect3 = (e) => {

        // const data = [...optionElements, previousOption1]
        // setOptionElements(data);


        setValue_Question3("default");
        const newOptions = data.questions.map(
            (question) => {
                // if (previousOption1.id === question.id) return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
                if ((previousOption2 && question.id === previousOption2.id) || (previousOption1 && question.id === previousOption1.id)) {
                    return <option key={question.id} id={question.id} hidden={true} value={question.question} >{question.question}</option>
                }
                return <option key={question.id} id={question.id} hidden={false} value={question.question} >{question.question}</option>
            }
        )
        setOptionElements(newOptions);
        setPreviousOption3(null);

    }


   

    return (
        <>
            <Header />

            <div className='resetPasswordContainer'>
                <div className='resetPasswordTop'>
                    <div className='resetPasswordTitle'>Create a new Password</div>
                    <p className='resetPasswordSubtitle'>It's quick and easy</p>
                </div>



                <form action="" onSubmit={formik.handleSubmit}>

                    {/* contains all the fields of the form, new password, confirm password and security questions and answers */}

                    <div className="resetPasswordMiddle">


                        {/* contains new password, confirm password and visibility icon (eye icon) */}
                        <div className="resetPasswordMiddle_top">
                            <div className='resetPassword_password_fields'>
                                <div style={{
                                    width: "337px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingRight: "8px",
                                    alignItems: "center"
                                }}>
                                    <label htmlFor="newPassword" className='resetPasswordLabel'>New Password</label>
                                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="eyeIcon" />

                                </div>

                                <input className='resetPasswordInput password_input' type={isPasswordVisible ? "text" : "password"} name='newPassword' placeholder='Enter new password' style={{ color: isPasswordVisible ? "rgba(47, 49, 52, 0.9)" : "black" }} {...formik.getFieldProps("newPassword")} />

                            </div>

                            <div className='resetPassword_password_fields'>
                                <label htmlFor="confirmPassword" className='resetPasswordLabel' >Confirm Password</label>
                                <input className='resetPasswordInput password_input' type={isPasswordVisible ? "text" : "password"} name='confirmPassword' placeholder='Re-enter new password'{...formik.getFieldProps("confirmPassword")} style={{ color: isPasswordVisible ? "rgba(47, 49, 52, 0.9)" : "black" }} />
                            </div>
                        </div>

                        {/* password strength bar */}

                        <div className="resetPasswordMiddle_bottom">
                            <div className='resetPassword_page_meter'><PasswordStrengthMeter className="resetPassword_page_meter " password={formik.values.newPassword} />

                            </div>
                            {formik.touched.newPassword && formik.errors.newPassword ? <span className="error_message">{formik.errors.newPassword} </span> : null}

                            {formik.touched.confirmPassword && !formik.errors.newPassword && formik.errors.confirmPassword ? <span className='error_message'>{formik.errors.confirmPassword}</span> : null}

                        </div>
                    </div>


                    {/* contains security questions(label and input) , cancel button and answers(label and input) */}

                    <div className='security_questions_container'>


                        {/* INDIVIDUAL security question section-1 containing question(label and input) , cancel button and answer(label and input)  */}

                        <div className="security_question_section">

                            <label>
                                <p className='resetPasswordLabel'> Security question 1
                                </p>
                                <select value={value_Question1} onChange={(e) => handleSelect1(e)} className="question_select resetPasswordInput">
                                    <option value="default" disabled hidden>Choose a question</option>
                                    {optionElements}
                                </select>
                            </label>

                            <FontAwesomeIcon style={{ visibility: value_Question1 === "default" ? "hidden" : "visible" }} key={1} icon={faCircleXmark} className="xmark" onClick={cancelSelect1} />

                            <div className="answer_section">
                                <label className='resetPasswordLabel' > Answer
                                </label>
                                <input type="text" name='answer1' className='security_answer resetPasswordInput ' {...formik.getFieldProps("answer1")} placeholder='Enter your answer' />

                            </div>

                        </div>

                        <div className="error_messages_container">
                            <p className="error_message error_message_left" style={{ visibility: value_Question1 !== "default" ? "hidden" : "visible" }}>Please select a security question here </p>
                            <p className="error_message error_message_right">{formik.touched.answer1 && formik.errors.answer1 ? <span >{formik.errors.answer1}</span> : null}
                            </p>
                        </div>

                        {/* INDIVIDUAL security question-2 section containing question(label and input) , cancel button and answer(label and input)  */}


                        <div className="security_question_section">

                            <label>
                                <p className='resetPasswordLabel'> Security question 2
                                </p>
                                <select value={value_Question2} onChange={(e) => handleSelect2(e)} className="question_select resetPasswordInput">
                                    <option value="default" disabled hidden>Choose a question</option>
                                    {optionElements}

                                </select>
                            </label>

                            <FontAwesomeIcon key={2} icon={faCircleXmark} className="xmark" style={{ visibility: value_Question2 === "default" ? "hidden" : "visible" }} onClick={cancelSelect2} />


                            <div className="answer_section">
                                <label className='resetPasswordLabel' > Answer
                                </label>
                                <input type="text" name='answer2' className='security_answer resetPasswordInput ' {...formik.getFieldProps("answer2")} placeholder='Enter your answer' />
                            </div>

                        </div>

                        <div className="error_messages_container">
                            <p className="error_message error_message_left" style={{ visibility: value_Question2 !== "default" ? "hidden" : "visible" }}>Please select a security question here </p>
                            <p className="error_message error_message_right">{formik.touched.answer2 && formik.errors.answer2 ? <span >{formik.errors.answer2}</span> : null}</p>
                        </div>

                        {/* INDIVIDUAL security question-3 section containing question(label and input) , cancel button and answer(label and input)  */}


                        <div className="security_question_section">

                            <label>
                                <p className='resetPasswordLabel'> Security question 3
                                </p>
                                <select value={value_Question3} onChange={(e) => handleSelect3(e)} className="question_select resetPasswordInput">
                                    <option value="default" disabled hidden>Choose a question</option>
                                    {optionElements}
                                </select>
                            </label>

                            <FontAwesomeIcon key={3} icon={faCircleXmark} className="xmark" onClick={cancelSelect3} style={{ visibility: value_Question3 === "default" ? "hidden" : "visible" }} />


                            <div className="answer_section">
                                <label className='resetPasswordLabel' > Answer
                                </label>
                                <input type="text" name='answer3' className='security_answer resetPasswordInput ' placeholder='Enter your answer' {...formik.getFieldProps("answer3")} />

                            </div>

                        </div>

                        <div className="error_messages_container">
                            <p className="error_message error_message_left" style={{ visibility: value_Question3 !== "default" ? "hidden" : "visible" }}>Please select a security question here </p>
                            <p className="error_message error_message_right">{formik.touched.answer3 && formik.errors.answer3 ? <span >{formik.errors.answer3}</span> : null}
                            </p>
                        </div>

                    </div>


                    {/* contains checkbox, signup text and submit button */}

                    <div className="resetPasswordBottom">
                        {
                            isCheckboxTicked ? <FontAwesomeIcon icon={faSquareCheck} className="square_check resetPasswordBottom_item" onClick={toggleCheckbox} /> : <FontAwesomeIcon icon={faSquare} className="square_check resetPasswordBottom_item" onClick={toggleCheckbox} />
                        }

                        <p className='signupCheckText resetPasswordBottom_item'>By signing up you accept the <span>terms of service</span> and <span>
                            privacy policy </span></p>
                        <button class='submitButton resetPasswordBottom_item'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}