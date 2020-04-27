import React, { Component, useState } from 'react';

class UseStateClass extends Component {
    state = {
        count: 0
    };

    render() {
        const { count } = this.state;
        return (
            <div>
                <h1>{count}</h1>
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    });
                }}>点击
                </button>
            </div>
        );
    }
}


function UseState(props) {
    const [count, setCount] = useState(()=>{
        console.log('初始值');
        return props.defaultCount || 0
    });
    const [name, setName] = useState('hl');
    return (
        <div>
            <h1>{count}</h1>
            <h2>{name}</h2>
            <button onClick={() => setCount(count + 1)}>点击点击点击点击
            </button>
        </div>
    );
}

export default UseState;
