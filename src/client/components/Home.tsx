import React from 'react';
import { chirp } from '../types';
import { Link } from "react-router-dom";

export const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const [chirps, setChirps] = React.useState<chirp[]>([]);

    React.useEffect(() => {
        getChirps();
    }, []);

    const getChirps = async () => {
        try {
            let res = await fetch("/api/chirps");
            let chirps = await res.json();
            setChirps(chirps);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            {chirps.map(chirp => (
                <div className="card" key={chirp.id}>
                    <div className="card-body">
                        <h5 className="card-title">{ chirp.user}</h5>
                        <p className="card-text">{chirp.message }</p>
                        <Link to={`/chirp/${chirp.id}`}>
                            <button type="button" className="btn btn-secondary btn-sm">Admin Options</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

interface HomeProps { }

export default Home