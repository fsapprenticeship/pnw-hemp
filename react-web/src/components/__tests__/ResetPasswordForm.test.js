import React from 'react';
import { shallow } from 'enzyme';

import ResetPasswordForm from '../ResetPasswordForm';

var sinon = require('sinon');

describe("ResetPasswordForm", () => {
  let props;
  let mountedRPF;

  const resetPassword = () => {
    if (!mountedRPF) {
      mountedRPF = shallow(
        <ResetPasswordForm {...props} />
      );
      return mountedRPF;
    };
  };

  beforeEach(() => {
    props = {
      userToken: null,
      object: {},
      data: {
        username: '',
        code: '',
        newPassword: '',
        confirmationPending: true,
        errors: []
      },
      handleOnChange: jest.fn(),
      handleOnSubmit: jest.fn(),
      addError: jest.fn()
    };
    mountedRPF = undefined;
  });

  it("always renders an error tag with id 'formErrors'", () => {
    expect(resetPassword().find('#formErrors').length).toBe(1);
  });

  describe("the error tag", () => {
    it("is empty when props.data.errors is empty", () => {
      const errorTag = resetPassword().find('#formErrors');
      expect(errorTag.text()).toBe('');
    });

    it("renders a single error correctly", () => {
      props.data.errors.push('Incorrect confirmation code');
      const errorTag = resetPassword().find('#formErrors');
      expect(errorTag.text()).toBe("Incorrect confirmation code");
    });

    it("renders multiple errors correctly", () => {
      props.data.errors.push('Incorrect confirmation code');
      props.data.errors.push('New password may not be blank');
      const errorTag = resetPassword().find('#formErrors');
      expect(errorTag.text()).toBe("Incorrect confirmation code, New password may not be blank");
    });
  });

  it("always renders a form", () => {
    expect(resetPassword().find('form').length).toBe(1);
  });

  describe("the rendered form", () => {
    it("has fields for confirmation code and new password", () => {
      const form = resetPassword().find('form').first();
      expect(form.find('#code').length).toBe(1);
      expect(form.find('#newPassword').length).toBe(1);
    });
    
    describe("the input fields", () => {
      it("calls the props.handleOnChange function upon change", () => {
        const changeSpy = sinon.spy(props, 'handleOnChange');
        const form = resetPassword();
        form.find('#code').simulate('change', { target: { id: 'code', value: '1337' } });
        form.find('#newPassword').simulate('change', { target: { id: 'newPassword', value: 'P@ssw0rd' } });
        expect(changeSpy.calledTwice).toBe(true);
      });

      it("has the value of props.data.code and props.data.newPassword, respectively", () => {
        props.data.code = '1337';
        props.data.newPassword = 'P@ssw0rd';
        const form = resetPassword();
        const codeField = form.find('#code').first();
        const passwordField = form.find('#newPassword').first();
        expect(codeField.prop('value')).toBe('1337');
        expect(passwordField.prop('value')).toBe('P@ssw0rd');
      });
    });

    describe("submitting the form", () => {
      it("does not call the handleOnSubmit without a valid code", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addError');
        props.data = {
          username: '',
          code: '1256',
          newPassword: 'P@ssw0rd!',
          confirmationPending: true,
          errors: []
        }
        const wrapper = resetPassword();
        wrapper.find('form').simulate('submit', { preventDefault: () => { } });
        expect(submitSpy.calledOnce).toBe(false);
        expect(errorSpy.called).toBe(true);
      });

      it("does not call the handleOnSubmit without a valid password", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addError');
        props.data = {
          username: '',
          code: '123456',
          newPassword: 'weakpass',
          confirmationPending: true,
          errors: []
        }
        const wrapper = resetPassword();
        wrapper.find('form').simulate('submit', { preventDefault: () => { } });
        expect(submitSpy.calledOnce).toBe(false);
        expect(errorSpy.called).toBe(true);
      })

      it("calls the handleOnSubmit prop function with valid data", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addError');
        props.data = {
          username: '',
          code: '123456',
          newPassword: 'P@ssw0rd!',
          confirmationPending: true,
          errors: []
        }
        const wrapper = resetPassword();
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
        expect(submitSpy.calledOnce).toBe(true);
        expect(errorSpy.called).toBe(false);
      });
    });
  });
});