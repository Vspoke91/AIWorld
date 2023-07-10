//styles imports
import { useEffect, useState } from 'react';
import './Feedback.css'

import { default as contentData } from '../../assets/sitesDataBase' 

function Feedback() {

    const [feedbackRenderElement, setFeedbackRenderElement] = useState(<p>Select An Option Above.</p>);
    const [feedbackType, setFeedbackType] = useState(null);
    const [formSubmited, setFormSubmited] = useState(false);
    const [submitedMessage, setSubmitedMessage] = useState("");

    const feedbackChangeHandler = (event) =>{

        let feedbackTypeString = event.target.value;

        setSubmitedMessage("");

        const getDisplayFormElement = (feedbackType) =>{
            switch(feedbackType){
                case "Adding a website":
                    return(
                        <>
                            <label>Website Name:<input required type='text' placeholder='Velta-Project'/></label>
                            <label>Website URL:<input required type='text' placeholder='www.veltaproject.com'/></label>
                        </>
                    )
                case "Editing a website": {

                    let websiteName = ""
                    let websiteEdit = ""

                    return(
                        <>
                            <label>Website Name:
                                <select 
                                    required 
                                    defaultValue="" 
                                    onChange={(event) => {
                                        websiteName = event.target.value; 
                                        setSubmitedMessage(`For ${websiteName}: ${websiteEdit}`)
                                    }}
                                >
                                    <option value="" disabled>Select an option</option>

                                    {Object.keys(contentData).map( (value, key) => 
                                        <option key={key}>{contentData[value].title}</option>
                                    )}

                                </select>
                            </label>

                            <label>Edit:
                                <textarea 
                                    required 
                                    placeholder='Change description to...' 
                                    onChange={(event) => {
                                        websiteEdit = event.target.value; 
                                        setSubmitedMessage(`For ${websiteName}: ${websiteEdit}`)
                                    }}
                                />
                            </label>
                        </>
                    )
                }
                case "Website issues":
                    return(
                        <>
                            <label>Tell us about the issue:<textarea required placeholder='In home page the button...' 
                            /></label>
                        </>
                    )
                default: 
                    return(
                        <>
                            <label>Comments:<textarea required placeholder='Type here...'/></label>
                        </>
                    )
            }
        }
        setFeedbackRenderElement(getDisplayFormElement(feedbackTypeString))

        setFeedbackType(feedbackTypeString);
    }

    useEffect(() => {
        if ( window.location.search.includes('success') ) {
            setFormSubmited(true);
        }
    }, []);

    return (
    <>
        <h1>Send us your feedback!</h1>
        <p>Feedback is important to us because it provides our developers with valuable information to improve the experiences of other users, including yourself.</p>
        <form name="feedback" data-netlify="true" method="post" action='/feedback/?success'>

            <input type="hidden" name="form-name" value="feedback" />
            <input type="hidden" name="subject" value={`Feedback (%{siteName}) - ${feedbackType} [ID: %{submissionId}]`} />
            <input type="hidden" name="message" value={submitedMessage} />

            <label>Name: <input name='name' type='text' placeholder='Type Here...'/></label>
            <label>E-Mail:<input name='email' type='email' placeholder='Type Here...'/></label>
            <label>I have feedback about
                <select name="about" onChange={feedbackChangeHandler} defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option value='Adding a website'>Adding a website</option>
                    <option value='Editing a website'>Editing a website</option>
                    <option value='Website issues'>Website issues</option>
                    <option value='other'>Other</option>
                </select>
            </label>
            <p>{`message that will send "${submitedMessage}"`}</p>

            {feedbackRenderElement}

            {formSubmited && (
                <p style={{ color: "green" }}>Thanks for your message! </p>
            )}

            <button type="submit">Send</button>
        </form>
    </>);
}

export default Feedback;