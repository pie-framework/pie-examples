import sample from './sample';

export default {
  sample,
};

export const rootReducer = appReducer => (state, action) => {
  return appReducer(state, action);
};
