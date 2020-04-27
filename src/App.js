import React, { Component, createContext, lazy  } from 'react';
import './App.css';
const About = lazy(() => import('./About.js'));

const BatteryContext = createContext({});

class Middle extends Component {
    render() {
        return <Leaf />;
    }
}

class Leaf extends Component {
    static contextType = BatteryContext;

    render() {
        const battery = this.context;
        return (
            <h1>Battery:{battery}</h1>
        );
    }
}

class App extends Component {
    state = {
        battery: 60
    };

    render() {
        const { battery } = this.state;
        return (
            <BatteryContext.Provider value={battery}>
                <button onClick={() => {
                    this.setState({
                        battery: battery - 1
                    });
                }}>电量-
                </button>
                {/*<button onClick={() => {*/}
                {/*    this.setState({*/}
                {/*        online: !online*/}
                {/*    });*/}
                {/*}}>在线*/}
                {/*</button>*/}
                <Middle />
            </BatteryContext.Provider>
        );
    }
}


export default App;
