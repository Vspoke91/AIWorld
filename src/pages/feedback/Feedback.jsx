//styles imports
import { useRef, useState, useEffect } from 'react';
import './Feedback.css'
import {default as database} from '../../assets/database/firebase'

function Feedback() {

    const [feedbackRenderElement, setFeedbackRenderElement] = useState(<></>);
    const [feedbackType, setFeedbackType] = useState(null);
    const [formSubmited, setFormSubmited] = useState(false);
    const [submitedMessage, setSubmitedMessage] = useState("");

    //--DATABASE--//
    let [websitesData, setWebsitesData] = useState([]);

    useEffect(() => {
    (async function(){
        setWebsitesData(await database.getWebsites())
    })();
    },[])
    //-|DATABASE|-//

    const formRef = useRef();

    const feedbackChangeHandler = (event) =>{

        let feedbackTypeString = event.target.value;

        setSubmitedMessage("");

        formRef.current.reset()

        event.target.value = feedbackTypeString;

        const getDisplayFormElement = (feedbackType) =>{

            switch(feedbackType){
                case "Adding a website":{

                    let nameText = ""
                    let urlText = ""
                    let commentText = ""

                    let getMessage = () => `Website: ${nameText} URL: ${urlText} Comment: ${commentText}`

                    return(
                        <>
                            <div className='inline'>
                                <label>Website Name:
                                    <div className='required'/>
                                    <input 
                                        required 
                                        type='text' 
                                        placeholder='Velta-Project'
                                        onChange={(event) => {
                                            nameText = event.target.value
                                            setSubmitedMessage(getMessage())
                                        }}
                                    />
                                </label>
                                <label>Website URL:
                                    <div className='required'/>
                                    <input 
                                        required 
                                        type='text' 
                                        placeholder='www.veltaproject.com'
                                        onChange={(event) => {
                                            urlText = event.target.value
                                            setSubmitedMessage(getMessage())
                                        }}
                                    />
                                </label>
                            </div>
                            <label>Comment:
                                <textarea   
                                    placeholder='Website is for...'
                                    onChange={(event) => {
                                        urlText = event.target.value
                                        setSubmitedMessage(getMessage())
                                    }}
                                />
                            </label>
                        </>
                    )
                }
                case "Editing a website": {

                    let nameText = ""
                    let editText = ""

                    return(
                        <>
                            <label>Website Name:
                                <select 
                                    className='singleLine'
                                    required 
                                    defaultValue="" 
                                    onChange={(event) => {
                                        nameText = event.target.value; 
                                        setSubmitedMessage(`For ${nameText}: ${editText}`)
                                    }}
                                >
                                    <option value="" disabled>Select an option</option>

                                    {Object.keys(websitesData).map( (value, key) => 
                                        <option key={key}>{websitesData[value].name}</option>
                                    )}
                                </select>

                                <div className='required'/>
                            </label>

                            <label>Edit:
                                <div className='required'/>
                                <textarea 
                                    required 
                                    placeholder='Change description to...' 
                                    onChange={(event) => {
                                        editText = event.target.value; 
                                        setSubmitedMessage(`For ${nameText}: ${editText}`)
                                    }}
                                />
                            </label>
                        </>
                    )
                }
                case "Website issues":{
                    return(
                        <>
                            <label>Tell us about the issue:
                                <div className='required'/>
                                <textarea 
                                    required 
                                    placeholder='In home page the button...' 
                                    onChange={(event) => setSubmitedMessage(event.target.value)}
                                />
                            </label>
                        </>
                    )
                }
                case "Other": {
                    let subjectText = ""
                    let commentText = ""

                    return(
                        <>
                            <label>Subject: 
                                <div className='required'/>
                                <input
                                    required
                                    type='text'
                                    placeholder='Type here...'
                                    onChange={(event) =>{
                                        subjectText = event.target.value
                                        setSubmitedMessage(`${subjectText}: ${commentText}`)
                                    }}
                                />
                            </label>

                            <label>Comments:
                                <div className='required'/>
                                <textarea 
                                    required
                                    placeholder='Type here...'
                                    onChange={(event) => {
                                        commentText = event.target.value
                                        setSubmitedMessage(`${subjectText}: ${commentText}`)
                                    }}
                                />
                            </label>
                        </>
                    )
                }
            }
        }
        setFeedbackRenderElement(getDisplayFormElement(feedbackTypeString))

        setFeedbackType(feedbackTypeString)
    }

    const formSubmitHandler = (event) => {
    
        const formData = new FormData(event.target);

        fetch('/', { // '/' will change to endpoint by netlify
          method: 'POST',
          body: formData
        })
          .then(response => {
            if (response.ok) {
                setFormSubmited(true);
                event.target.reset(); // reset form
            } else {
                alert('Feedback Fail to Submit!');
            }
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
        
          event.preventDefault();
    };

    return (
    <>
        <div id='IntroductionSection_Feedback'>
            <h1>Send us your feedback!</h1>
            <p>Feedback is important to us because it provides our developers with valuable information to improve the experiences of our users, including yourself.</p>
        </div>
        <div id='FormSection_Feedback'>
            {formSubmited ? 
                (
                    <div className='successful_part'>
                        <p><span>Your feedback was succefully send!</span> Thank you for your support.</p>
                        <button onClick={() => setFormSubmited(false)}><div className='arrow'></div>Back</button>
                    </div>
                ) 
                :
                (
                    <div className='form_part'>
                        <form ref={formRef} name="feedback" data-netlify="true" onSubmit={formSubmitHandler}>

                            <input type="hidden" name="form-name" value="feedback" />
                            <input type="hidden" name="subject" value={`Feedback (%{siteName}) - ${feedbackType} [ID: %{submissionId}]`} />
                            <input type="hidden" name="message" value={submitedMessage} />

                            <label>I have feedback about
                                <select className='singleLine' required name="about" onChange={feedbackChangeHandler} defaultValue="">
                                    <option value="" disabled>Select an option</option>
                                    <option value='Adding a website'>Adding a website</option>
                                    <option value='Editing a website'>Editing a website</option>
                                    <option value='Website issues'>Website issues</option>
                                    <option value='Other'>Other</option>
                                </select>
                                <div className='required'/>
                            </label>
                            <div className='inline'>
                                <label>Name:<div className='required'/><input required name='name' type='text' placeholder='Type Here...'/></label>
                                <label>E-Mail:<div className='required'/><input required name='email' type='email' placeholder='Type Here...'/></label>
                            </div>

                            {feedbackRenderElement}

                            <button type="submit">Send</button>
                        </form>
                    </div>
                )
            }
        </div>
    </>);
}

export default Feedback;