import React from 'react';
import './TicketCard.css'; // Assuming you have a CSS file for styling

const TicketCard = ({ ticket }) => {
  return (
    <div className="kanban-card">
      <img src={ticket.userAvatar} alt={`${ticket.assigned_user}'s avatar`} />
      <h3>{ticket.title}</h3>
      <p>Assigned to: {ticket.assigned_user}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default TicketCard;
