export interface CardData {
  [x: string]: number;
  name: string;
  image_uris?: {
    normal: string;
    large: string;
  };
  card_faces?: Array<{
    image_uris: {
      normal: string;
      large: string;
    };
  }>;
}