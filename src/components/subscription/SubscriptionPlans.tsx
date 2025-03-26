
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubscriptionPlansProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  selectedPlan,
  setSelectedPlan
}) => {
  const plans = [
    {
      id: 'hobby',
      name: 'Hobby',
      price: '$19',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
      ],
      popular: false,
    },
    {
      id: 'freelancer',
      name: 'Freelancer',
      price: '$29',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time',
      ],
      popular: false,
    },
    {
      id: 'startup',
      name: 'Startup',
      price: '$59',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom reporting tools',
      ],
      popular: false,
    },
  ];

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1 bg-muted rounded-lg">
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm transition-colors",
              {
                "bg-white text-primary-foreground shadow": true,
                "bg-transparent text-muted-foreground": false
              }
            )}
          >
            Monthly
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm transition-colors",
              {
                "bg-white text-primary-foreground shadow": false,
                "bg-transparent text-muted-foreground": true
              }
            )}
          >
            Annually
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={cn(
              "relative flex flex-col p-6 bg-card border rounded-lg",
              {
                "border-primary ring-2 ring-primary": selectedPlan === plan.id,
                "border-border/60": selectedPlan !== plan.id,
                "scale-105 shadow-lg z-10": plan.popular && selectedPlan !== plan.id
              }
            )}
          >
            {plan.popular && selectedPlan !== plan.id && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            
            <div className="flex-grow mt-4 space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              className={cn(
                "mt-6 w-full py-2 px-4 rounded-md font-medium transition-colors",
                {
                  "bg-primary text-primary-foreground hover:bg-primary/90": selectedPlan === plan.id,
                  "bg-card border border-input hover:bg-accent hover:text-accent-foreground": selectedPlan !== plan.id
                }
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {selectedPlan === plan.id ? "Selected" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
