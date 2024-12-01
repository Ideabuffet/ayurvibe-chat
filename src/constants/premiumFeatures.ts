export const premiumFeatures = [
  'herbs',
  'diet',
  'chronic',
  'detox',
  'stress',
  'beauty',
  'sleep'
] as const;

export type PremiumFeature = typeof premiumFeatures[number];