import React, { useEffect, useState } from "react";
import "../styles/profilecomponent.css";
import Achivement from "../components/AchivementBox";
import BadgesTabcomponent  from "../components/BadgesTabcomponent ";
import { FaChevronLeft } from "react-icons/fa";

const ProfilePic = () => {
  const [profileData, setProfileData] = useState({});
  const [pointsAndLevel, setPointsAndLevel] = useState({});
  const [rank, setRank] = useState("");
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://staging.questprotocol.xyz";
  const userId = "u-a2399489-9cd0-4c94-ad12-568379202b08";
  const apiKey = "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be";
  const entityId = "e-0000000000";
  const secretKey = "profile-data-quest-labs";

  const headers = {
    apikey: apiKey,
    apisecret: secretKey,
    userid: userId,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, pointsAndLevelResponse, rankResponse, badgesResponse] = await Promise.all([
          fetch(`${apiUrl}/api/users/${userId}`, { headers }),
          fetch(`${apiUrl}/api/entities/${entityId}/users/${userId}/xp`, { headers }),
          fetch(`${apiUrl}/api/entities/${entityId}/users/${userId}/xp-leaderboard-rank`, { headers }),
          fetch(`${apiUrl}/api/entities/${entityId}/users/${userId}/badges`, { headers })
        ]);

        if (!profileResponse.ok || !pointsAndLevelResponse.ok || !rankResponse.ok || !badgesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const profileData = await profileResponse.json();
        const pointsAndLevelData = await pointsAndLevelResponse.json();
        const rankData = await rankResponse.json();
        const badgesData = await badgesResponse.json();

        setProfileData(profileData.data);
        setPointsAndLevel(pointsAndLevelData);
        setRank(rankData.data.position);
        setBadges(badgesData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profilePage">
      <div>
        <div>
          <FaChevronLeft />
        </div>
        <h1>Profile</h1>
      </div>
      <div>
        <div className="userAvatarBox">
          <img src={profileData?.imageUrl} alt={profileData?.name} />
        </div>
        <h2>{profileData?.name}</h2>
        <div className="userAchievementContainer">
          <Achivement value={pointsAndLevel.data} title={"Points"} />
          <Achivement value={`#${rank}`} title={"Ranks"} />
          <Achivement value={pointsAndLevel.data} title={"Points"} />
        </div>
        <div className="tabContainer">
          <div className="tabButtons">
            <button>Membership</button>
            <button className="activeTab">Badges</button>
            <button>Point History</button>
          </div>
          <div className="tabContent">
            <BadgesTabcomponent  badges={badges} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
