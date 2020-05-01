import React, { PureComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";

// class Counter extends PureComponent {
//     render() {
//         const { props } = this;
//         return (
//             <h1>{props.count}</h1>
//         );
//     }
// }

function useCounter(count) {
    const size = useSize();
    return <h1>{count}, {size.width} x {size.height}</h1>;

}

function useCount(defaultCount) {
    const [count, setCount] = useState(defaultCount);
    const it = useRef();
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);
    useEffect(() => {
        if (count >= 3) {
            clearInterval(it.current);
        }
    });
    return [count, setCount];
}

function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });
    const onResize = useCallback(() => {
        setSize({
            test: false,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        return () => {
            window.removeEventListener('resize', onResize, false);
        };
    }, [onResize]);
    return size;
}

function App6(props) {
    const [count, setCount] = useCount(0);
    const Counter = useCounter(count);
    const size = useSize();
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click ({count})</button>
            <h1>{size.width} x {size.height}</h1>
            {Counter}
        </div>
    );
}

export default App6;
