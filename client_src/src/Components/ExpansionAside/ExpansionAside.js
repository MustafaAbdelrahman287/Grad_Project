import React, { Component } from 'react';
import { Button, Radio, Form, Menu } from 'semantic-ui-react';

class ExpansionAside extends Component {
    state = { value:'branch', selectionMethod:[]}

    handleChange = (e, { value }) => {
        this.setState({ value:value });
    }
    
    handleClick = (e, clickProps) => {
        const { tabIndex } = clickProps;
        const selectionMethod = this.state.selectionMethod.slice();
        selectionMethod[tabIndex] = !selectionMethod[tabIndex];
        this.setState({selectionMethod:selectionMethod});
        console.log(this.state.selectionMethod);
    }

    render() {
        const { value, selectionMethod } = this.state;

        return (
            <Form>
                <Form.Group as={Menu} vertical>
                    <label>Best Location for:-</label>
                    <Menu.Item>
                        <Form.Field control={Radio} label='Factory' value='factory' checked={value === 'factory'} onChange={this.handleChange} />
                        <Form.Field control={Radio} label='Warehouse' value='warehouse' checked={value === 'warehouse'} onChange={this.handleChange} />
                        <Form.Field control={Radio} label='Branch' value='branch' checked={value === 'branch'} onChange={this.handleChange} />
                    </Menu.Item>
                </Form.Group>
                <Form.Group as={Menu}>
                    <Menu.Item>
                        <label>Selection Method:-</label>
                        <br/>
                    </Menu.Item>
                    <Menu.Item>
                        <Form.Field tabIndex={0} basic color='teal' control={Button} circular icon='users' active={selectionMethod[0]} onClick={this.handleClick}  value='point' />
                        <Form.Field tabIndex={1} basic color='teal' control={Button} circular icon='users' active={selectionMethod[1]} onClick={this.handleClick} value='polygon' />
                        <Form.Field tabIndex={2} basic color='teal' control={Button} circular icon='users' active={selectionMethod[2]} onClick={this.handleClick} value='rectangle' />
                    </Menu.Item>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        )
    }
}

export default ExpansionAside;

