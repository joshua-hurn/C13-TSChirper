import React from 'react';
import { RouteComponentProps } from "react-router-dom";

export const NewChirp: React.FC<NewChirpProps> = (props: NewChirpProps) => {
    const [user, setUser] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");

    const postChirp = async () => {
        try {
            await fetch("/api/chirps/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: user, message: message })
            })

            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

    return (
        <div className="container">
            <div className="my-3">
                <label htmlFor="user-input" className="form-label">Who are you?</label>
                <input type="text" className="form-control" id="user-input" aria-describedby="newUserInput" onChange={e => handleUserChange(e)} />
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="message-input" cols={50} rows={15} onChange={e => handleMessageChange(e)}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => postChirp()}>Submit</button>
        </div>
    )
}

interface NewChirpProps extends RouteComponentProps {}

export default NewChirp;