// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImgUrl} = teamDetails

  return (
    <Link to={`/team-matches/${id}`} className="t-link">
      <li className="team">
        <img src={teamImgUrl} alt={name} className="t-logo" />
        <p className="t-head">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
