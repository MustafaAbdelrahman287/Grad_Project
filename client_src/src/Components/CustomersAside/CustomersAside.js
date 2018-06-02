import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import LoyalCustomers from './LoyalCustomers'
import TargetSegment from './TargetSegment';

class CustomersAside extends Component {
  render() {
    const CurrentCustomersPanels = [
      { title: 'Level 1A', content: 'Level 1A Contents' },
      { title: 'Level 1B', content: 'Level 1B Contents' },
    ]

    const CurrentCustomersContent = (
      <div>
        <Accordion.Accordion panels={CurrentCustomersPanels} />
      </div>
    )

    const TargetSegmentContent = (
      <TargetSegment/>
    )

    const PotentialCustomersPanels = [
      { title: 'Level 3A', content: 'Level 3A Contents' },
      { title: 'Level 3B', content: 'Level 3B Contents' },
    ]

    const PotentialCustomersContent = (
      <div>
        <Accordion.Accordion panels={PotentialCustomersPanels} />
      </div>
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