import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';
import LoginForm from '../../components/LoginForm';
import ForgotPassword from '../ForgotPassword';

describe("LoginContainer", () => {
  let props;
  let mountedLogin;

  const login = () => {
    if (!mountedLogin) {
      mountedLogin = shallow(
        <Login {...props} />
      );
    }
    return mountedLogin;
  }

  beforeEach(() => {
    props = {
      userToken: null,
      object: {}
    };
    mountedLogin = undefined;
  });

  it("always renders a div", () => {
    const divs = login().find('div')
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = login().find('div');
      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(login().children());
    });

    it("renders a header", () => {
      expect(login().find('h1').length).toBe(1);
    });

    it("renders a <LoginForm /> when state.forgotPassword is false", () => {
      let mountedLogin = login();
      expect(mountedLogin.find(LoginForm).length).toBe(1);
    });

    it("renders a <ForgotPassword /> container when state.forgotPassword is true", () => {
      let mountedLogin = login();
      mountedLogin.setState({ forgotPassword: true });
      expect(mountedLogin.find(ForgotPassword).length).toBe(1);
    });
  });
});