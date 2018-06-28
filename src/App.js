import React, { Component } from 'react';
import './App.css';
import Table from "./components/Table"
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" component={this.getSelectedLink}/>
                    </Switch>
                </div>
            </Router>
        );
    }

    getSelectedLink = ({match}) => {
        if(match.isExact) return <Redirect to = "/1"/>
        return <Route path="/:selectedLink" render={this.tableRender}/>
    }
    tableRender = ({match}) => {
        const {selectedLink} = match.params
        return <Table selectedLink = {selectedLink}/>
    }
}

export default App;
