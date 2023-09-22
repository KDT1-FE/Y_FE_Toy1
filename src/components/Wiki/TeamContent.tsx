import React from "react";
import "../../styles/wiki/wikiTeamCard.css";
import {TEAMLIST} from "../../constant";
import SaveTeam from "./SaveTeam";
import TeamCard from "./TeamCard";

function TeamContent(): JSX.Element {
  const teamListString = sessionStorage.getItem(TEAMLIST);
  let teamList = [];

  teamListString
    ? (teamList = JSON.parse(teamListString).teamName)
    : SaveTeam();

  return teamList.map((teamName: string) => <TeamCard teamName={teamName} />);
}

export default TeamContent;
