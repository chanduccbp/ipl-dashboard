// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import './index.css'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true, bgId: ''}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(eachObj => ({
        id: eachObj.id,
        competingTeam: eachObj.competing_team,
        competingTeamLogo: eachObj.competing_team_logo,
        result: eachObj.result,
        matchStatus: eachObj.match_status,
      })),
    }

    this.setState({teamData: updatedData, isLoading: false, bgId: id})
  }

  renderTeamData = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData

    return (
      <div className="td">
        <img src={teamBannerUrl} alt="team banner" className="t-banner" />
        <h1 className="td-head">Latest Matches</h1>
        <LatestMatch lmDetails={latestMatchDetails} />

        <ul className="lmc-list">
          {recentMatches.map(eachTeam => (
            <MatchCard key={eachTeam.id} teamDetails={eachTeam} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, bgId} = this.state

    return (
      <div className={`td-cont-${bgId}`}>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamData()
        )}
      </div>
    )
  }
}

export default TeamMatches
