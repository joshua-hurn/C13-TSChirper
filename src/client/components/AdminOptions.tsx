import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { chirp } from "../types";

export const AdminOptions: React.FC<AdminOptionsProps> = (props: AdminOptionsProps) => {
    const [chirp, setChirp] = React.useState<chirp>({
        id: "",
        user: "",
        message: ""
    });

    React.useEffect(() => {
        getChirp(props.match.params.id);
    }, []);

    const getChirp = async (id: string) => {
        try {
            let res = await fetch(`/api/chirps/${id}`);
            let chirps = await res.json();
            setChirp(chirps);
        } catch (err) {
            console.log(err);
        }
    }

    const editChirp = async () => {
        try {
            await fetch(`/api/chirps/${props.match.params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(chirp)
            })

            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    const deleteChirp = async () => {
        try {
            await fetch(`/api/chirps/${props.match.params.id}`, {
                method: "DELETE"
            })

            props.history.push("/");
        } catch (err) {
            console.log(err)
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setChirp({
        id: chirp.id,
        user: chirp.user,
        message: e.target.value
    });

    return (
        <div className="container">
            <div className="row">
                <h5 className="card-title">@{chirp.user}</h5>
            </div>
            <div className="mb-3">
                <textarea defaultValue={chirp.message} className="form-control" id="message-input" cols={50} rows={15} onChange={e => handleMessageChange(e)}></textarea>
            </div>
            <button type="button" className="btn btn-primary mx-1" onClick={() => editChirp()}>Submit</button>
            <button type="button" className="btn btn-primary mx-1" onClick={() => deleteChirp()}>Delete</button>
        </div>
    )
}

interface AdminOptionsProps extends RouteComponentProps<{ id: string }> { }

export default AdminOptions;