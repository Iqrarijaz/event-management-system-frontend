import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { useEventContext } from '@/context/EventContext';

const DropdownFilter = () => {
  const { setFilters } = useEventContext();
  
  // State to hold the current selected filter
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Create a menu with filter options
  const menu = (
    <Menu
      onClick={(e) => {
        const status = e.key === "all" ? 'All' : e.key; // Set to 'All' if the key is 'all'
        setSelectedStatus(status); // Update the selected status
        setFilters((values) => ({
          ...values,
          status: e.key === "all" ? null : e.key, // Update the status filter for event cards
        }));
      }}
    >
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="Ongoing">Ongoing</Menu.Item>
      <Menu.Item key="Completed">Completed</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} className="flex items-center">
      <Button
        className="add-button"
      >
        {`Filter with Status: ${selectedStatus}`} <span className="ant-dropdown-link" />
      </Button>
    </Dropdown>
  );
};

export default DropdownFilter;
