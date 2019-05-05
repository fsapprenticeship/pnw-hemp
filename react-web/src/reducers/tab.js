import {TAB_FSA} from "../common/constants"
import {CHANGE_TAB} from "../actions/tab"

export default (state = {activeTab: TAB_FSA}, action) => {
  switch (action.type) {
      case CHANGE_TAB:
        return {activeTab: action.activeTab};
      default:
          return state;
  }
};

