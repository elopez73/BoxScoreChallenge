import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stlying/Mlb.css';
const apiBaseUrl = 'https://boxscoreapi-263655f53c81.herokuapp.com';
function Mlb() {

    const [awayteam, setAwayTeam] = useState(null);
    const [awaybatters, setAwayBatters] = useState(null);
    const [awayfielding, setAwayFielding] = useState(null);
    const [awaypitchers, setAwayPitchers] = useState(null);
    const [hometeam, setHomeTeam] = useState(null);
    const [homebatters, setHomeBatters] = useState(null);
    const [homefielding, setHomeFielding] = useState(null);
    const [homepitchers, setHomePitchers] = useState(null);
    const [gameData, setGameData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/feed/mlb`);
            console.log('API response data:', response);
            setGameData(response.data);
            setAwayTeam(response.data.gameData.away_team.full_name);
            setAwayBatters(response.data.gameData.away_batters);
            setAwayFielding(response.data.gameData.away_fielding);
            setAwayPitchers(response.data.gameData.away_pitchers);
            setHomeTeam(response.data.gameData.home_team.full_name);
            setHomeBatters(response.data.gameData.home_batters);
            setHomeFielding(response.data.gameData.home_fielding);
            setHomePitchers(response.data.gameData.home_pitchers);
            console.log(response.data.gameData);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    useEffect(() => {
        fetchData();
        const fetchInterval = setInterval(() => {
            fetchData();
        }, 15000);

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(fetchInterval);
        };
    }, []);

    if (!gameData) {
        return <div>Loading...</div>;
    }
    return (
        <div> <h2>Game Details</h2>
            <h3>{awayteam} vs {hometeam}</h3>
            <div className="baseball-game">
                <div className="sections" >
                    <h5>Away </h5>
                    <h4> {awayteam}</h4>
                    <div className="team">
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Batters">Batters</h1>
                                    <span className="Batters" style={{ fontWeight: 'bold' }}>AVG</span>
                                    <span className="Batters" style={{ fontWeight: 'bold' }}>OBP</span>
                                    <span className="Batters" style={{ fontWeight: 'bold' }}>OPS </span>
                                </li>

                                {awaybatters.map((batter, index) => {
                                    const anameParts = batter.display_name.split(' '); // Split the name into parts
                                    const afirstInitial = anameParts[0].charAt(0).toUpperCase();
                                    const alastName = anameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Batters">{`${afirstInitial}.${alastName}`}</h1>
                                            <span className="Batters">{batter.avg}</span>
                                            <span className="Batters">{batter.obp}</span>
                                            <span className="Batters">{batter.ops}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Fielders">Fielders</h1>
                                    <span className="Fielders" style={{ fontWeight: 'bold' }}>Errors</span>

                                </li>

                                {awayfielding.map((fielder, index) => {
                                    const nameParts = fielder.display_name.split(' '); // Split the name into parts
                                    const firstInitial = nameParts[0].charAt(0).toUpperCase();
                                    const lastName = nameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Fielders">{`${firstInitial}.${lastName}`}</h1>
                                            <span className="Fielders">{fielder.errors}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Pitchers">Pitchers</h1>
                                    <span className="Pitchers" style={{ fontWeight: 'bold' }}>ERA</span>
                                    <span className="Pitchers" style={{ fontWeight: 'bold' }}>Strikeouts</span>
                                </li>

                                {awaypitchers.map((pitcher, index) => {
                                    const nameParts = pitcher.display_name.split(' '); // Split the name into parts
                                    const firstInitial = nameParts[0].charAt(0).toUpperCase();
                                    const lastName = nameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Pitchers">{`${firstInitial}.${lastName}`}</h1>
                                            <span className="Pitchers">{pitcher.era}</span>
                                            <span className="Pitchers">{pitcher.strike_outs}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sections">
                    <h5>Home</h5>
                    <h4>{hometeam}</h4>
                    <div className="team">
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Batters">Batters</h1>
                                    <span className="Batters"  style={{fontWeight:'bold'}}>AVG</span>
                                    <span className="Batters"  style={{ fontWeight: 'bold' }}>OBP</span>
                                    <span className="Batters" style={{ fontWeight: 'bold' }}>OPS </span>
                                </li>

                                {homebatters.map((batter, index) => {
                                    const nameParts = batter.display_name.split(' '); // Split the name into parts
                                    const firstInitial = nameParts[0].charAt(0).toUpperCase();
                                    const lastName = nameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Batters">{`${firstInitial}.${lastName}`}</h1>
                                            <span className="Batters">{batter.avg}</span>
                                            <span className="Batters">{batter.obp}</span>
                                            <span className="Batters">{batter.ops}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Fielders">Fielders</h1>
                                    <span className="Fielders" style={{ fontWeight: 'bold' }}>Errors</span>

                                </li>

                                {homefielding.map((fielder, index) => {
                                    const nameParts = fielder.display_name.split(' '); // Split the name into parts
                                    const firstInitial = nameParts[0].charAt(0).toUpperCase();
                                    const lastName = nameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Fielders">{`${firstInitial}.${lastName}`}</h1>
                                            <span className="Fielders">{fielder.errors}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="team-sections">
                            <ul>
                                <li>
                                    <h1 className="Pitchers">Pitchers</h1>
                                    <span className="Pitchers" style={{ fontWeight: 'bold' }}>ERA</span>
                                    <span className="Pitchers" style={{ fontWeight: 'bold' }}>Strikeouts</span>
                                </li>

                                {homepitchers.map((pitcher, index) => {
                                    const nameParts = pitcher.display_name.split(' '); // Split the name into parts
                                    const firstInitial = nameParts[0].charAt(0).toUpperCase();
                                    const lastName = nameParts[1];

                                    return (
                                        <li key={index}>
                                            <h1 className="Pitchers">{`${firstInitial}.${lastName}`}</h1>
                                            <span className="Pitchers">{pitcher.era}</span>
                                            <span className="Pitchers">{pitcher.strike_outs}</span>
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
};

export default Mlb;
