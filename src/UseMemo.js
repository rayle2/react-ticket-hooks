import React, { Component, useState, useMemo, memo, useCallback } from "react";


const Counter = memo(function Counter(props) {
    console.log('Counter render');
    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    );
});

function App4(props) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    // const onClick = useMemo(() => {
    //     return () => {
    //         console.log('click');
    //     };
    // }, []);

    // useMemo(() => fn)
    // useCallback(fn)
    // 等价

    const onClick = useCallback(() => {
        console.log('click');
        setClickCount(clickCount + 1); // 还可以写成下面
    }, [clickCount]);

    // const onClick = useCallback(() => {
    //     console.log('click');
    //     setClickCount(clickCount => clickCount + 1);
    // }, []);


    return (
        <div>
            {/*<h1></h1>*/}
            <button onClick={() => setCount(count + 1)}>Click ({count}),double:({double})</button>
            <Counter count={double} onClick={onClick} />
        </div>

    );
}

export default App4;
