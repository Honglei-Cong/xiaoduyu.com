import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-router'

import styles from './style.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo, getUnreadNotice } from '../../reducers/user'
import { showSign } from '../../actions/sign'

class Navbar extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { profile, showSign, unreadNotice } = this.props

    let me = profile && profile._id ? profile : null

    let meTab = null

    if (me) {
      meTab = <li><Link to="/me" activeClassName={styles.active}>{me.nickname}</Link></li>
    } else {
      meTab = <li><a href="javascript:void(0)" onClick={showSign}>我的</a></li>
    }

    return (
      <div>
        <div className={styles.header}>
          <div className="container">
            <ul className={me ? null : "three"}>
              <li><IndexLink to="/" activeClassName={styles.active}>首页</IndexLink></li>
              <li><Link to="/topics" activeClassName={styles.active}>话题</Link></li>
              {me ? <li>
                  <Link to="/notifications" activeClassName={styles.active}>
                    通知{unreadNotice > 0 ? <span className={styles['unread-notice']}>{unreadNotice}</span> : null}
                  </Link>
                </li> : null}
              {meTab}
            </ul>
          </div>
        </div>
        <div className={styles.placeholder}>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  profile: PropTypes.object.isRequired,
  showSign: PropTypes.func.isRequired,
  unreadNotice: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: getUserInfo(state),
    unreadNotice: getUnreadNotice(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSign: bindActionCreators(showSign, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
