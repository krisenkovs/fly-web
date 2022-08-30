export type StationType = {
  id: number;
  name?: string;
  address?: string;
  description?: string;
  maxPower?: string;
  isFastCharge?: boolean;
  rate?: number;
  coonectorType?: Record<string, boolean>;
  linkQr?: string;
  images?: {
    id?: number;
    imageId?: string;
  }[];
  availability?: boolean;
};