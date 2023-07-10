//styles imports
import { useState } from 'react';
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
                case "Adding a website":{

                    let nameText = ""
                    let urlText = ""
                    let commentText = ""

                    let getMessage = () => `Website: ${nameText} URL: ${urlText} Comment: ${commentText}`

                    return(
                        <>
                            <label>Website Name:
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
                                    required 
                                    defaultValue="" 
                                    onChange={(event) => {
                                        nameText = event.target.value; 
                                        setSubmitedMessage(`For ${nameText}: ${editText}`)
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

        setFeedbackType(feedbackTypeString);
    }

    return (
    <>
        <h1>Send us your feedback!</h1>
        <p>Feedback is important to us because it provides our developers with valuable information to improve the experiences of other users, including yourself.</p>
        
        {formSubmited ? 
            (
                <>
                    <p style={{ color: "green" }}>Feedback Succefully Submited!</p>
                    <a href="/feedback"><button>Send New Feedback!</button></a>
                </>
            ) 
            :
            (
                <>
                    <form name="feedback" data-netlify="true" method="post">

                        <input type="hidden" name="form-name" value="feedback" />
                        <input type="hidden" name="subject" value={`Feedback (%{siteName}) - ${feedbackType} [ID: %{submissionId}]`} />
                        <input type="hidden" name="message" value={submitedMessage} />

                        <label>Name: <input required name='name' type='text' placeholder='Type Here...'/></label>
                        <label>E-Mail:<input required name='email' type='email' placeholder='Type Here...'/></label>
                        <label>I have feedback about
                            <select name="about" onChange={feedbackChangeHandler} defaultValue="">
                                <option value="" disabled>Select an option</option>
                                <option value='Adding a website'>Adding a website</option>
                                <option value='Editing a website'>Editing a website</option>
                                <option value='Website issues'>Website issues</option>
                                <option value='Other'>Other</option>
                            </select>
                        </label>
                        <p>{`message that will send "${submitedMessage}"`}</p>

                        {feedbackRenderElement}

                        <button type="submit">Send</button>
                    </form>
                </>
            )
        }
    </>);
}

export default Feedback;