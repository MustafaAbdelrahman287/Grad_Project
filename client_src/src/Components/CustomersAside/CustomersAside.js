import React, { Component } from 'react';
import { Accordion, Button, Label, Icon } from 'semantic-ui-react';
import LoyalCustomers from './LoyalCustomers'
import TargetSegment from './TargetSegment';

class CustomersAside extends Component {
  render() {

    const CurrentCustomersContent = (
      <Button as='div' labelPosition='right'>
        <Button basic color='teal'>
          <Icon name='users' />
          Show
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          2,048
        </Label>
      </Button>
      )

    const TargetSegmentContent = (
      <TargetSegment/>
    )

    const PotentialCustomersContent = (
      <Button as='div' labelPosition='right'>
        <Button basic color='teal'>
          <Icon name='users' />
          Show
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          2,048
        </Label>
      </Button>
      )

    const LoyalCustomersContent = (
      <LoyalCustomers/>
    )

    const rootPanels = [
      { title: 'Current Customers', content: { content: CurrentCustomersContent, key: 'content-1' } },
      { title: 'Target Segment', content: { content: TargetSegmentContent, key: 'content-2' } },
      { title: 'Potential Customers', content: { content: PotentialCustomersContent, key: 'content-3' } },
      { title: 'Loyal Customers', content: { content: LoyalCustomersContent, key: 'content-4' } },
    ]
    return (
      <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
    )
  }
}

export default CustomersAside;