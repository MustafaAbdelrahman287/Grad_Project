import React, { Component } from 'react';
import { Button, Checkbox, Radio, Form, Menu } from 'semantic-ui-react';
class AdvertismentAside extends Component {
    state = {  selectionMethod: [false] }
    
        
        handleClick = (e, clickProps) => {
            e.preventDefault();
            const { tabIndex } = clickProps;
            const selectionMethod = this.state.selectionMethod.slice();
            selectionMethod[tabIndex] = !selectionMethod[tabIndex];
            this.setState({ selectionMethod: selectionMethod });
            console.log(this.state.selectionMethod);
        }
    render() {

        const { selectionMethod } = this.state;
        return (
            <Form>
                <Form.Group as={Menu} vertical>
                    <label>Best Location for:-</label>
                    <Menu.Item>
                        <Form.Field control={Checkbox} label='Advertisment'/>

                    </Menu.Item>
                </Form.Group>
                <Form.Group widths='equal' as={Menu} vertical>
                <Menu.Item>
                        <label>Pin Point</label>
                        <br />
                    </Menu.Item>
                    <Menu.Item>
                        <Form.Field role='checkbox' tabIndex={0} basic color='teal' control={Button} circular icon='point' active={selectionMethod[0]} onClick={this.handleClick} value='factory' />
                       
                    </Menu.Item>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>

                

            
            </Form>

        )
    }
}
export default AdvertismentAside;