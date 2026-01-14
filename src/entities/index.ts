/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: communityposts
 * Interface for CommunityPosts
 */
export interface CommunityPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  postContent?: string;
  /** @wixFieldType text */
  authorDisplayName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mediaAttachment?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
  /** @wixFieldType number */
  likeCount?: number;
  /** @wixFieldType number */
  commentCount?: number;
}


/**
 * Collection ID: fitnessactivities
 * Interface for FitnessActivities
 */
export interface FitnessActivities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  activityType?: string;
  /** @wixFieldType number */
  duration?: number;
  /** @wixFieldType number */
  caloriesBurned?: number;
  /** @wixFieldType date */
  activityDate?: Date | string;
  /** @wixFieldType text */
  performanceNotes?: string;
}


/**
 * Collection ID: goals
 * Interface for Goals
 */
export interface Goals {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  goalTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  targetDate?: Date | string;
  /** @wixFieldType number */
  progressPercentage?: number;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: habits
 * Interface for Habits
 */
export interface Habits {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  habitName?: string;
  /** @wixFieldType text */
  frequency?: string;
  /** @wixFieldType number */
  streakCount?: number;
  /** @wixFieldType boolean */
  isCompleted?: boolean;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  habitImage?: string;
}


/**
 * Collection ID: productivitylogs
 * Interface for ProductivityLogs
 */
export interface ProductivityLogs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  taskOrSessionName?: string;
  /** @wixFieldType number */
  durationMinutes?: number;
  /** @wixFieldType datetime */
  logDateTime?: Date | string;
  /** @wixFieldType number */
  productivityScore?: number;
  /** @wixFieldType text */
  categoryTag?: string;
}


/**
 * Collection ID: reminders
 * Interface for Reminders
 */
export interface Reminders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reminderTitle?: string;
  /** @wixFieldType datetime */
  reminderDateTime?: Date | string;
  /** @wixFieldType text */
  recurrenceRule?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType text */
  trackerCategory?: string;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  displayName?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType date */
  joinDate?: Date | string;
  /** @wixFieldType number */
  level?: number;
}


/**
 * Collection ID: usersettings
 * Interface for UserSettings
 */
export interface UserSettings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  themePreference?: string;
  /** @wixFieldType boolean */
  enableNotifications?: boolean;
  /** @wixFieldType boolean */
  notificationSound?: boolean;
  /** @wixFieldType boolean */
  shareActivityData?: boolean;
  /** @wixFieldType text */
  languagePreference?: string;
}


/**
 * Collection ID: wellnesscheckins
 * Interface for WellnessCheckins
 */
export interface WellnessCheckins {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  moodRating?: number;
  /** @wixFieldType text */
  journalEntry?: string;
  /** @wixFieldType text */
  activityType?: string;
  /** @wixFieldType datetime */
  checkinDateTime?: Date | string;
  /** @wixFieldType number */
  stressLevel?: number;
  /** @wixFieldType number */
  energyLevel?: number;
}
