import sample from './sample';

export default {
  sample,
};

export const rootReducer = appReducer => (state, action) => appReducer(state, action);
