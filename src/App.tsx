import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */

/* Needed addition of "showGraph" property (successfully done)*/
interface IState {
  data: ServerRespond[],
  //Added "showGraph" property
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */

/*After addition of "showGraph", initially it must be
false in the constructor (successfully done)*/
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //Initially, boolean is false
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */

  /* Addition of if condition i.e. if boolean of
  "showGraph" is true return Graph data*/
  renderGraph() {
    //If statement to check "showGraph" boolean
    if(this.state.showGraph){
    return (<Graph data={this.state.data}/>)
  }
  }

  /**
   * Get new data from server and update the state with the new data
   */

  /* Due to Javascript's "setInterval Function", it will only
  get data feeds in intervals, rather we need them continuous
  (successfully resolved)*/
  getDataFromServer() {
    //Initialised a guard value
    let x = 0;
    const interval = setInterval(() =>{
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      this.setState({ 
        data: serverResponds,
        showGraph: true,
       });
    });
    //Incrementing the value of x after every contact to server
    x++;
    // If the value of x ever reaches greater than 1000 we reset the interval
    if (x>1000){
      clearInterval(interval);
    }
  }, 100);
}

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
