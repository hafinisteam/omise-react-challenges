import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import styled from 'styled-components';
import { Layout as BaseLayout } from 'antd';

import store, { persistor } from './state/store';
import CharityList from './components/container/CharityList';
import COLOR from './utilities/layout/color';

const Layout = styled(BaseLayout)`
	background: white;
  margin-top: 100px;
  font-family: 'Open Sans', sans-serif;
`;

const AppHeader = styled.h1`
	font-size: 45px;
  font-weight: 700;
	text-align: center;
  color: ${COLOR.gray};
  letter-spacing: 1px;
  margin-bottom: 25px;
`;

const App = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<div className="container">
            <AppHeader>Charity Donation List</AppHeader>
						<CharityList />
					</div>
				</Layout>
			</PersistGate>
		</ReduxProvider>
	);
};

export default App;
