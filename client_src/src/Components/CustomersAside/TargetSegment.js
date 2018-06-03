import React, { Component } from 'react';
import { Form, Button, Accordion, Menu } from 'semantic-ui-react';

class TargetSegment extends Component {
    state = { selected:[] }

    handleClick = (e, clickProps) => {
        const { tabIndex } = clickProps;
        const selected = this.state.selected.slice();
        selected[tabIndex] = !selected[tabIndex];
        this.setState({selected:selected});
        console.log(this.state.selected);
    }


    render() {
        const { selected } = this.state;
        const Age = (
            <Menu.Item>
                <Form>
                    <Form.Group grouped>
                        <Form.Checkbox label='Red' name='color' value='red' />
                        <Form.Checkbox label='Orange' name='color' value='orange' />
                        <Form.Checkbox label='Green' name='color' value='green' />
                        <Form.Checkbox label='Blue' name='color' value='blue' />
                    </Form.Group>
                </Form>
            </Menu.Item>
        )
        const Gender = (
            <Menu.Item>
                <Form>
                    <Form.Group>
                        <Button tabIndex={0} basic color='teal' circular icon='male' toggle active={selected[0]} onClick={this.handleClick} />
                        <Button tabIndex={1} basic color='teal' circular icon='female' toggle active={selected[1]} onClick={this.handleClick} />
                    </Form.Group>
                </Form>
            </Menu.Item>
        )
        const EducationLevel = (
            <Menu.Item>
                <Form>
                    <Form.Group grouped>
                        <Form.Checkbox label='Red' name='color' value='red' />
                        <Form.Checkbox label='Orange' name='color' value='orange' />
                        <Form.Checkbox label='Green' name='color' value='green' />
                        <Form.Checkbox label='Blue' name='color' value='blue' />
                    </Form.Group>
                </Form>
            </Menu.Item>
        )
        const IncomeLevel = (
            <Menu.Item>
                <Form>
                    <Form.Group grouped>
                        <Form.Checkbox label='Red' name='color' value='red' />
                        <Form.Checkbox label='Orange' name='color' value='orange' />
                        <Form.Checkbox label='Green' name='color' value='green' />
                        <Form.Checkbox label='Blue' name='color' value='blue' />
                    </Form.Group>
                </Form>
            </Menu.Item>
        )
        const TargetSegmentPanels = [
            { title: 'Age', content: { content: Age, key: 'age' } },
            { title: 'Gender', content: { content: Gender, key: 'gender' } },
            { title: 'EducationLevel', content: { content: EducationLevel, key: 'educationLevel' } },
            { title: 'IncomeLevel', content: { content: IncomeLevel, key: 'incomeLevel' } }
        ]

        return (
            <div>
                <Accordion.Accordion as={Menu} vertical panels={TargetSegmentPanels} />
            </div>
        )
    }
}

export default TargetSegment;