//styles imports
import './Feedback.css'

function Feedback() {
    return (
    <>
        <h1>Send us your feedback!</h1>
        <p>Feedback is important to us because it provides our developers with valuable information to improve the experiences of other users, including yourself.</p>
        <form>
            <label>Name or Nickname:<input required type='text' placeholder='Type Here...'/></label>
            <label>E-Mail:<input required type='Email' placeholder='Type Here...'/></label>
            <label>I have a feedback about
                <select required>
                    <option value="" disabled selected>Select an option</option>
                    <option>Adding a website</option>
                    <option>Editing a website</option>
                    <option>Website issues</option>
                    <option>Other</option>
                </select>
            </label>

            <label>Website Name:<input required type='text' placeholder='Velta-Project'/></label>
            <label>Website URL:<input required type='text' placeholder='www.veltaproject.com'/></label>

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

            <label>Tell us about the issue:<textarea required placeholder='In home page the button...'/></label>

            <label>Comments:<textarea required placeholder='Type here...'/></label>

            <input type="submit" value="Send"/>
        </form>
    </>);
}

export default Feedback;