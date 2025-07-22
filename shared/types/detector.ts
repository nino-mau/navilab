export type DetectorType = 'Human' | 'Audio' | 'Video';

export type DetectorStatus = 'online' | 'offline' | 'inactive';

export interface CreateDetectorBody {
  name: string;
  serialNumber: string;
  type: DetectorType;
  password: string;
  confirmPassword: string;
}
