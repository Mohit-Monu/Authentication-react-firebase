import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context"
const AuthForm = (props) => {
  const AuthCtx=useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const email = useRef("");
  const password = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  async function AuthenticationHandler(e) {
    e.preventDefault();
    if (isLogin === false) {
      setIsLoading(true);
      const obj = {
        email: email.current.value,
        password: password.current.value,
        returnSecureToken: true,
      };
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        } else {
          console.log(data);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        alert(err);
      }
    } else {
      setIsLoading(true);
      const obj = {
        email: email.current.value,
        password: password.current.value,
        returnSecureToken: true,
      };
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        } else {
          AuthCtx.login(data.idToken)
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        alert(err);
      }
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={AuthenticationHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={email} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={password} />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <h3>Sending request...</h3>
          ) : (
            <button>{isLogin ? "Login" : "SignUp"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
