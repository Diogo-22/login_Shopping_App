import Register from "./components/Register";
import Login from "./components/Login";
import NewList from "./groceryUI/NewList";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./groceryUI/MainPage";
import UserLists from "./groceryUI/UserLists";
import MainMenu from "./groceryUI/MainMenu";
import AddUser from "./groceryUI/AddUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="login" element={<Login />}>
          <Route element={<PersistLogin />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}

        {/* <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route> */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="main-menu" element={<MainMenu />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="new-list" element={<NewList />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="add-user" element={<AddUser />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<UserLists />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="s-list" element={<MainPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
