import React, { PureComponent } from 'react';

class Clock extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            counter1: 1,
            counter2: 1,
            hasError: false,
            inputValue: 'hellow'
        }
        this.handleClick = this.handleClick.bind();
        this.onInputValueChange = this.onInputValueChange.bind();
    };
    componentDidMount() {
        this.timer = setInterval(() => {
            this.tick();
            this.setState({
                counter1: this.state.counter1 + this.props.increment
            });
            this.setState((state, props) => ({
                counter2: state.counter2 + props.increment
            }));
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.log('error occured: ', error);
        console.log('error occured info: ', info);

    }
    handleClick() {
        alert('I am clicked');
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }
    onInputValueChange(event) {
        event.preventDefault();
        console.log('input is: ', event.target.value);
        
        // this.setState({
        //     inputValue: value
        // });
    }
    render() {
        const number = [1, 2, 3, 4, 5, 6];
        const list = number.map((number, index) => <li key={index.toString()}>{number}</li>);
        // console.log('render');
        return (
            <div>
                <h1>The time is: </h1>
                <h1>{this.state.time.toLocaleTimeString()}</h1>
                <h1>counter1 is: {this.state.counter1}</h1>
                <h1
                    style={{
                        fontSize: 17,
                        fontWeight: '400'
                    }}
                >counter2 is: {this.state.counter2}</h1>
                <button
                    onClick={this.handleClick}
                >
                    click me
                </button>
                <div>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                // value={this.state.inputValue}
                                onChange={this.onInputValueChange}
                                onSubmit={() => {

                                }}
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}
export default Clock;