import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../LoginForm';

var sinon = require('sinon');

describe("LoginForm", () => {
  let props;
  let mountedLoginForm;
  let state = {
    username: '',
    password: ''
  };

  const loginForm = () => {
    if (!mountedLoginForm) {
      mountedLoginForm = shallow(
        <LoginForm {...props} />
      );
      mountedLoginForm.setState(state);
    };
    return mountedLoginForm;
  };

  beforeEach(() => {
    props = {
      userToken: null,
      object: {},
      errors: [],
      handleOnSubmit: jest.fn(),
      forgotPassword: jest.fn(),
      addErrors: jest.fn()
    };
    mountedLoginForm = undefined
  });

  it("always renders a p#formErrors", () => {
    expect(loginForm().find('p#formErrors').length).toBe(1);
  });

  describe("the rendered p tag", () => {
    it("is empty when props.errors is empty", () => {
      const errorTag = loginForm().find('p#formErrors');
      expect(errorTag.text()).toBe("");
    });

    it("renders an error message when props.errors is defined", () => {
      props.errors.push("Username cannot be blank");
      const errorTag = loginForm().find('p#formErrors');
      expect(errorTag.text()).toBe("Username cannot be blank");
    });

    it("renders an array of errors", () => {
      props.errors.push("Username cannot be blank");
      props.errors.push("Password cannot be blank");
      const errorTag = loginForm().find('p#formErrors');
      expect(errorTag.text()).toBe("Username cannot be blank, Password cannot be blank");
    });
  });

  it("always renders a form", () => {
    expect(loginForm().find('form').length).toBe(1);
  });

  describe("the rendered form", () => {
    describe("filling in the username field", () => {
      it("updates state.username", () => {
        const form = loginForm();
        const usernameField = form.find('#username');
        usernameField.simulate('change', { target: { id: 'username', value: 'aspenJames' } });
        expect(form.state('username')).toBe('aspenJames');
      });
    });

    describe("filling in the password field", () => {
      it("updates state.password", () => {
        const form = loginForm();
        const passwordField = form.find('#password');
        passwordField.simulate('change', { target: { id: 'password', value: 'P@ssw0rd' } });
        expect(form.state('password')).toBe("P@ssw0rd");
      });
    });

    describe("when the form is submitted", () => {
      it("does not call the handleOnSubmit without a username", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addErrors');
        const form = loginForm();
        form.setState({
          username: '',
          password: 'P@ssw0rd!'
        });
        form.find('form').first().simulate('submit', { preventDefault: () => {} });
        expect(submitSpy.calledOnce).toBe(false);
        expect(errorSpy.called).toBe(true);
      });

      it("calls the onSubmit function with valid data", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addErrors');
        const form = loginForm();
        form.setState({
          username: 'aspen.james',
          password: 'P@ssw0rd!'
        });
        form.find('form').first().simulate('submit', { preventDefault: () => {} });
        expect(submitSpy.calledOnce).toBe(true);
        expect(errorSpy.called).toBe(false);
      });
    });

    it("renders a 'Forgot password?' link", () => {
      const link = loginForm().find('a').first();
      expect(link.text()).toBe("Forgot password?");
    })

    describe("the forgot password link", () => {
      it("on click, calls the forgotPassword prop", () => {
        const linkSpy = sinon.spy(props, 'forgotPassword');
        const form = loginForm();
        form.find('a').first().simulate('click');
        expect(linkSpy.calledOnce).toBe(true);
      });
    });
  });


});