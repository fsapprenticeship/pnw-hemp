import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationForm from '../ConfirmationForm';

var sinon = require('sinon');

describe("ConfirmationForm", () => {
  let props;
  let mountedConfirmationForm;
  let state = {
    confirmationCode: ''
  };

  const confirmationForm = () => {
    if (!mountedConfirmationForm) {
      mountedConfirmationForm = shallow(
        <ConfirmationForm {...props} />
      );
      mountedConfirmationForm.setState(state);
    };
    return mountedConfirmationForm;
  };

  beforeEach(() => {
    props = {
      userToken: null,
      object: {},
      errors: [],
      handleOnSubmit: jest.fn(),
      addError: jest.fn()
    };
    mountedConfirmationForm = undefined;
  });

  it("always renders a form", () => {
    expect(confirmationForm().find('form').length).toBe(1);
  });

  describe("the rendered form", () => {
    it("contains a p#formErrors element", () => {
      let form = confirmationForm().find('form').first();
      expect(form.find('p#formErrors').length).toBe(1);
    });

    describe("the errors <p> when props.errors is empty", () => {
      it("does not contain any text", () => {
        expect(confirmationForm().find('p#formErrors').text()).toBe("");
      });
    });

    describe("the errors <p> when props.errors is populated", () => {
      it("displays a single error correctly", () => {
        // dummy error for test only
        props.errors.push('Form must not be empty');
        let errorTag = confirmationForm().find('p#formErrors');
        expect(errorTag.text()).toBe('Form must not be empty');
      });

      it("displays multiple errors correctly", () => {
        // dummy errors for test only 
        props.errors.push("Incorrect confirmation code");
        props.errors.push("Confirmation code must be a number");
        let errorTag = confirmationForm().find('p#formErrors');
        expect(errorTag.text()).toBe("Incorrect confirmation code, Confirmation code must be a number");
      });
    });

    describe("input field for confirmationCode", () => {
      it("is defined", () => {
        expect(confirmationForm().find('#confirmationCode').length).toBe(1);
      });

      it("updates state.confirmationCode upon change", () => {
        let form = confirmationForm();
        let inputField = form.find('#confirmationCode');
        inputField.simulate('change', { target: { id: 'confirmationCode', value: '1337' } });
        expect(form.state('confirmationCode')).toBe('1337');
      });
    });

    describe("submitting the form", () => {
      it("does not call handleOnSubmit withouot proper data", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addError');
        let wrapper = confirmationForm();
        let form = wrapper.find('form').first();
        form.simulate('submit', { preventDefault: () => { } });
        expect(submitSpy.calledOnce).toBe(false);
        expect(errorSpy.calledOnce).toBe(true)
      });

      it("calls the handleOnSubmit prop function with proper data", () => {
        const submitSpy = sinon.spy(props, 'handleOnSubmit');
        const errorSpy = sinon.spy(props, 'addError');
        let wrapper = confirmationForm();
        // Confirmation code sent is six digits long
        wrapper.setState({
          confirmationCode: "123456"
        });
        let form = wrapper.find('form').first();
        form.simulate('submit', { preventDefault: () => {} });
        expect(submitSpy.calledOnce).toBe(true);
        expect(errorSpy.called).toBe(false);
      });
    });
  });
});