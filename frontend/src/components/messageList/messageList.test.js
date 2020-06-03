import React from 'react';
import MessageList from './messageList';
import mockMessages from '../../__mocks__/messages.json';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('List', () => {
  it('renders without crashing', () => {
    const component = mount*(<MessageList/>);
    expect(component).toMatchSnapshot();
  })

  it('takes messages as props and displays them', () => {
    const component = shallow(<MessageList
      messages={mockMessages}
    />);
    expect(component.find('ul#message_list').length).toBe(1);
  })

  it('each message has update button', () => {
    const component = shallow(<MessageList
      messages={mockMessages}
      loaded={true}
    />)
    expect(component.find('ul#message_list').childAt(0).find('#update').text()).toBe('update')
  });

  it('each message in list has a delete button', () => {
    const component = mount(<MessageList 
      messages={mockMessages}
    />);
    expect(component.find('ul#message_list').childAt(0).exists('button#delete')).toBe(true);
  })
})