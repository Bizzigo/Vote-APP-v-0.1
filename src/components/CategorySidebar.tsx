
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { BadgeCheck, Briefcase, Building, Coffee, Construction, Hammer, Laptop, ServerCog, Shirt, Truck, Wrench, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CategoryItem {
  name: string;
  count: number;
  icon: React.ComponentType<any>;
  slug: string;
  highlighted?: boolean;
}

const categories: CategoryItem[] = [
  { name: 'IT Services', count: 247, icon: Laptop, slug: 'it-services' },
  { name: 'Construction', count: 184, icon: Construction, slug: 'construction' },
  { name: 'Vakances', count: 92, icon: BookOpen, slug: 'vakances', highlighted: true },
  { name: 'Manufacturing', count: 156, icon: Wrench, slug: 'manufacturing' },
  { name: 'Retail', count: 132, icon: Shirt, slug: 'retail' },
  { name: 'Transportation', count: 117, icon: Truck, slug: 'transportation' },
  { name: 'Business Services', count: 104, icon: Briefcase, slug: 'business-services' },
  { name: 'Food & Beverage', count: 93, icon: Coffee, slug: 'food-beverage' },
  { name: 'Technical Services', count: 86, icon: ServerCog, slug: 'technical-services' },
  { name: 'Craftsmanship', count: 74, icon: Hammer, slug: 'craftsmanship' },
  { name: 'Corporate Services', count: 68, icon: Building, slug: 'corporate-services' },
];

const popularCategories = categories.slice(0, 3);
const otherCategories = categories.slice(3);

const CategorySidebar = () => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Popular Categories
        </SidebarGroupLabel>
        <SidebarMenu>
          {popularCategories.map((category) => (
            <SidebarMenuItem key={category.slug}>
              <SidebarMenuButton asChild className={`justify-between ${category.highlighted ? 'bg-primary/10 text-primary animate-pulse-slow' : ''}`}>
                <Link to={`/category/${category.slug}`}>
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal bg-background/50">
                    {category.count}
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          All Categories
        </SidebarGroupLabel>
        <SidebarMenu>
          {otherCategories.map((category) => (
            <SidebarMenuItem key={category.slug}>
              <SidebarMenuButton asChild className="justify-between">
                <Link to={`/category/${category.slug}`}>
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal bg-background/50">
                    {category.count}
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Featured Services
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="bg-primary/10 text-primary">
              <Link to="/featured-vendors">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Premium Vendors</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default CategorySidebar;
