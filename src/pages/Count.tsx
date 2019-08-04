import * as React from 'react';

import Button from '@material-ui/core/Button';

interface IState {
    count: number;
}

export default class Count extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    public handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        });
    }

    public render() {
        return (
            <div>
                当前count值：{this.state.count}<br/>
                <Button variant="contained" color="primary" onClick={this.handleClick}>
                    <div>增加1</div> 
                </Button>
            </div>
        );
    }
}