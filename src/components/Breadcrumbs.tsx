
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const getDefaultBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) return [];
  
  return paths.map((path, index) => {
    // Generate a URL for this breadcrumb based on path so far
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    
    // Format path for display (capitalize, replace hyphens with spaces)
    const label = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Check if this is the last (current) breadcrumb
    const isCurrent = index === paths.length - 1;
    
    return { label, path: url, isCurrent };
  });
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // If no items provided, generate them from current location
  const breadcrumbs = items || getDefaultBreadcrumbs(location.pathname);
  
  if (breadcrumbs.length === 0) return null;
  
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only sm:inline">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
