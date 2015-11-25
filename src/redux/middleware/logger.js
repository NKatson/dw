
export default function logger(store) {
  return next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log(store.getState());
    return result;
  }
};
