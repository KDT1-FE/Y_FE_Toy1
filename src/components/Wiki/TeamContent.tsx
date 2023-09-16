import React from "react";
import SaveTeam from "./SaveTeam";
import TeamCard from "./TeamCard";

function TeamContent() {
  const sessionLength = sessionStorage.length;
  const teamListString = sessionStorage.getItem("teamList");
  let teamList = [];

  if (!sessionLength) {
    SaveTeam();
  }

  teamListString
    ? (teamList = JSON.parse(teamListString).teamName)
    : SaveTeam();

  return (
    <div className="TeamContent">
      {teamList.map((teamName: string) => (
        <TeamCard teamName={teamName} />
      ))}
    </div>
  );
}

export default TeamContent;
