import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class LoyalCustomers extends Component {
    state = {tabIndex:[-1,-1], checked:false};

    handleCheck = (e, chkProps) => {
        const { tabIndex, checked } = chkProps;
        const disabled = this.state.tabIndex.slice();
        if (checked === true) {
            disabled[tabIndex] = tabIndex;
        } else if (checked === false) {
            disabled[tabIndex] = -1;
        }
        this.setState({tabIndex:disabled, checked:checked});
    }
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Duration</label>
                    <input disabled={this.state.checked === true && this.state.tabIndex[0] === 0} placeholder='Specify minimum number of years' />
                </Form.Field>
                <Form.Field>
                    <Checkbox tabIndex={0} onChange={this.handleCheck} label='Not Limited' />
                </Form.Field>
                <Form.Field>
                    <label>Number of orders</label>
                    <input disabled={this.state.checked === true && this.state.tabIndex[1] === 1} placeholder='Specify minimum number of orders' />
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