import { z } from "zod";

export const pageInfoFieldSchema = z.object({
  content: z.string(),
  instruction: z.string(),
});
export type PageInfoField = z.infer<typeof pageInfoFieldSchema>;

export const pageInfoSchema = z.object({
  heroImage_mobile: pageInfoFieldSchema,
  heroImage_tablet: pageInfoFieldSchema,
  heroImage_desktop: pageInfoFieldSchema,
  introduction: pageInfoFieldSchema,
  qrCode: pageInfoFieldSchema,
  video: pageInfoFieldSchema,
  registration: pageInfoFieldSchema,
  registration_links: pageInfoFieldSchema,
});
export type PageInfo = z.infer<typeof pageInfoSchema>;

export const scheduleItemSchema = z.object({
  topic: z.string(),
  time: z.string(),
  speakersInfo: z.string(),
  instruction: z.string(),
});
export type ScheduleItem = z.infer<typeof scheduleItemSchema>;

export const speakerSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
});
export type Speaker = z.infer<typeof speakerSchema>;

export const partnerItemSchema = z.object({
  image: z.string(),
  instruction: z.string(),
});
export type PartnerItem = z.infer<typeof partnerItemSchema>;

export const metadataSchema = z.object({
  pageInfo: pageInfoSchema,
  schedule: z.array(scheduleItemSchema),
  speakers: z.array(speakerSchema),
  /** Keys are partner category labels (e.g. "主辦單位", "協辦單位", "合作單位") and vary per event. */
  partners: z.record(z.string(), z.array(partnerItemSchema)),
});
export type Metadata = z.infer<typeof metadataSchema>;

export const relatedPostImageSizesSchema = z.object({
  original: z.string(),
  w2400: z.string(),
  w1600: z.string(),
  w1200: z.string(),
  w800: z.string(),
  w480: z.string(),
});
export type RelatedPostImageSizes = z.infer<typeof relatedPostImageSizesSchema>;

export const relatedPostHeroImageSchema = z.object({
  resizedWebp: relatedPostImageSizesSchema,
  resized: relatedPostImageSizesSchema,
});
export type RelatedPostHeroImage = z.infer<typeof relatedPostHeroImageSchema>;

export const relatedPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  publishedDate: z.string(),
  updatedAt: z.string(),
  state: z.string(),
  heroImage: relatedPostHeroImageSchema,
  url: z.string(),
});
export type RelatedPost = z.infer<typeof relatedPostSchema>;

export const resilientTaiwanDataSchema = z.object({
  metadata: metadataSchema,
  relatedPost: z.array(relatedPostSchema),
});
export type ResilientTaiwanData = z.infer<typeof resilientTaiwanDataSchema>;
