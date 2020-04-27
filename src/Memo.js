import React, { Component, memo } from 'react';

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps === nextProps;
};
const Foo = memo(function Foo(props) {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.name !== this.props.name;
    // }
    // console.log('Foo render');

    console.log(props.person.age);
    return <div>
        {props.person.age}
    </div>;
}, arePropsEqual);

class Memo extends Component {
    state = {
        count: 0,
        person: {
            age: 18
        }
    };

    callback = () => {

    };

    render() {
        const { count, person } = this.state;
        return (
            <div>
                <h1>{count}</h1>
                <button onClick={() => {
                    person.age++;

                    this.setState({
                        person,
                        count: count + 1
                    });
                }}>按钮
                </button>
                <Foo name='hl' person={person} cb={this.callback} />
            </div>
        );
    }
}

export default Memo;
