import {act} from 'react-test-renderer';

const initialState = {
  list: [{title: 'Primeira Nota', body: 'Testando 123'}],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      break;
  }
  return state;
};
