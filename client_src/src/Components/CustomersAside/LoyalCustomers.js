import React, { Component } from 'react'
import { Button, Checkbox, Form, Dimmer } from 'semantic-ui-react'

class LoyalCustomers extends Component {
    state = {tabIndex:0, checked:false};

    handleCheck = (e, chkProps) => {
        const { tabIndex } = chkProps;
        const { checked } = chkProps;
        this.setState({tabIndex:tabIndex, checked:checked})
    }
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Duration</label>
                    <Dimmer.Dimmable  as={Form.Input} dimmed={this.state.checked === true && this.state.tabIndex === 0}>
                        <Dimmer active={this.state.checked === true && this.state.tabIndex === 0} inverted />
                        <input placeholder='Specify minimum number of years' />
                    </Dimmer.Dimmable>
                </Form.Field>
                <Form.Field>
                    <Checkbox tabIndex={0} onChange={this.handleCheck} label='Not Limited' />
                </Form.Field>
                <Form.Field>
                    <label>Number of orders</label>
                    <Dimmer.Dimmable  as={Form.Input} dimmed={this.state.checked === true && this.state.tabIndex === 1}>
                        <Dimmer active={this.state.checked === true && this.state.tabIndex === 1} inverted />
                        <input placeholder='Specify minimum number of orders' />
                    </Dimmer.Dimmable>
                </Form.Field>
                <Form.Field>
                    <Checkbox tabIndex={1} onChange={this.handleCheck} label='Not Limited' />
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default LoyalCustomers