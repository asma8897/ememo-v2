import { Navigate, Outlet, Route, Routes, useNavigate,} from "react-router-dom";
import HomePage from "../home/homePage";
import SettingPage from "../setting/settingPage";
import EmemoPage from "../ememo/MemoPage";
import CreateMemoDialog from "../ememo/submission/createMemoDialog/createMemoDialog";
import { EmemoDetail } from "../ememo/ememoDetail/ememoDetail";
import { SubmissionPage } from "../ememo/submission/SubmissionPage";
import LoginPage from "../login/loginPage";
import ProtectedRoutes from "./protectedRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase";

export default function AppRoutes() {

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // navigate("/home/ememo");
        console.log("uid", uid);
      } else {
        navigate("/login");
        console.log("Unable to login")
      }
    });
  }, [])

  // function RequireAuth({ redirectTo } : RedirectType) {
  //   let isAuthenticated = getAuth();
  //   return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  // }

  return (
    <>
      {/* <Routes>
            <Route path="/" element={<EmemoPage />}/>
                <Route path="/home" element={<HomePage />}>
                <Route path="setting" element={<SettingPage />} />
                <Route path="ememo" element={<EmemoPage />} />
                <Route path="creatememo" element={<CreateMemoDialog />} />
            </Route>
        </Routes> */}
{/* https://stackoverflow.com/questions/67743282/prevent-user-from-go-back-to-the-login-page-when-user-logged-in-react-js */}

{/* https://www.positronx.io/react-protected-routes-with-react-router-tutorial/ */}

      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="home" element={<HomePage />} />
          <Route element={<ProtectedRoutes />} >
          <Route path="home/ememo" element={<EmemoPage />} />
            <Route path="home/creatememo" element={<CreateMemoDialog />} />
            <Route path="home/ememo/:id" element={<EmemoDetail />} />
            <Route path="home/setting" element={<SettingPage />} />
            <Route path="home/ememo/submission" element={<SubmissionPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

// interface RedirectType {
//   redirectTo: string
// }
