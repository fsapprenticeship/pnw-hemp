import React from 'react';
import { shallow } from 'enzyme';

import Signup from '../Signup';
import RegistrationForm from '../../components/RegistrationForm';
import ConfirmationForm from '../../components/ConfirmationForm';

describe("Signup", () => {
  let props;
  let mountedSignup;
  // this function checks if our mountedSignup
  // is defined or not. If yes, return it. 
  // If no, mount our component and return it. 
  const signup = () => {
    if (!mountedSignup) {
      mountedSignup = shallow(
        <Signup {...props} />
      );
    }
    return mountedSignup;
  }

  // This resets our starting point before 
  // each test for a clean slate.
  beforeEach(() => {
    props = {
      userToken: null,
      object: {}
    };
    mountedSignup = undefined;
  });

  // Tests go here
  it("always renders a div", () => {
    const divs = signup().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = signup().find("div");
      // Enzyme .find arranges nodes in order such that the 
      // outermost node is first in the list. We can call
      // .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost div when using .children() 
      // on signup(). We can use this to verify that wrappingDiv
      // contains everything else our component renders.
      expect(wrappingDiv.children()).toEqual(signup().children());
    });

    it("always renders a header", () => {
      expect(signup().find('h1').length).toBe(1);
    });

    it("renders a <RegistrationForm/> component when state 'confirmationRequired' is false", () => {
      expect(signup().find(RegistrationForm).length).toBe(1);
    });

    it("renders a <ConfirmationForm/> component when state 'confirmationRequired' is true", () => {
      let mountedSignup = signup();
      mountedSignup.setState({confirmationRequired: true});
      expect(mountedSignup.find(ConfirmationForm).length).toBe(1);
    });
  });
});
