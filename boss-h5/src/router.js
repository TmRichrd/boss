import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
// import Home from "./views/home/home.jsx"; //引入的组件
// import PositionDetail from "./views/position-detail/position-detail.jsx"
// import Login from './views/login/login.jsx';
// import My from './views/my/my.jsx'
import FrontendAuth from './components/FrontendAuth/FrontendAuth.jsx';
import routerMap from './utils/routerMap.js';
const BasicRoute = () => (
  <HashRouter>
    <Switch>
      {/*//定义路由地址*/}
      {/* <Route exact path="/" component={Home} />
      <Route exact path='/position-detail/:id' component={PositionDetail} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/my' component={My} /> */}
      <FrontendAuth routerConfig={routerMap} />
    </Switch>
  </HashRouter>
);


export default BasicRoute;