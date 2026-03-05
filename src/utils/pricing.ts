export interface Service {
  id: string;
  nameKey: string; // Usaremos llaves de traducción
  basePrice: number;
  descriptionKey: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: 'landing',
    nameKey: 'services.landing_name',
    basePrice: 4500,
    descriptionKey: 'services.landing_desc',
  },
  {
    id: 'web_complete',
    nameKey: 'services.web_complete_name',
    basePrice: 12000,
    descriptionKey: 'services.web_complete_desc',
  },
  {
    id: 'custom_system',
    nameKey: 'services.custom_system_name',
    basePrice: 25000,
    descriptionKey: 'services.custom_system_desc',
  },
  {
    id: 'marketing',
    nameKey: 'services.marketing',
    basePrice: 5000,
    descriptionKey: 'services.marketing_desc',
  },
  {
    id: 'photography',
    nameKey: 'services.photography',
    basePrice: 3500,
    descriptionKey: 'services.photography_desc',
  },
  {
    id: 'video',
    nameKey: 'services.video',
    basePrice: 4500,
    descriptionKey: 'services.video_desc',
  },
  {
    id: 'content',
    nameKey: 'services.content',
    basePrice: 4000,
    descriptionKey: 'services.content_desc',
  },
  {
    id: 'social',
    nameKey: 'services.social',
    basePrice: 6000,
    descriptionKey: 'services.social_desc',
  },
];

export const calculateTotal = (selectedServiceIds: string[]): { subtotal: number; discount: number; total: number } => {
  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));
  const subtotal = selectedServices.reduce((acc, s) => acc + s.basePrice, 0);
  
  let discountPercentage = 0;
  if (selectedServiceIds.length >= 5) {
    discountPercentage = 0.20;
  } else if (selectedServiceIds.length >= 3) {
    discountPercentage = 0.10;
  }

  const discount = subtotal * discountPercentage;
  const total = subtotal - discount;

  return { subtotal, discount, total };
};
