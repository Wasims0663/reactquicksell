// src/utils/helpers.js
export const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((acc, ticket) => {
      const group = ticket[groupBy] || 'Unassigned';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(ticket);
      return acc;
    }, {});
  };
  
  export const sortTickets = (groupedTickets, sortBy) => {
    const sorted = {};
    Object.keys(groupedTickets).forEach((group) => {
      sorted[group] = groupedTickets[group].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });
    return sorted;
  };
  export const groupTicketsByUser = (tickets) => {
    return tickets.reduce((groups, ticket) => {
      const user = ticket.assignedUser || 'Unassigned'; // Group tickets under users, or "Unassigned"
      if (!groups[user]) {
        groups[user] = [];
      }
      groups[user].push(ticket);
      return groups;
    }, {});
  };
  