import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stlying/Nba.css'
const apiBaseUrl = 'https://boxscoreapi-263655f53c81.herokuapp.com/';
function Nba() {
    const [gameData, setGameData] = useState(null);
    const [awayteam, setAwayTeam] = useState(null);
    const [awaystats, setStats] = useState(null);
    const [hometeam, setHomeTeam] = useState(null);
    const [homestats, setHomeStats] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/api/feed/nba`);
                console.log('API response data:', response.data);
                setGameData(response.data.gameData);
                setAwayTeam(response.data.gameData.away_team.full_name);
                setStats(response.data.gameData.away_stats);
                setHomeTeam(response.data.gameData.home_team.full_name);
                setHomeStats(response.data.gameData.home_stats);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!gameData) {
        return <div>Loading...</div>;
    }


    return (<div className="contain">
        <h2>Game Details</h2>
        <h3>{awayteam} vs {hometeam}</h3>
        <div className="nba-game">

            <div className="sections">
                <div className="team">
                    <div className="team-sections">
                        <h5>Away </h5>
                        <h3>{awayteam}</h3>
                        <ul>
                            <li>
                                <h1>Players</h1>
                                <span style={{ fontWeight: 'bold' }}>Points</span>
                            </li>

                            {awaystats.map((player, index) => {
                                const anameParts = player.display_name.split(' '); // Split the name into parts
                                const afirstInitial = anameParts[0].charAt(0).toUpperCase();
                                const alastName = anameParts[1];

                                return (
                                    <li key={index}>
                                        <h1>{`${afirstInitial}.${alastName}`}</h1>
                                        <span >{player.points}</span>

                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="sections">
                <div className="team">
                    <div className="team-sections">
                        <h5>Away </h5>
                        <h3> {hometeam}</h3>
                        <ul>
                            <li>
                                <h1>Players</h1>
                                <span style={{ fontWeight: 'bold' }}>Points</span>
                            </li>

                            {homestats.map((player, index) => {
                                const anameParts = player.display_name.split(' '); // Split the name into parts
                                const afirstInitial = anameParts[0].charAt(0).toUpperCase();
                                const alastName = anameParts[1];

                                return (
                                    <li key={index}>
                                        <h1>{`${afirstInitial}.${alastName}`}</h1>
                                        <span >{player.points}</span>

                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Nba;
