import React from 'react';
import { Contact } from '../types/contact';
import './ContactCard.scss';

interface ContactCardProps {
  contact: Contact;
  onNavigate: (contactId: number) => void;
  onClick: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onNavigate, onClick }) => {
  const handleNavigateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(contact.id);
  };

  return (
    <div className="contact-card" onClick={() => onClick(contact)}>
      <div className="contact-main">
        <h3 className="contact-name">{contact.name}</h3>
        <div className="contact-info">
          <p className="contact-phone">{contact.phone}</p>
          <p className="contact-address">{contact.address}</p>
        </div>
      </div>
      <button className="navigate-button" onClick={handleNavigateClick}>
        导航
      </button>
    </div>
  );
};

export default ContactCard;
