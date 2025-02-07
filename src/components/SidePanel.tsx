import React, { useState, useCallback } from 'react';
import './SidePanel.scss';
import { mockContacts } from '../data/mockContacts.ts';
import { mockRoutes } from '../data/mockRoutes.ts';
import { mockServices } from '../data/mockServices.ts';
import ContactCard from './ContactCard.tsx';
import RouteDetails from './RouteDetails.tsx';
import ServiceTree from './ServiceTree.tsx';
import { Contact } from '../types/contact';

type PanelView = 'contacts' | 'route' | 'details' | 'services';

const SidePanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<PanelView>('contacts');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showServicePanel, setShowServicePanel] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setSlideDirection('left');
    setCurrentView('details');
  };

  const handleNavigateClick = (contactId: number) => {
    setSelectedRoute(contactId);
    setSlideDirection('left');
    setCurrentView('route');
  };

  const handleBack = () => {
    setSlideDirection('right');
    if (currentView === 'services') {
      setShowServicePanel(false);
    }
    setCurrentView('contacts');
  };

  const handleClose = () => {
    setShowServicePanel(false);
  }

  const handleServiceSelect = useCallback((code: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(code);
      if (isSelected) {
        return prev.filter(c => c !== code);
      }
      return [...prev, code];
    });
  }, []);

  const toggleServicePanel = () => {
    setShowServicePanel(!showServicePanel);
  };

  const renderServicePanel = () => {
    return (
      <>
        <div className={`service-panel ${showServicePanel ? 'visible' : ''}`}>
          <div className="service-panel-content">
            <ServiceTree
              services={mockServices}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
            />
          </div>
        </div>
        <div className="service-panel-overlay" onClick={handleClose} />
      </>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'contacts':
        return (
          <div className={`slide-container ${slideDirection}`}>
            {mockContacts.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact}
                onNavigate={handleNavigateClick}
                onClick={handleContactClick}
              />
            ))}
          </div>
        );
      case 'route':
        return (
          <div className={`slide-container ${slideDirection}`}>
            {selectedRoute && mockRoutes[selectedRoute] && (
              <RouteDetails 
                route={mockRoutes[selectedRoute]}
                onBack={handleBack}
              />
            )}
          </div>
        );
      case 'details':
        return (
          <div className={`slide-container ${slideDirection}`}>
            {selectedContact && (
              <div className="contact-details">
                <button className="back-button" onClick={handleBack}>
                  ← 返回
                </button>
                <h2>{selectedContact.name}</h2>
                <div className="details-content">
                  <p><strong>电话:</strong>{selectedContact.phone}</p>
                  <p><strong>地址:</strong>{selectedContact.address}</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`side-panel ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="toggle-button"
        onClick={togglePanel}
      >
        {isExpanded ? '◀' : '▶'}
      </button>
      <div className="panel-content">
        <div className="filter-buttons">
          <button 
            className="filter-button"
            onClick={toggleServicePanel}
          >
            服务
            {selectedServices.length > 0 && (
              <span className="selected-count">{selectedServices.length}</span>
            )}
          </button>
        </div>
        {renderContent()}
        {renderServicePanel()}
      </div>
    </div>
  );
};

export default SidePanel;
