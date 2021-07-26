import { combineReducers } from "redux";

import {
  REMOVE_USER,
  HAS_USER,
  UPDATE_USER,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
  CHANGE_SHOW,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "./actions";

//const merge = (prev, next) => Object.assign({}, prev, next)

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      if (state.length !== 0) {
        const other = state.filter((item) => {
          if (item.id !== +action.payload.id) {
            return item;
          }
        });
        return other;
      } else {
        return [];
      }
    case UPDATE_TASK:
      const newArr = state.map((task) => {
        if (action.payload.id === task.id) {
          return {
            id: action.payload.id,
            name: action.payload.name,
            date: action.payload.date,
            time: action.payload.time,
            defaultDate: action.payload.defaultDate,
            isDaily: action.payload.isDaily,
          };
        } else {
          return task;
        }
      });
      return newArr;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};

const CountReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_TASK:
      return ++state;
    default:
      return state;
  }
};

const AppCountReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return state++;
    default:
      return state;
  }
};

const showReducer = (state = false, action) => {
  switch (action.type) {
    case CHANGE_SHOW:
      return !state;
    default:
      return state;
  }
};

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.payload];
    case DELETE_NOTE:
      if (state.length !== 0) {
        const other = state.filter((item) => {
          if (item.id !== +action.payload.id) {
            return item;
          }
        });
        return other;
      } else {
        return [];
      }
    case UPDATE_NOTE:
      const newArr = state.map((task) => {
        if (action.payload.id === task.id) {
          return {
            id: action.payload.id,
            name: action.payload.name,
            body: action.payload.body,
          };
        } else {
          return task;
        }
      });
      return newArr;
    default:
      return state;
  }
};

const notesIdReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_NOTE:
      const newId = ++state;
      return newId;
    default:
      return state;
  }
};

const hasUser = (state = false, action) => {
  switch (action.type) {
    case HAS_USER:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
  count: CountReducer,
  appCount: AppCountReducer,
  shouldShow: showReducer,
  notes: notesReducer,
  notesId: notesIdReducer,
  hasUser: hasUser,
});

export default reducer;
