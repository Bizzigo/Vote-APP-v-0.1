
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
      id: 'startup',
      name: 'Monthly Plan',
      price: '9,99€',
      description: 'Billed monthly, cancel anytime.',
      features: [
        'Full profile info',
        'All contact details',
        'Unlimited keywords',
        'Unlimited categories',
        'Unlimited offers',
        'Unlimited ads',
        'Email support',
      ],
      popular: true,
      billing: 'monthly'
    },
    {
      id: 'enterprise',
      name: 'Yearly Plan',
      price: '99€',
      description: 'Billed annually, save over 17%.',
      features: [
        'Full profile info',
        'All contact details',
        'Unlimited keywords',
        'Unlimited categories',
        'Unlimited offers',
        'Unlimited ads',
        'Email support',
      ],
      popular: false,
      billing: 'yearly'
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <span className="text-sm text-muted-foreground ml-1">
                  {plan.billing === 'monthly' ? '/month' : '/year'}
                </span>
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
