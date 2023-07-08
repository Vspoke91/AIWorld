//styles imports
import { useState } from 'react';
import './Feedback.css'

function Feedback() {

    let [feedbackTypeElement, setFeedbackTypeElement] = useState(<p>Select An Option Above.</p>);

    const feedbackTypeChangeHandler = (event) =>{
        switch(event.target.value){
            case "Adding a website":
                return(
                    <>
                        <label>Website Name:<input required type='text' placeholder='Velta-Project'/></label>
                        <label>Website URL:<input required type='text' placeholder='www.veltaproject.com'/></label>
                    </>
                )
            case "Editing a website":
                return(
                    <>
                        <label>Website Name:
                            <select required>
                                <option value="" disabled selected>Select an option</option>
                                <option>Phind</option>
                                <option>daw</option>
                                <option>Website issues</option>
                                <option>Other</option>
                            </select>
                        </label>
                        <label>Edit:<textarea required placeholder='Change description to...'/></label>
                    </>
                )
            case "Website issues":
                return(
                    <>
                        <label>Tell us about the issue:<textarea required placeholder='In home page the button...'/></label>
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

    return (
    <>
        <h1>Send us your feedback!</h1>
        <p>Feedback is important to us because it provides our developers with valuable information to improve the experiences of other users, including yourself.</p>
        <form name="Feedback" method="POST" data-netlify="true">
            <label>Name: <input name='name' type='text' placeholder='Type Here...' required/></label>
            <label>E-Mail:<input name='email' type='email' placeholder='Type Here...' required/></label>
            <label>I have feedback about
                <select name="about" onChange={(event) => setFeedbackTypeElement(feedbackTypeChangeHandler(event))} required>
                    <option value="" disabled selected>Select an option</option>
                    <option value='Adding a website'>Adding a website</option>
                    <option value='Editing a website'>Editing a website</option>
                    <option value='Website issues'>Website issues</option>
                    <option value='other'>Other</option>
                </select>
            </label>

            {feedbackTypeElement}

            <input type="submit" value="Send"/>
        </form>
    </>);
}

export default Feedback;