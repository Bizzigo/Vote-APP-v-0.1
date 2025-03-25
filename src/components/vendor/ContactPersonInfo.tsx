
import React from 'react';
import { User, Phone, Mail } from 'lucide-react';

interface ContactPersonInfoProps {
  vendorId: string;
}

const ContactPersonInfo: React.FC<ContactPersonInfoProps> = ({ vendorId }) => {
  // In a real app, we would fetch this data based on vendorId
  // For now, we'll generate some mock data
  const contactPerson = React.useMemo(() => {
    // Generate deterministic data based on vendorId
    const names = ['John Smith', 'Maria Garcia', 'Alex Johnson', 'Emma Wong', 'David Chen'];
    const positions = ['Sales Manager', 'CEO', 'Business Development', 'Account Manager', 'Technical Lead'];
    
    // Use vendorId to determine the contact person (not truly random but consistent)
    const nameIndex = parseInt(vendorId.charAt(vendorId.length - 1)) % names.length;
    const positionIndex = (parseInt(vendorId.charAt(0)) || 1) % positions.length;
    
    return {
      name: names[nameIndex],
      position: positions[positionIndex],
      phone: `+371 ${20000000 + parseInt(vendorId) * 7}`,
      email: `contact${vendorId}@vendormail.com`
    };
  }, [vendorId]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Contact Person</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <div>
            <div className="font-medium">{contactPerson.name}</div>
            <div className="text-sm text-muted-foreground">{contactPerson.position}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <a href={`tel:${contactPerson.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
            {contactPerson.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <a href={`mailto:${contactPerson.email}`} className="hover:text-primary transition-colors">
            {contactPerson.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPersonInfo;
