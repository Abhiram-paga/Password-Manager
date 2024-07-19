import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isPasswordShown, onRemovePassword} = props
  const {id, website, username, password} = passwordDetails

  const onClickDelete = () => {
    onRemovePassword(id)
  }

  return (
    <li className="password-list-item-container">
      <div className="profile-con">
        <h1 className="profile-con-head">{website[0]}</h1>
      </div>
      <div className="web-user-pass-con">
        <p className="web-para">{website}</p>
        <p className="web-para">{username}</p>
        {isPasswordShown ? (
          <p className="web-para">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
