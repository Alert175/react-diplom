import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import global styles
import "./index.css";

// import routers
import Home from "./pages/home";
import Catalog from "./pages/catalog";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import NotFound from "./pages/404";

// import general components
import Header from "./components/general-components/Header";
import Banner from "./components/general-components/Banner";

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/catalog" component={Catalog} />
              <Route path="/about" component={About} />
              <Route path="/contacts" component={Contacts} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
