import React from "react";
import "../../styles/WikiTeamCard.css";
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

  return teamList.map((teamName: string) => <TeamCard teamName={teamName} />);
}

export default TeamContent;
