import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem/index'

import './index.css'

const initialPasswordsList = []

class PasswordManager extends Component {
  state = {
    passwordsList: initialPasswordsList,
    isPasswordShown: false,
    searchWebsite: '',
    searchUsername: '',
    searchPassword: '',
  }

  onWebsiteChange = event => {
    this.setState({searchWebsite: event.target.value})
  }

  onCheckboxChange = event => {
    this.setState({isPasswordShown: event.target.checked})
  }

  onUsernameChange = event => {
    this.setState({searchUsername: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({searchPassword: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {searchWebsite, searchPassword, searchUsername} = this.state
    const newPassword = {
      id: uuidv4(),
      website: searchWebsite,
      username: searchUsername,
      password: searchPassword,
    }
    this.setState(pervState => ({
      passwordsList: [...pervState.passwordsList, newPassword],
      searchWebsite: '',
      searchUsername: '',
      searchPassword: '',
      inputSearch: '',
    }))
  }

  onInputChange = event => {
    this.setState({inputSearch: event.target.value})
  }

  onRemovePassword = id => {
    const {passwordsList} = this.state
    const filteredPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: filteredPasswordList})
  }

  render() {
    const {
      passwordsList,
      searchWebsite,
      isPasswordShown,
      searchUsername,
      searchPassword,
      inputSearch,
    } = this.state

    const searchResult = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(inputSearch.toLowerCase()),
    )

    let con
    if (searchResult.length === 0) {
      con = (
        <div className="no-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-img"
          />
          <p className="no-passwords-para">No Passwords</p>
        </div>
      )
    } else {
      con = (
        <ul className="password-list-container">
          {searchResult.map(eachPassword => (
            <PasswordItem
              passwordDetails={eachPassword}
              key={eachPassword.id}
              isPasswordShown={isPasswordShown}
              onRemovePassword={this.onRemovePassword}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="whole-bg-container">
        <div className="inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="top-img-form-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager"
            />
            <div className="head-form-container">
              <h1 className="add-new-password-head">Add New Password</h1>
              <form onSubmit={this.onAddPassword} className="form-container">
                <div className="form-group">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    value={searchWebsite}
                    onChange={this.onWebsiteChange}
                    className="input-element"
                  />
                </div>
                <div className="form-group">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={searchUsername}
                    onChange={this.onUsernameChange}
                    className="input-element"
                  />
                </div>
                <div className="form-group">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={searchPassword}
                    onChange={this.onPasswordChange}
                    className="input-element"
                  />
                </div>
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="bottom-passwords-list-container">
            <div className="passwords-count-search-container">
              <div className="passwords-count-container">
                <h1 className="your-passwords-heading">Your Passwords </h1>
                <p className="passwords-count-para">{searchResult.length}</p>
              </div>
              <div className="search-input-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onInputChange}
                  className="searchInput-ele"
                />
              </div>
            </div>
            <hr />
            <div className="no-password-view-container">
              <div className="checkbox-label-container">
                <input
                  type="checkbox"
                  value={isPasswordShown}
                  id="showPassword"
                  onChange={this.onCheckboxChange}
                  className="checkbox"
                />
                <label htmlFor="showPassword" className="checkbox-label">
                  Show Passwords
                </label>
              </div>
              {con}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
