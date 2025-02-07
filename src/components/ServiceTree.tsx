import React from 'react';
import './ServiceTree.scss';
import { Service } from '../types/service';

interface ServiceTreeProps {
    services: Service[];
    selectedServices: string[];
    onServiceSelect: (code: string) => void;
    level?: number;
}

const ServiceTree: React.FC<ServiceTreeProps> = ({ 
    services, 
    selectedServices, 
    onServiceSelect,
    level = 0 
}) => {
    const isLeafNode = (service: Service) => !service.children || service.children.length === 0;
    
    const isSelected = (service: Service) => {
        if (isLeafNode(service)) {
            return selectedServices.includes(service.code);
        }
        return service.children?.every(child => {
            if (isLeafNode(child)) {
                return selectedServices.includes(child.code);
            }
            return child.children?.every(grandChild => selectedServices.includes(grandChild.code)) ?? false;
        }) ?? false;
    };

    const isIndeterminate = (service: Service) => {
        if (isLeafNode(service)) return false;
        const hasSelected = service.children?.some(child => {
            if (isLeafNode(child)) {
                return selectedServices.includes(child.code);
            }
            return child.children?.some(grandChild => selectedServices.includes(grandChild.code)) ?? false;
        }) ?? false;
        return hasSelected && !isSelected(service);
    };

    const handleServiceClick = (service: Service) => {
        if (isLeafNode(service)) {
            onServiceSelect(service.code);
        } else {
            const allCodes: string[] = [];
            const collectCodes = (s: Service) => {
                if (isLeafNode(s)) {
                    allCodes.push(s.code);
                } else {
                    s.children?.forEach(collectCodes);
                }
            };
            collectCodes(service);
            
            const allSelected = allCodes.every(code => selectedServices.includes(code)) || false;
            if (allSelected) {
                // 如果所有子服务都已选中,则取消选择所有
                allCodes.forEach(code => onServiceSelect(code));
            } else {
                // 如果不是所有子服务都已选中,则选择所有未选中的
                allCodes.forEach(code => {
                    if (!selectedServices.includes(code)) {
                        onServiceSelect(code);
                    }
                });
            }
        }
    };

    return (
        <div className="service-tree">
            {services.map(service => (
                <div key={service.code} className="service-item">
                    <div className="service-header">
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={isSelected(service)}
                                ref={el => {
                                    if (el) {
                                        el.indeterminate = isIndeterminate(service);
                                    }
                                }}
                                onChange={() => handleServiceClick(service)}
                            />
                            <span 
                                className="service-name"
                                onClick={() => handleServiceClick(service)}
                            >
                                {service.name}
                            </span>
                        </div>
                    </div>
                    {service.children && (
                        <div className="service-children">
                            <ServiceTree
                                services={service.children}
                                selectedServices={selectedServices}
                                onServiceSelect={onServiceSelect}
                                level={level + 1}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServiceTree;
