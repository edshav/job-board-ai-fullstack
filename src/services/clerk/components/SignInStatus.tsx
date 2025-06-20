import { SignedIn as SignedInClerk, SignedOut as SignedOutClerk } from '@clerk/nextjs';
import { ReactNode, Suspense } from 'react';

export function SignedOut({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <SignedOutClerk>{children}</SignedOutClerk>
    </Suspense>
  );
}

export function SignedIn({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <SignedInClerk>{children}</SignedInClerk>
    </Suspense>
  );
}
