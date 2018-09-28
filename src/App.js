import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './component/layout/Header';
import About from './component/pages/About';
import { Provider } from './context';
import Messages from './component/messages/Messages';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddMessage from './component/messages/AddMessage';
import NotFound from './component/pages/NotFound';
import UpdateMessage from './component/messages/UpdateMessage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Wall Diary App"/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Messages}/>
                <Route path="/message/add" component={AddMessage}/>
                <Route path="/about" component={About}/>
                <Route path="/message/edit/:_id" component={UpdateMessage}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
