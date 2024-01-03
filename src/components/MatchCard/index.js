// Write your code here
import './index.css'

const MatchCard = props => {
  const {teamDetails} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = teamDetails
  const ms = matchStatus === 'Won' ? 'won' : 'loss'

  return (
    <li className="lmc">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="lmc-pic"
      />
      <p className="lmc-head">{competingTeam}</p>
      <p className="lmc-para">{result}</p>
      <p className={ms}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
