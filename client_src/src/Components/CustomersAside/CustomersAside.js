import React, {Component} from 'react';
import { Accordion, Menu, Form } from 'semantic-ui-react';

class CustomersAside extends Component {
  state = { activeIndex: 0,
    targetSegment: []}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

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

    const ColorForm = (
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
          <Accordion.Content active={activeIndex === 1} content={ColorForm} />
        </Menu.Item>
      </Accordion>
        <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title active={activeIndex === 2} content='Gender' index={2} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 2} content={ColorForm} />
        </Menu.Item>
      </Accordion>
        <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title active={activeIndex === 3} content='Education Level' index={3} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 3} content={ColorForm} />
        </Menu.Item>
      </Accordion>
      <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title active={activeIndex === 4} content='Income Level' index={4} onClick={this.handleClick} />
          <Accordion.Content active={activeIndex === 4} content={ColorForm} />
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

    const LoyalCustomersPanels = [
      { title: 'Level 4A', content: 'Level 4A Contents' },
      { title: 'Level 4B', content: 'Level 4B Contents' },
    ]
    
    const LoyalCustomersContent = (
      <div>
        LoyalCustomers
        <Accordion.Accordion panels={LoyalCustomersPanels} />
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