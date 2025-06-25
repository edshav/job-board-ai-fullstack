import {
  experienceLevels,
  jobListingTypes,
  locationRequirements,
  wageIntervals,
} from '@/drizzle/schema';
import { z } from 'zod/v4';

export const jobListingSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    experience_level: z.enum(experienceLevels),
    location_requirement: z.enum(locationRequirements),
    type: z.enum(jobListingTypes),
    wage: z.number().int().positive().min(1).nullable(),
    wage_interval: z.enum(wageIntervals).nullable().nullable(),
    state_abbreviation: z
      .string()
      .transform((val) => (val.trim() === '' ? null : val.trim()))
      .nullable(),
    city: z
      .string()
      .transform((val) => (val.trim() === '' ? null : val.trim()))
      .nullable(),
  })
  .refine((listing) => listing.location_requirement === 'remote' || listing.city != null, {
    message: 'Required for non-remote listings',
    path: ['city'],
  })
  .refine(
    (listing) => listing.location_requirement === 'remote' || listing.state_abbreviation != null,
    {
      message: 'Required for non-remote listings',
      path: ['state_abbreviation'],
    }
  );
