export interface Service {
  id: string;
  nameKey: string;
  descriptionKey: string;
  basePrice: number;
}

export const services: Service[] = [
  {
    id: 'marketing',
    nameKey: 'services.marketing',
    descriptionKey: 'services.marketing_desc',
    basePrice: 8500
  },
  {
    id: 'web',
    nameKey: 'services.web',
    descriptionKey: 'services.web_desc',
    basePrice: 12000
  },
  {
    id: 'photography',
    nameKey: 'services.photography',
    descriptionKey: 'services.photography_desc',
    basePrice: 5500
  },
  {
    id: 'video',
    nameKey: 'services.video',
    descriptionKey: 'services.video_desc',
    basePrice: 7500
  },
  {
    id: 'content',
    nameKey: 'services.content',
    descriptionKey: 'services.content_desc',
    basePrice: 4500
  },
  {
    id: 'social',
    nameKey: 'services.social',
    descriptionKey: 'services.social_desc',
    basePrice: 6000
  }
];

export const calculateTotal = (selectedIds: string[]) => {
  const subtotal = services
    .filter(s => selectedIds.includes(s.id))
    .reduce((acc, s) => acc + s.basePrice, 0);
  
  // Descuento por volumen: 10% si eligen más de 3 servicios
  const discount = selectedIds.length >= 3 ? subtotal * 0.10 : 0;
  
  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
};
