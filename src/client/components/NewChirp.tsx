import React from 'react';
import { RouteComponentProps } from "react-router-dom";

export const NewChirp: React.FC<NewChirpProps> = (props: NewChirpProps) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [content, setContent] = React.useState<string>("");

    const postChirp = async () => {
        try {
            const mentionedUserNames = getMentions(content);

            const userRes = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const newUser = await userRes.json();

            const chirpRes = await fetch("/api/chirps/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userid: newUser.insertId, content: content })
            })
            const newChirp = await chirpRes.json();

            mentionedUserNames.forEach(async (name) => {
                const findUserRes = await fetch(`/api/users/one/${name}`);
                const mentionedUser: { id: string } = await findUserRes.json();

                await fetch("/api/mentions/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userid: mentionedUser.id, chirpid: newChirp.insertId })
                })
            })

            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    const getMentions = content => {
        const strArr = content.split(" ");
        let mentions = [];

        strArr.forEach(str => {
            if (str[0] == "@") {
                mentions.push(str.slice(1, str.length));
            }
        })

        return mentions;
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    return (
        <div className="container">
            <div className="my-3">
                <label htmlFor="user-input" className="form-label">Who are you?</label>
                <input type="text" className="form-control" id="user-input" aria-describedby="newUserInput" onChange={e => handleNameChange(e)} />
            </div>
            <div className="my-3">
                <label htmlFor="email-input" className="form-label">Whats your email?</label>
                <input type="text" className="form-control" id="email-input" aria-describedby="newUserInput" onChange={e => handleEmailChange(e)} />
            </div>
            <div className="my-3">
                <label htmlFor="password-input" className="form-label">Password</label>
                <input type="password" className="form-control" id="password-input" aria-describedby="newPasswordInput" onChange={e => handlePasswordChange(e)} />
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="message-input" cols={50} rows={15} onChange={e => handleContentChange(e)}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => postChirp()}>Submit</button>
        </div>
    )
}

interface NewChirpProps extends RouteComponentProps { }

export default NewChirp;