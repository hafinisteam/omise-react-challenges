import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import styled from 'styled-components';
import { Layout as BaseLayout } from "antd";

import store, { persistor } from "./state/store";
import CharityList from "./components/container/CharityList";

const Layout = styled(BaseLayout)`
  background: white;
`

const App = props => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <div className="container">
            <CharityList />
          </div>
        </Layout>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
