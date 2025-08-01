import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { detector } from '../../server/db/schema';

export type Detector = InferSelectModel<typeof detector>;
export type DetectorInsert = InferInsertModel<typeof detector>;

/**
 * Detector object that is sent to the client.
 */
export type DetectorClient = Omit<Detector, 'password' | 'lastData'> & {
  projectName?: string;
  creatorEmail?: string;
  lastData: string;
};

export type DetectorType = 'Human' | 'Audio' | 'Video';

export type DetectorStatus = 'online' | 'offline' | 'inactive';

export interface CreateDetectorBody {
  name: string;
  serialNumber: string;
  type: DetectorType;
  password: string;
  confirmPassword: string;
}
