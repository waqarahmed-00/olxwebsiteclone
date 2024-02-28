import Router from './config/router';
import {store, persistor} from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <div>
        <Router />
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;