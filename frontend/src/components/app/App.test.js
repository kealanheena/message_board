import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from './App';

import mockAxios from '../../__mocks__/axios'
import errorMock from '../../__mocks__/error.json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {

  beforeEach(function() {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(function() {
    mockAxios.post.mockClear();
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

    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3000/message", { "content": "Hello" });
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
  });

  it('loads data from API', () => {
    mount(<MessageApp/>);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
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

  it('loads err on GET err',async() => {
    const component = await mount(<MessageApp/>);

    console.log(component.state())
    await component.update()
    console.log(component.state())

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
    expect(component.find('#error').text()).toBe('Error: error text from json mock');
  });

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
