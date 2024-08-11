import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import axios from 'axios';

const { Search } = Input;

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value) {
      try {
        const response = await axios.get(`https://dummyjson.com/users/search?q=${value}`);
        setResults(response.data.users);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setResults([]);
    }
  };

  const menu = (
    <Menu>
      {results.map((user) => (
        <Menu.Item key={user.id}>
          {user.firstName} {user.lastName}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} visible={results.length > 0} placement="bottomLeft">
      <Search
        placeholder="Search users..."
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "25%", float: 'right', margin: 16 }}
        allowClear
      />
    </Dropdown>
  );
}

export default SearchBar;
