ALTER TABLE "organizations" DROP CONSTRAINT "organizations_email_unique";--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "email";