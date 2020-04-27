import React, { Component, useState, useEffect } from "react";

class App2 extends Component {
    state = {
        count: 0,
        size: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }

    };

    componentDidMount() {
        document.title = this.state.count;
        window.addEventListener('resize', this.onResize, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.title = this.state.count;

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    onResize = () => {
        this.setState({
            size: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        });
    };

    render() {
        const { count, size } = this.state;
        return (
            <div>
                <h1>{count}</h1>
                <h2>size:{size.width} x {size.height}</h2>
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

function App(props) {
    const [count, setCount] = useState(0);
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    };

    useEffect(() => {
        document.title = count;
    });

    // 不传数组，每次渲染都执行
    // 传入空数组，只在第一次执行

    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        return () => {
            window.removeEventListener('resize', onResize, false);
        };
    }, []);

    // 只在count变化后才执行
    useEffect(() => {
        console.log({ count });
    }, [count]);

    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick);
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick);
        }
    });

    const onClick = () => {
        console.log('click');
    };

    return (
        <div>
            {/*<h1></h1>*/}
            <button onClick={() => setCount(count + 1)}>Click ({count})</button>
            {
                count % 2
                    ?
                    <span id='size'>size: {size.width} x {size.height}</span>
                    :
                    <p id='size'>size: {size.width} x {size.height}</p>
            }
        </div>

    );
}

export default App;
