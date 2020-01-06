import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BurgerIngredient from './BurgerIngredient';

configure({adapter: new Adapter()})

describe('<BurgerIngredient />', () =>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerIngredient />);
    });

    it('Should render <div className={classes.BreadBottom} /> if props.types ="Bread-Bottom"', () =>{
        wrapper.setProps({type:'bread-bottom'});
        expect(wrapper.find('.BreadBottom'));
    })
})