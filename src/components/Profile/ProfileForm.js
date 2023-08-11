import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context"

const ProfileForm = () => {
  const AuthCtx=useContext(AuthContext)
  const password=useRef("")
  async function ChangePasswordHandler(e){
    e.preventDefault()
    const newpass=password.current.value
    try{
      const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,{
        method:"POST",
        body:JSON.stringify({
          idToken:AuthCtx.token,
          password:newpass,
          returnSecureToken:true
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data=await response.json()
      if(!response.ok){
        throw new Error(data)
      }else{
        console.log(data.idToken)
        AuthCtx.token(data.idToken)
      }
    }catch(err){
      alert(err)
    }

  }
  return (
    <form className={classes.form} onSubmit={ChangePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={password} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
