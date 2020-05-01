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

    // useMemo有返回值，在渲染期间完成，直接参与渲染
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]); // true 和 false间变化


    // 错误写法 每次app重新渲染后（count变化引起），onClick句柄都会发生变化，从而导致counter子组件也跟这重新渲染
    // const onClick = () => {
    //     console.log('click');
    // }

    // 第一次优化，因为传给useMemo是一个空数组，整个逻辑只会走一遍，onClick只有一个句柄
    // const onClick = useMemo(() => {
    //     return () => {
    //         console.log('click');
    //     };
    // }, []);


    // 第二次优化，用useCallback，解决传入子组件的函数参数，过度变化，导致子组件过多渲染
    // useMemo(() => fn)
    // useCallback(fn)
    // 等价
    // const onClick = useCallback(() => {
    //     console.log('click');
    // }, []); // 这个函数什么都不依赖，第二个参数是空数组，实际项目不会这么简单，至少要更新状态，下面的写法。


    // const onClick = useCallback(() => {
    //     console.log('click');
    //     setClickCount(clickCount + 1);
    // }, [clickCount]); // 依赖了两个外部变量，clickCount和setClickCount，setXXX不需要写，react可以保证每次setState函数返回同一个句柄
    // 还可以写成下面，clickCount都不需要依赖
    //setState函数，除了直接传入state的最新值以外，还可有传入一个函数，函数的参数即state的当前值，返回要更新的值


    // memo函数根据传入属性，决定是否重新渲染组件 useMemo根据依赖决定一段逻辑是否重新执行，达到性能优化目的。如果useMemo返回值是一个函数，可以用useCallback方式。


    const onClick = useCallback(() => {
        console.log('click');
        setClickCount(clickCount => clickCount + 1); // 因为传入函数，state以参数形式，不需要拿到clickCount的句柄，依然可以+1，从而第二个参数传空数组
    }, []);


    return (
        <div>
            {/*<h1></h1>*/}
            <button onClick={() => setCount(count + 1)}>Click ({count}),double:({double})</button>
            <Counter count={double} onClick={onClick} />
        </div>

    );
}

export default App4;
