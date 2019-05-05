import React from 'react';
import { shallow } from 'enzyme';

import ForgotPassword from '../ForgotPassword';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import ResetPasswordForm from '../../components/ResetPasswordForm';

describe("ForgotPassword Container", () => {
  let props;
  let mountedForgotPassword;
  let state = {
    username: '',
    code: '',
    newPassword: '',
    confirmationPending: false,
    errors: []
  };

  const forgotPassword = () => {
    if (!mountedForgotPassword) {
      mountedForgotPassword = shallow(
        <ForgotPassword {...props} />
      );
      mountedForgotPassword.setState(state);
    }
    return mountedForgotPassword;
  };

  beforeEach(() => {
    props = {
      userToken: null,
      object: {}
    };
    mountedForgotPassword = undefined;
  });

  describe("when confirmationPending is false", () => {
    it("renders a <ForgotPasswordForm />", () => {
      expect(forgotPassword().find(ForgotPasswordForm).length).toBe(1);
    });

    it("does not render a <ResetPasswordForm />", () => {
      expect(forgotPassword().find(ResetPasswordForm).length).toBe(0);
    });
  });

  describe("when confirmationPending is true", () => {
    it("renders a <ResetPasswordForm />", () => {
      const wrapper = forgotPassword();
      wrapper.setState({ confirmationPending: true });
      expect(wrapper.find(ResetPasswordForm).length).toBe(1);
    });

    it("does not render a <ForgotPasswordForm />", () => {
      const wrapper = forgotPassword();
      wrapper.setState({ confirmationPending: true });
      expect(wrapper.find(ForgotPasswordForm).length).toBe(0);
    });
  });
});