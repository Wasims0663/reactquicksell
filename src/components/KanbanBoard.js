import React from 'react';
import './KanbanBoard.css'; // Import your custom styles

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No Priority';
    default:
      return 'Unknown Priority';
  }
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 4:
      return 'priority-urgent';
    case 3:
      return 'priority-high';
    case 2:
      return 'priority-medium';
    case 1:
      return 'priority-low';
    case 0:
      return 'priority-no-priority';
    default:
      return '';
  }
};

const KanbanCard = ({ ticket }) => {
  const priorityClass = getPriorityClass(ticket.priority);

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <img className="user-avatar" src={ticket.userAvatar} alt="User Avatar" />
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
        <div className={`priority-icon ${priorityClass}`}>
          <span className="priority-label">{getPriorityLabel(ticket.priority)}</span>
        </div>
        <div className="feature-tag">
          <span>Feature Request</span>
        </div>
      </div>
    </div>
  );
};

const KanbanBoard = ({ tickets, groupBy, sortBy }) => {
  const groupTickets = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      let key;
      if (groupBy === 'status') {
        key = ticket.status || 'Unassigned';
      } else if (groupBy === 'user') {
        key = ticket.assigned_user || 'Unassigned';
      } else if (groupBy === 'priority') {
        key = ticket.priority || 'No Priority';
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; // Sort by descending priority
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title); // Sort by ascending title
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets);
  const sortedTickets = Object.entries(groupedTickets).map(([key, value]) => ({
    key,
    tickets: sortTickets(value),
  }));

  return (
    <div className="kanban-board">
      {sortedTickets.map((group) => (
        <div key={group.key} className="kanban-group">
          <h2>{group.key} <span>{group.tickets.length}</span></h2>
          {group.tickets.map((ticket) => (
            <KanbanCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
