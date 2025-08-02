import {
  boolean,
  date,
  geometry,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

export const detectorType = pgEnum('detector_type', [
  'Human',
  'Audio',
  'Video'
]);
export const detectorStatus = pgEnum('detector_status', [
  'online',
  'offline',
  'inactive'
]);
export const userRole = pgEnum('user_role', [
  'Product Manager',
  'Contributor',
  'Admin'
]);
export const requestStatus = pgEnum('project_request_status', [
  'accepted',
  'refused',
  'pending'
]);

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .defaultNow()
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: userRole().default('Contributor').notNull(),
  phone: text(),
  avatarUrl: text('avatar_url'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires')
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by')
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  )
});

export const contact = pgTable('contact', {
  id: text('id').primaryKey(),
  detectorId: text('detector_id')
    .notNull()
    .references(() => detector.id, { onDelete: 'cascade' }),
  timestamp: timestamp({ mode: 'string' }).notNull(),
  type: text().notNull(),
  geom: geometry({ type: 'point', srid: 4326 }).notNull()
});

export const detector = pgTable('detector', {
  id: text('id').primaryKey(),
  creatorId: text('creator_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  projectId: text('project_id').references(() => project.id, {
    onDelete: 'cascade'
  }),
  name: varchar({ length: 255 }).notNull(),
  serialNumber: text('serial_number').notNull(),
  type: detectorType().notNull(),
  status: detectorStatus().notNull().default('inactive'),
  model: varchar({ length: 255 }),
  brand: varchar({ length: 255 }),
  lastData: timestamp().defaultNow().notNull(),
  password: text('password').notNull()
});

export const project = pgTable('project', {
  id: text('id').primaryKey(),
  managerId: text('manager_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  private: boolean().notNull(),
  specieId: text('specie_id')
    .notNull()
    .references(() => specie.id, { onDelete: 'cascade' }),
  area: geometry({ type: 'polygon', srid: 4326 }),
  locationLabel: text(),
  lastUpdate: timestamp().defaultNow().notNull()
});

export const projectContributor = pgTable('project_contributor', {
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  contributorId: text('contributor_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
});

export const projectDetector = pgTable('project_detector', {
  detectorId: text('detector_id')
    .notNull()
    .references(() => detector.id, { onDelete: 'cascade' }),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' })
});

export const projectInvite = pgTable('project_invite', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  receiverId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: requestStatus().default('pending').notNull(),
  message: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const projectMessage = pgTable('project_message', {
  id: text('id').primaryKey(),
  senderId: text('sender_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  contactId: text('contact_id')
    .notNull()
    .references(() => contact.id, { onDelete: 'cascade' }),
  content: text().notNull(),
  issystemmessage: boolean().default(false).notNull()
});

export const projectRequest = pgTable('project_request', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  requesterId: text('requester_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: requestStatus().default('pending').notNull(),
  message: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const specie = pgTable('specie', {
  id: text('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  latinName: varchar('latin_name', { length: 255 }).notNull(),
  acronym: varchar({ length: 255 }).notNull()
});
