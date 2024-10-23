import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([
    {
      id: 'CAM-11',
      title: 'Conduct Security Vulnerability Assessment',
      status: 'In Progress',
      priority: 3,
      userAvatar: 'https://example.com/avatar1.png',
      assigned_user: 'User 1'
    },
    {
      id: 'CAM-12',
      title: 'Feature B Implementation',
      status: 'To Do',
      priority: 2,
      userAvatar: 'https://example.com/avatar2.png',
      assigned_user: 'User 2'
    },
    {
      id: 'CAM-13',
      title: 'Bug Fix for Authentication Module',
      status: 'Done',
      priority: 4,
      userAvatar: 'https://example.com/avatar3.png',
      assigned_user: 'User 3'
    },
    {
      id: 'CAM-14',
      title: 'UI Improvement for Dashboard',
      status: 'To Do',
      priority: 1,
      userAvatar: 'https://example.com/avatar4.png',
      assigned_user: 'User 4'
    },
    {
      id: 'CAM-15',
      title: 'Database Migration Plan',
      status: 'In Progress',
      priority: 3,
      userAvatar: 'https://example.com/avatar5.png',
      assigned_user: 'User 5'
    },
    {
      id: 'CAM-16',
      title: 'API Documentation Update',
      status: 'To Do',
      priority: 2,
      userAvatar: 'https://example.com/avatar6.png',
      assigned_user: 'User 6'
    },
    {
      id: 'CAM-17',
      title: 'Performance Optimization for Reports',
      status: 'Done',
      priority: 4,
      userAvatar: 'https://example.com/avatar7.png',
      assigned_user: 'User 7'
    },
    {
      id: 'CAM-18',
      title: 'Implement CI/CD Pipeline',
      status: 'In Progress',
      priority: 2,
      userAvatar: 'https://example.com/avatar8.png',
      assigned_user: 'User 8'
    },
  ]);

  const [groupBy, setGroupBy] = useState('status'); // Default group by status
  const [sortBy, setSortBy] = useState('priority'); // Default sort by priority
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved state from localStorage
    const savedGroupBy = localStorage.getItem('groupBy');
    const savedSortBy = localStorage.getItem('sortBy');

    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }

    const fetchTickets = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.quicksell.co/v1/internal/frontend-assignment');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the fetched data for inspection

        // Ensure the data structure is as expected before setting it
        if (Array.isArray(data)) {
          const formattedTickets = data.map(ticket => ({
            ...ticket,
            userAvatar: ticket.userAvatar || 'https://placeholder.com/placeholder.png', // Add a default avatar if none exists
          }));
          setTickets(formattedTickets);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Save state on change
  const handleGroupByChange = (value) => {
    setGroupBy(value);
    localStorage.setItem('groupBy', value); // Save to localStorage
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    localStorage.setItem('sortBy', value); // Save to localStorage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(tickets); // Check tickets data before passing to KanbanBoard

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
        <div className="controls">
          <select onChange={(e) => handleGroupByChange(e.target.value)} value={groupBy}>
            <option value="status">Group by Status</option>
            <option value="user">Group by User</option>
            <option value="priority">Group by Priority</option>
          </select>
          <select onChange={(e) => handleSortByChange(e.target.value)} value={sortBy}>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </header>
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
