import React, { useState } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

function UserList() {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`);
      setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
      if (response.data.users.length === 0) setHasMore(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadUsers}
      hasMore={hasMore}
      loader={<div className="loader"><Spin /></div>}
    >
     <Row gutter={[24, 24]}>
        {users.map((user) => (
            <Col xs={24} sm={24} md={8} lg={8} key={user.id}>
            <Card title={`${user.firstName} ${user.lastName}`} bordered={false} >
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address.city}, {user.address.state}</p>
            </Card>
            </Col>
        ))}
    </Row>
    </InfiniteScroll>
  );
}

export default UserList;
