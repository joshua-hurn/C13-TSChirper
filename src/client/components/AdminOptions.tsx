import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { chirp } from "../types";

export const AdminOptions: React.FC<AdminOptionsProps> = (props: AdminOptionsProps) => {
    const [chirp, setChirp] = React.useState<any>({
        id: "",
        userid: 0,
        username: "",
        content: "",
        created_at: "",
    });

    React.useEffect(() => {
        getChirpAndUser(props.match.params.id);
    }, []);

    const getChirpAndUser = async (id: string) => {
        try {
            const res = await fetch(`/api/chirps/${id}`);
            const chirp = await res.json();
            const userRes = await fetch(`/api/users/${chirp.userid}`);
            const user = await userRes.json();
            setChirp({
                id: chirp.id,
                userid: chirp.userid,
                content: chirp.content,
                username: user.name,
                created_at: chirp.created_at,
            });
        } catch (err) {
            console.log(err);
        }
    }

    const editChirp = async () => {
        try {
            let res = await fetch(`/api/chirps/${props.match.params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(chirp)
            });

            if (res.ok) {
                props.history.push("/");
            } else {
                // handle an error
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteChirp = async () => {
        try {
            await fetch(`/api/mentions/${props.match.params.id}`, {
                method: "DELETE"
            });

            await fetch(`/api/chirps/${props.match.params.id}`, {
                method: "DELETE"
            });

            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setChirp({
        id: chirp.id,
        username: chirp.username,
        content: e.target.value
    });

    return (
        <div className="container">
            <div className="row">
                <h5 className="card-title">@{chirp.username}</h5>
            </div>
            <div className="mb-3">
                <textarea defaultValue={chirp.content} className="form-control" id="message-input" cols={50} rows={15} onChange={e => handleMessageChange(e)}></textarea>
            </div>
            <button type="button" className="btn btn-primary mx-1" onClick={() => editChirp()}>Submit</button>
            <button type="button" className="btn btn-primary mx-1" onClick={() => deleteChirp()}>Delete</button>
        </div>
    )
}

interface AdminOptionsProps extends RouteComponentProps<{ id: string }> { }

export default AdminOptions;