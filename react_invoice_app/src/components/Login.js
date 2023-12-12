import "./DashboardLogin.css";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');
  const users = [{ username: "User1", password: "123" }, { username: "User2", password: "1234" }];
  const handleSubmit = (e) => {
    e.preventDefault()
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      console.log(account)
      console.log('Logged In successfully')
      localStorage.setItem("authenticated", true);
      console.log('localStorage', localStorage)
      navigate("/home");
      setLoginMessage('');
    }
    else {
      console.log('Incorrect Password')
      localStorage.setItem("authenticated", false);
      setLoginMessage('*Invalid credentials');
    }
  };

  return (
    <Col md={12} lg={12} >
      <div className="dashboard-login">
            <img className="bg-icon" alt="" src="/bg.svg" />
            <form onSubmit={handleSubmit}>
              <Col md={4} lg={4} > </Col>
              <Col md={4} lg={4} >
                <Row>
                  <div className="register-button">
                    <div className="register-button-child" />
                    <input
                      id={'my-input'}
                      type={'text'}
                      value={username}
                      name="Username"
                      placeholder={'Username'}
                      className="enter-your-email"
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="register-button1">
                    <div className="register-button-child" />
                    <input
                      id={'my-input-1'}
                      type={'text'}
                      value={password}
                      name="Username"
                      placeholder={'Password'}
                      className="enter-your-password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <img
                      className="fluenteye-20-filled-icon"
                      alt=""
                      src="/fluenteye20filled.svg"
                    />
                  </div>
                </Row>
                <Row>
                  <div className="inc-password" style={{
                    color: '#e60404',
                    fontSize: '25px', fontweight: '600', textAlign: 'center'
                  }}>
                    <p>{loginMessage}</p> {/* Display login message */}
                  </div>
                </Row>
                <Row>
                <div className="login-button">
                  <div className="login-button-child" />
                  <input type="submit" value="Submit"
                    className="login"
                  />
                </div>
                </Row>
              </Col>
              <Col md={4} lg={4} > </Col>
            </form>

          </div>
      </Col>

  );
};

export default Login;
