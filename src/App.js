import { Switch, Route,Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
function App() {
  const token = localStorage.getItem("token")
  console.log(token)
  const AuthCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!token && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
            <Route path="/profile">
            {token &&  <UserProfile/>}
            {!token && <Redirect to="/"></Redirect>}
              
            </Route>

          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
