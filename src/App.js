// App.js
import React from 'react';
import { Layout } from 'antd';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px' }}>
        <div className="logo">User Search App</div>
        <SearchBar className="search-bar" />
      </Header>
      <Content>
        <UserList />
      </Content>
    </Layout>
  );
}

export default App;
