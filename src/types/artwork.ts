export type Artwork = {
    id: number
    title: string
    description: string
    category?: string
    heightCm?: number
    widthCm?: number
    isFeatured: boolean
    price: number
    media: {
      id: number;
      url: string;
      type: 'IMAGE' | 'VIDEO';
    }[];
  }