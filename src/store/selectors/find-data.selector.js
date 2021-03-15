import { createSelector } from 'reselect';

const getIsLoading = (state, modelName) => state[modelName].request.isLoading;

const checkHasData = (state, modelName) => {
  if (
    state[modelName] &&
    state[modelName].data &&
    state[modelName].data.byId &&
    Object.keys(state[modelName].data.byId).length
  ) {
    return true;
  }
};

const getData = (state, modelName, id) => {
  if (
    state[modelName] &&
    state[modelName].data &&
    state[modelName].data.byId &&
    Object.keys(state[modelName].data.byId).length
  ) {
    return state[modelName].data.byId[id];
  }
};

export const getDataById = () =>
  createSelector(
    [getIsLoading, checkHasData, getData],
    (isLoading, hasData, data) => {
      if (isLoading) {
        return { status: 'loading' };
      } else if (data && Object.keys(data).length) {
        return data;
      } else if (!isLoading && hasData && !data) {
        return { status: 'not found' };
      } else {
        return { status: 'not available' };
      }
    },
  );
