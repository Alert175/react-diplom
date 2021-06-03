import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Catalog from "./pages/catalog";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
