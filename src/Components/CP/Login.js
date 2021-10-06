import '../../Style/admin-login.scss'

function Login () {
  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <Input placeholder='Username' />
        <Input placeholder='Password' />
      </form>
    </div>
  )
}

function Input (props) {
  return (
    <input type="text" defaultValue='' placeholder={props.placeholder} />
  )
}

export default Login;