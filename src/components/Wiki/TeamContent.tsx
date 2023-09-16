import React from "react";
import SaveTeam from "./SaveTeam";

function TeamContent() {
  const sessionLength = sessionStorage.length;
  const teamListString = sessionStorage.getItem("teamList");
  let teamList = [];
  let team = {멘티: "", 멘토: "", img: ""};

  if (!sessionLength) {
    SaveTeam();
  }

  teamListString
    ? (teamList = JSON.parse(teamListString).teamName)
    : SaveTeam();

  return teamList.map((teamName: string) => {
    const teamString = sessionStorage.getItem(teamName);
    teamString ? (team = JSON.parse(teamString)) : SaveTeam();

    return (
      <div className="TeamContent">
        <img className="TeamImg" src={team.img} alt="팀 이미지" />
        <div className="Mentor">{team.멘티}</div>
        <div className="Mentee">{team.멘토}</div>
        {team.멘토}
      </div>
    );
  });
}

export default TeamContent;
