import React, { useEffect, PureComponent, useCallback, useMemo, useRef, useState } from "react";

class Counter extends PureComponent {
    speak() {
        console.log(`now counter is: ${this.props.count}`);
    }

    render() {
        const { props } = this;
        return (
            <h1 onClick={props.onClick}>{props.count}</h1>
        );
    }
}

function App5() {
    const it = useRef();
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const double = useMemo(() => {
        return count * 2;
    }, [count]);
    const countRef = useRef();
    const onClick = useCallback(() => {
        console.log('click');
        setClickCount(clickCount + 1);
        console.log(countRef.current);
        countRef.current.speak();
    }, [clickCount, countRef]);
    useEffect(() => {

        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);
    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current);
        }
    });
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click ({count}),double:({double})</button>
            <Counter ref={countRef} count={double} onClick={onClick} />
        </div>
    );
}

export default App5;
