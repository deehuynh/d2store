import '../../Style/admin-login.scss'

function Login () {
  return (
    <div className="admin-login">
      <form className="admin-login__form">
        <Input />
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