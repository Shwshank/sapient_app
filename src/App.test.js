import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from './../utils';
import App from './App';

const setUp = (props={}) => {
    const component = shallow(<App {...props} />);
    return component;
};

describe('App Component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'appComponent');
        console.log(wrapper);
        expect(wrapper.length).toBe(1);
    });

    // it('Should render a logo', () => {
    //     const logo = findByTestAtrr(component, 'logoIMG');
    //     expect(logo.length).toBe(1);
    // });

});
