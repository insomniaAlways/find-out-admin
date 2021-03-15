import { createSelector } from 'reselect';

const generateList = (state, modelName) => {
  if (
    state &&
    state[modelName] &&
    state[modelName].data &&
    state[modelName].data.byId &&
    Object.keys(state[modelName].data.byId).length
  ) {
    return Object.values(state[modelName].data.byId);
  }
};

export const getListData = () =>
  createSelector(generateList, (result) => {
    if (result && Array.isArray(result) && result.length) {
      return result;
    } else {
      return [];
    }
  });
