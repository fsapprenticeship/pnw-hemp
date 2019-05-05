import React from 'react';
import { shallow } from 'enzyme';

import ForgotPasswordForm from '../ForgotPasswordForm';

var sinon = require('sinon');

describe("ForgotPasswordForm", () => {
  let props;
  let mountedFPF;

  const forgotPassword = () => {
    if (!mountedFPF) {
      mountedFPF = shallow(
        <ForgotPasswordForm {...props} />
      );
    };
    return mountedFPF;
  };

  beforeEach(() => {
    props = {
      data: {
        username: '',
        code: '',
        newPassword: '',
        confirmationPending: false,
        errors: []
      },
      handleOnChange: jest.fn(),
      handleOnSubmit: jest.fn(),
      addError: jest.fn()
    };
    mountedFPF = undefined;
  });

  it("renders a <p> with class 'light'", () => {
    expect(forgotPassword().find('p.light').length).toBe(1);
  });

  it("renders an error tag with id 'formErrors'", () => {
    expect(forgotPassword().find('#formErrors').length).toBe(1);
  });

  describe("the error tag", () => {
    it("is empty when props.data.errors is empty", () => {
      let errorTag = forgotPassword().find('#formErrors');
      expect(errorTag.text()).toBe('');
    });

    it("displays a single error correctly", () => {
      props.data.errors.push('Username must not be blank');
      let errorTag = forgotPassword().find('#formErrors');
      expect(errorTag.text()).toBe("Username must not be blank");
    });

    it("displays multiple errors correctly", () => {
      props.data.errors.push('Username must not be blank');
      props.data.errors.push('Username must be valid');
      let errorTag = forgotPassword().find('#formErrors');
      expect(errorTag.text()).toBe("Username must not be blank, Username must be valid");
    });
  });

  describe("input field for username", () => {
    it("is defined", () => {
      expect(forgotPassword().find('#username').length).toBe(1)
    });

    it("calls the handleOnChange prop on change", () => {
      const changeSpy = sinon.spy(props, 'handleOnChange');
      const form = forgotPassword();
      const inputField = form.find('#username');
      const event = { target: { id: 'username', value: 'aspenJames' } }
      inputField.simulate('change', event );
      expect(changeSpy.calledOnceWith(event)).toBe(true);
    });
  });

  describe("submitting the form", () => {
    it("does not call the handleOnSubmit without valid data", () => {
      const submitSpy = sinon.spy(props, 'handleOnSubmit');
      const errorSpy = sinon.spy(props, 'addError');
      const form = forgotPassword();
      form.find('form').first().simulate('submit', { preventDefault: () => {} })
      expect(submitSpy.calledOnce).toBe(false);
      expect(errorSpy.called).toBe(true);
    })

    it("calls the handleOnSubmit prop function with valid data", () => {
      const submitSpy = sinon.spy(props, 'handleOnSubmit');
      const errorSpy = sinon.spy(props, 'addError');
      props.data.username = 'Username';
      const form = forgotPassword();
      form.find('form').first().simulate('submit', { preventDefault: () => {} })
      expect(submitSpy.calledOnce).toBe(true);
      expect(errorSpy.called).toBe(false);
    });
  });
});