import '../../Style/admin-login.scss'

function Login () {
  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <div className="admin-login__title">
          Login to admin control panel
        </div>
        <Input placeholder='Username' type='text' />
        <Input placeholder='Password' type='password' />

        <div className="admin-login__button">
          Sign in
        </div>
      </form>
    </div>
  )
}

function Input (props) {
  return (
    <input 
      className="admin-login__input" 
      type={props.type} defaultValue='' 
      placeholder={props.placeholder}
    />
  )
}

export default Login;