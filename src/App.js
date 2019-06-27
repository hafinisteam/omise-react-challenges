import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import styled from "styled-components";
import { Layout as BaseLayout } from "antd";

import store from "./state/store";
import CharityList from "./components/container/CharityList";
import COLOR from "./utilities/layout/color";
import CharityTotal from "./components/container/CharityList/CharityTotal";

const Layout = styled(BaseLayout)`
  background: white;
  margin-top: 100px;
  font-family: "Open Sans", sans-serif;
`;

const Container = styled.div`
  position: relative;
`;

const AppHeader = styled.h1`
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  color: ${COLOR.gray};
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <Container className="container">
          <AppHeader>Charity Donation List</AppHeader>
          <CharityTotal />
          <CharityList />
        </Container>
      </Layout>
    </ReduxProvider>
  );
};

export default App;
