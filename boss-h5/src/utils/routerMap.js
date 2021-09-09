import Home from "../views/home/home.jsx"; //引入的组件
import PositionDetail from "../views/position-detail/position-detail.jsx"
import Login from '../views/login/login.jsx';
import My from '../views/my/my.jsx'
import Page404 from "../views/Page404/Page404.jsx";
export default [
  { path: "/", name: "home", component: Home, auth: true },
  { path: "/position-detail/:id", name: "position-detail", component: PositionDetail, auth: true },
  { path: "/login", name: "login", component: Login, auth: false },
  { path: "/my", name: "my", component: My, auth: true },
  { path: "/404", name: "404", component: Page404, auth: false },
]