import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './store/reducer/index';
import Todo from './ToDo/Todo';

const store = createStore(reducer);

const App=()=> {
  return (
    <Provider store={store}>
    <Todo />
   </Provider>
  );
}

export default App;
