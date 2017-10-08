import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import MonitorSandbox from './sandbox.jsx';
import SdsfMonitor from './sdsfmonitor.jsx';
import JobMonitor from './jobmonitor.jsx';

class MonitorTop extends Component {
    render() {
        return (
            <div> 
                <MonitorMenu />
                {this.props.children}
            </div>
        );
    } 
}

class MonitorMenu extends Component {
    render() {
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Link to="/monitorsvc/sandbox"><Button>Sandbox</Button></Link>
                    <Link to="/monitorsvc/sdsfmonitor"><Button>SDSF Monitor</Button></Link>
                    <Link to="/monitorsvc/jobmonitor"><Button>Job Monitor</Button></Link>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
} 

class TopMessage extends Component {
    render() {
        return <i>Selects the entity you want to monitor from the above menu.</i>;
    }
}
 
//Main
const targetElement = document.getElementById('monitortop');
if (targetElement) {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/monitorsvc" component={MonitorTop}>
                <IndexRoute component={TopMessage} />
                <Route path="sandbox" component={MonitorSandbox} />
                <Route path="sdsfmonitor" component={SdsfMonitor} />
                <Route path="jobmonitor" component={JobMonitor} />
                <Route path="*" component={TopMessage} />
            </Route>
        </Router>,
        targetElement
    );
}