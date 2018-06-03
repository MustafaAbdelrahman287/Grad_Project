import React, { Component } from 'react';
import { Button, Checkbox, Form, Menu } from 'semantic-ui-react';
class AdvertismentAside extends Component {
    state = {  active: false }
    
        
        handleClick = (e, clickProps) => {
            this.setState({active:!this.state.active})
        }
    render() {

        const { active } = this.state;
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
                        <label>Pinpoint Available Locations</label>
                        <br />
                    </Menu.Item>
                    <Menu.Item>
                        <Form.Field tabIndex={0} basic color='teal' control={Button} circular icon='point' active={active} onClick={this.handleClick} value='factory' />
                    </Menu.Item>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>

                

            
            </Form>

        )
    }
}
export default AdvertismentAside;