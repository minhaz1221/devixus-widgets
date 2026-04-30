export const PLANS = {
  free: {
    name: 'Free',
    priceMonthly: '$0',
    price: 0,
    widgetLimit: 1,
    removeBranding: false,
    variantId: null as string | null | undefined,
    features: [
      '1 widget',
      'Devixus branding shown',
      'All widget types',
      'Unlimited installs',
      'Basic analytics',
    ],
  },
  pro: {
    name: 'Pro',
    priceMonthly: '$9',
    price: 900,
    widgetLimit: 5,
    removeBranding: true,
    variantId: null as string | null,
    features: [
      '5 widgets',
      'No Devixus branding',
      'All widget types',
      'Unlimited installs',
      'Full analytics',
      'Priority support',
    ],
  },
  agency: {
    name: 'Agency',
    priceMonthly: '$29',
    price: 2900,
    widgetLimit: -1,
    removeBranding: true,
    variantId: null as string | null,
    features: [
      'Unlimited widgets',
      'No Devixus branding',
      'All widget types',
      'Unlimited installs',
      'Full analytics',
      'White-label option',
      'Priority support',
    ],
  },
} as const

export type PlanKey = keyof typeof PLANS
