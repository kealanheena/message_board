import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from './App';

import mockAxios from '../../__mocks__/axios';
import errorMock from '../../__mocks__/error.json';
import mockMessages from '../../__mocks__/messages.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {

  beforeEach(function() {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: [] }));
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: mockMessages }));
    mockAxios.delete.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(function() {
    mockAxios.post.mockClear();
    mockAxios.get.mockClear();
    mockAxios.delete.mockClear();
  });

  it('renders without crashing', () => {
    const component = mount(<MessageApp/>);
    expect(component).toMatchSnapshot();
  });

  it('has textbox', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('textarea#message_box')).toBe(true);
  });

  it('has a submit button', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('button#submit')).toBe(true);
  });

  it('has message list', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('ul#message_list')).toBe(true);
  });

  it('posts data and clears message box on submit success', () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', {
      target: { value: 'Hello' }
    });
    component.find('form').simulate('submit')

    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", { "content": "Hello" });
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
  });

  it('loads data from API', () => {
    mount(<MessageApp/>);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('updates message on update', async () => {
    const component = await mount(<MessageApp/>);
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#update').simulate('click')

    expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')

    component.find('ul#message_list').childAt(0).find('#send').simulate('click')

    expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:3001/update/1", {"content": "Hello"});
    expect(component.find('textarea').text()).toEqual('');
  });

  it('removes on delete message', async () => {
    const component = await mount(<MessageApp/>);

    await component.update()
    await component.find('ul#message_list').childAt(0).find('#delete').simulate('click');
    await component.update();

    expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:3001/delete/1", { id: 1 });
  })
});

describe('MessageApp erroring', () => {
  beforeEach(function(){
  mockAxios.post.mockImplementation(() => Promise.reject(errorMock));
  mockAxios.get.mockImplementation(() => Promise.reject(errorMock));
})

  afterEach(function(){
      mockAxios.post.mockClear()
      mockAxios.get.mockClear()
    })

  it('loads err on Post err', async () => {
    const component = mount(<MessageApp/>);

    component.find('textarea#message_box').simulate('change', { target: { value: 'bad string' } })

    await component.find('form').simulate('submit')
    await component.update()

    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(component.state().error).toEqual("Error text from json mock");
    expect(component.find('#error').text()).toBe('Error: Error text from json mock');
  });
});
