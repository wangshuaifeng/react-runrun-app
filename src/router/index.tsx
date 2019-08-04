import * as React  from "react";
import { Route, Link, Switch } from "react-router-dom";
import styles from './index.scss';

import Home from "../pages/Home";
import Count from "../pages/Count";
const PrimaryLayout = () => (
  <div className={styles.routerStyle}>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Count} />
      </Switch>
    </main>
  </div>
);

export default PrimaryLayout;
