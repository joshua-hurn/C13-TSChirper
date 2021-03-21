import React from 'react';
import { chirp } from '../types';
import { Link } from "react-router-dom";

export const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const [chirps, setChirps] = React.useState<any[]>([]);

    React.useEffect(() => {
        getChirps();
    }, []);

    const getChirps = async () => {
        try {
            const res = await fetch("/api/chirps");
            const rawChirpData = await res.json();
            const chirps = await Promise.all(rawChirpData.map(async chirp => {
                const userRes = await fetch(`/api/users/${chirp.userid}`);
                const rawUserData = await userRes.json();

                const mentions = await getMentions(rawUserData.id);
                mentions.pop();

                return {
                    id: chirp.id,
                    userid: chirp.userid,
                    content: chirp.content,
                    created_at: chirp.created_at,
                    username: rawUserData.name,
                    mentions: mentions
                }
            }))
            setChirps(chirps.reverse());
        } catch (error) {
            console.log(error);
        }
    }

    const getMentions = async (id: string) => {
        const res = await fetch(`/api/mentions/${id}`);
        return await res.json();
    }

    return (
        <div className="container mt-5">
            {chirps.map(chirp => (
                <>
                    <div className="card my-3" key={chirp.id}>
                        <div className="card-body">
                            <h5 className="card-title chirp-name" data-toggle="modal" data-target={`#triggerMentions${chirp.id}`}>
                                @{chirp.username}
                            </h5>
                            <p className="card-text">{chirp.content}</p>
                            <Link to={`/chirp/${chirp.id}`}>
                                <button type="button" className="btn btn-secondary btn-sm">Admin Options</button>
                            </Link>
                        </div>
                    </div>

                    <div className="modal fade" tabIndex={-1} role="dialog" id={`triggerMentions${chirp.id}`}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Here's where @{chirp.username} has been mentioned</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {chirp.mentions?.map((mentionedChirp, index) => {
                                        console.log(mentionedChirp[0]?.content);
                                        return (
                                            <div className="card" key={index}>
                                                <div className="card-body">
                                                    <p className="card-text">{mentionedChirp[0]?.content}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

interface HomeProps { }

export default Home