import React, { Component } from 'react';
import { Accordion, Menu, Form, Button, Checkbox, Dimmer } from 'semantic-ui-react';

class CustomersAside extends Component {
  state = { activeIndex: 0, active1:false, active2:false }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  handleCheck1 = (e) => this.setState({active1:!this.state.active1})
  handleCheck2 = (e) => this.setState({active2:!this.state.active2})

  render() {
    const { activeIndex } = this.state;

    const CurrentCustomersPanels = [
      { title: 'Level 1A', content: 'Level 1A Contents' },
      { title: 'Level 1B', content: 'Level 1B Contents' },
    ]

    const CurrentCustomersContent = (
      <div>
        CurrentCustomers
        <Accordion.Accordion panels={CurrentCustomersPanels} />
      </div>
    )

    const Age = (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label='Red' name='color' value='red' />
          <Form.Checkbox label='Orange' name='color' value='orange' />
          <Form.Checkbox label='Green' name='color' value='green' />
          <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
      </Form>
    )
    const Gender = (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label='Red' name='color' value='red' />
          <Form.Checkbox label='Orange' name='color' value='orange' />
          <Form.Checkbox label='Green' name='color' value='green' />
          <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
      </Form>
    )
    const EducationLevel = (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label='Red' name='color' value='red' />
          <Form.Checkbox label='Orange' name='color' value='orange' />
          <Form.Checkbox label='Green' name='color' value='green' />
          <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
      </Form>
    )
    const IncomeLevel = (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label='Red' name='color' value='red' />
          <Form.Checkbox label='Orange' name='color' value='orange' />
          <Form.Checkbox label='Green' name='color' value='green' />
          <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
      </Form>
    )

    const TargetSegmentContent = (
      <div>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title active={activeIndex === 1} content='Age' index={1} onClick={this.handleClick} />
            <Accordion.Content active={activeIndex === 1} content={Age} />
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title active={activeIndex === 2} content='Gender' index={2} onClick={this.handleClick} />
            <Accordion.Content active={activeIndex === 2} content={Gender} />
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title active={activeIndex === 3} content='Education Level' index={3} onClick={this.handleClick} />
            <Accordion.Content active={activeIndex === 3} content={EducationLevel} />
          </Menu.Item>
        </Accordion>
        <Accordion as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title active={activeIndex === 4} content='Income Level' index={4} onClick={this.handleClick} />
            <Accordion.Content active={activeIndex === 4} content={IncomeLevel} />
          </Menu.Item>
        </Accordion>
      </div>
    )

    const PotentialCustomersPanels = [
      { title: 'Level 3A', content: 'Level 3A Contents' },
      { title: 'Level 3B', content: 'Level 3B Contents' },
    ]

    const PotentialCustomersContent = (
      <div>
        PotentialCustomers
        <Accordion.Accordion panels={PotentialCustomersPanels} />
      </div>
    )

    const LoyalCustomersContent = (
      <div>
        <Form>
          <Form.Field>
            <label>Duration</label>
            <Dimmer.Dimmable as={Form.Input} dimmed={this.state.active1}>
              <Dimmer active={this.state.active1} />
              <input placeholder='Specify number of years' />
            </Dimmer.Dimmable>
          </Form.Field>
          <Form.Field>
            <Checkbox onChange={this.handleCheck1} label='All' />
          </Form.Field>
          <Form.Field>
            <label>Number of Orders</label>
            <Dimmer.Dimmable as={Form.Input} dimmed={this.state.active2}>
              <Dimmer active={this.state.active2} />
              <input placeholder='Specify number of orders' />
            </Dimmer.Dimmable>
          </Form.Field>
          <Form.Field>
          <Checkbox onChange={this.handleCheck2} label='All' />
          </Form.Field>
          <Button type='submit'>Show</Button>
        </Form>
      </div>
    )

    const rootPanels = [
      { title: 'CurrentCustomers', content: { content: CurrentCustomersContent, key: 'content-1' } },
      { title: 'TargetSegment', content: { content: TargetSegmentContent, key: 'content-2' } },
      { title: 'PotentialCustomers', content: { content: PotentialCustomersContent, key: 'content-3' } },
      { title: 'LoyalCustomers', content: { content: LoyalCustomersContent, key: 'content-4' } },
    ]
    return (
      <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    )
  }

}

export default CustomersAside;