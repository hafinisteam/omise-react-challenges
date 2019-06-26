import React from 'react'
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from './state/store';

const App = () => {
  return (
    <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <p>App start</p>
    </PersistGate>
  </ReduxProvider>
  )
}

export default App
