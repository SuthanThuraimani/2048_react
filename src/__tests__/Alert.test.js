import React from 'react';
import { shallow } from 'enzyme';
import Message from './../component/Alert/Message';

describe('Message', () => {
    it('should render correctly', () => {
        const component = shallow(<Message msg="success" />);
        expect(component).toMatchSnapshot();
    });
});