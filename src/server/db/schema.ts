import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar,
  } from "drizzle-orm/pg-core";


  export const User = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    passwordHash: text('password_hash'), 
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    role: varchar('role', { length: 50 }).notNull(), // 'peer', 'specialist', 'caregiver', 'patient'
    profilePicUrl: text('profile_pic_url'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    isActive: boolean('is_active').default(true),
  });

  export const UserProfile = pgTable('user_profiles', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    bio: text('bio'),
    expertise: text('expertise'),
    anonymityPreference: varchar('anonymity_preference', { length: 50 }), // e.g., 'Anonymous', 'Public'
    badges: text('badges'), // Store user badges as a list (e.g., 'active', 'helpful')
    location: text('location'),
  });

  export const ForumPost = pgTable('forum_posts', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    anonymous: boolean('anonymous').default(false),
  });

  export const MentalHealthTracker = pgTable('mental_health_tracker', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    moodRating: integer('mood_rating').notNull(),
    stressLevel: integer('stress_level').notNull(),
    sleepQuality: integer('sleep_quality').notNull(),
    comments: text('comments'),
    createdAt: timestamp('created_at').defaultNow(),
}, {
    constraints: {
        check: [
            'mood_rating BETWEEN 1 AND 10',
            'stress_level BETWEEN 1 AND 10',
            'sleep_quality BETWEEN 1 AND 10'
        ]
    }
});

  export const Event = pgTable('events', {
    id: uuid('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    date: timestamp('date').notNull(),
    time: varchar('time', { length: 50 }), // Time of the event
    location: text('location'), // In-person or online
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });

//   export const Appointment = pgTable('appointments', {
//     id: uuid('id').primaryKey(),
//     userId: uuid('user_id').references(() => User.id, { onDelete: 'CASCADE' }),
//     specialistId: uuid('specialist_id').references(() => User.id, { onDelete: 'CASCADE' }), // Specialist
//     appointmentTime: timestamp('appointment_time').notNull(),
//     appointmentType: pgEnum('appointment_type', ['Online', 'In-person']),
//     status: pgEnum('status', ['Scheduled', 'Completed', 'Cancelled']),
//     createdAt: timestamp('created_at').defaultNow(),
//     updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
//   });


export const VideoCallStatus = pgEnum('video_call_status', ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);

// export const VideoCall = pgTable('video_calls', {
//   id: uuid('id').primaryKey(),
//   userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }), // The user who booked the call
//   specialistId: uuid('specialist_id').references(() => Specialist.id, { onDelete: 'cascade' }), // The specialist conducting the call
//   startTime: timestamp('start_time').notNull(), // The scheduled start time
//   endTime: timestamp('end_time').notNull(), // The end time, if the meeting has ended
//   status: VideoCallStatus('status').default('SCHEDULED'), // Status of the video call
//   roomId: varchar('room_id').notNull(), // The unique ID for the video call room
//   meetingLink: varchar('meeting_link').notNull(), // The link to join the video call (optional, if using external service)
//   notes: varchar('notes', { length: 500 }).notNull(), // Optional notes for the session
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

export const AIConversation = pgTable('ai_conversations', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    query: text('query').notNull(),
    aiResponse: text('ai_response').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });

  export const Analytics = pgTable('analytics', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    action: varchar('action', { length: 100 }).notNull(), // Action taken (e.g., 'post_created', 'mood_logged')
    data: text('data'), // Any additional data associated with the action
    createdAt: timestamp('created_at').defaultNow(),
  });

  export const Message = pgTable('messages', {
    id: uuid('id').primaryKey(),
    senderId: uuid('sender_id').references(() => User.id, { onDelete: 'cascade' }),
    receiverId: uuid('receiver_id').references(() => User.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
  });

  export const HealthTest = pgTable('health_tests', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    question1: integer('question_1').notNull(),
    question2: integer('question_2').notNull(),
    // Add more questions as needed
    testDate: timestamp('test_date').defaultNow(),
  } {
    constraints: {
        check: [
            'mood_rating BETWEEN 1 AND 10',
            'stress_level BETWEEN 1 AND 10',
            'sleep_quality BETWEEN 1 AND 10'
        ]
    }
});

  export const Group = pgTable('groups', {
    id: uuid('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });
  
  // Group Members Schema
  export const GroupMember = pgTable('group_members', {
    id: uuid('id').primaryKey(),
    groupId: uuid('group_id').references(() => Group.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 50 }), // 'Member', 'Admin'
    joinedAt: timestamp('joined_at').defaultNow(),
  });

  export const Notification = pgTable('notifications', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    message: text('message').notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
  });

  export const Post = pgTable('posts', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });

  export const Like = pgTable('likes', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    postId: uuid('post_id').references(() => Post.id, { onDelete: 'cascade' }).notNull(),
    commentId: uuid('comment_id').references(() => Comment.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });

  export const Comment = pgTable('comments', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    postId: uuid('post_id').references(() => Post.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });

  export const Reply = pgTable('replies', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    commentId: uuid('comment_id').references(() => Comment.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });

    //  export const AppointmentStatus = pgEnum('appointment_status', ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED']);

    // export const Appointment = pgTable('appointments', {
    // id: uuid('id').primaryKey(),
    // userId: uuid('user_id').references(() => User.id, { onDelete: 'cascade' }),
    // specialistId: uuid('specialist_id').references(() => Specialist.id, { onDelete: 'cascade' }),
    // dateTime: timestamp('date_time').notNull(),
    // status: AppointmentStatus('status').default('PENDING'),
    // notes: varchar('notes', { length: 500 }).notNull(),
    // createdAt: timestamp('created_at').defaultNow(),
    // updatedAt: timestamp('updated_at').defaultNow(),
    // });
  

  
  export const sessions = pgTable("sessions", {
    sessionToken: varchar("session_token").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  });
  
  export const verificationTokens = pgTable(
    "verification_tokens",
    {
      identifier: varchar("identifier").notNull(),
      token: varchar("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  );
  
  