
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
      id: 'freelancer',
      name: 'Freelancer',
      price: '$19',
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
      price: '$29',
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
      price: '$59',
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
        <div className="inline-flex items-center p-1 rounded-lg bg-card border border-border/30">
          <button
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-colors",
              {
                "bg-primary text-primary-foreground": true,
                "bg-transparent text-muted-foreground": false
              }
            )}
          >
            Monthly
          </button>
          <button
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-colors",
              {
                "bg-primary text-primary-foreground": false,
                "bg-transparent text-muted-foreground": true
              }
            )}
          >
            Annually
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={cn(
              "relative flex flex-col p-6 bg-card border rounded-lg overflow-hidden",
              {
                "border-primary ring-2 ring-primary": selectedPlan === plan.id,
                "border-border/30": selectedPlan !== plan.id,
                "shadow-lg z-10": plan.popular && selectedPlan !== plan.id
              }
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 left-0 bg-primary py-1.5 px-4">
                <span className="text-xs font-medium text-primary-foreground">Most popular</span>
              </div>
            )}
            
            <div className={cn("space-y-2", {"pt-6": plan.popular})}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            
            <div className="mt-6">
              <button
                className={cn(
                  "w-full py-2.5 px-4 rounded-md font-medium transition-colors text-center",
                  {
                    "bg-primary text-primary-foreground hover:bg-primary/90": selectedPlan === plan.id || plan.popular,
                    "bg-card border border-input hover:bg-accent hover:text-accent-foreground": selectedPlan !== plan.id && !plan.popular
                  }
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Buy plan"}
              </button>
            </div>
            
            <div className="flex-grow mt-6 space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
