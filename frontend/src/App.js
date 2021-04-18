import React from "react";
import Navigation from "./Components/Navigation/Navigation.js";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {

    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Navigation navLinks={this.props.navLinks}>
                    </Navigation>
                    <Switch>
                        {this.props.navLinks.map((item) => {
                            return(
                                <Route exact path={item.path} key={item.name}>
                                    {item.component}
                                </Route>
                            );
                        })}
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

export default App;