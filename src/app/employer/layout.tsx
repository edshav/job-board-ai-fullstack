import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarNavMenuGroup } from '@/components/sidebar/SidebarNavMenuGroup';
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel } from '@/components/ui/sidebar';
import { SidebarOrganizationButton } from '@/features/organizations/components/SidebarOrganizationButton';
import { getCurrentOrganization } from '@/services/clerk/lib/getCurrentAuth';
import { BrainCircuitIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <LayoutSuspense>{children}</LayoutSuspense>
    </Suspense>
  );
}

async function LayoutSuspense({ children }: { children: React.ReactNode }) {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) return redirect('/organizations/select');

  return (
    <AppSidebar
      content={
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
            <SidebarGroupAction title="Add Job Listing" asChild>
              <Link href="/employer/job-listings/new">
                <PlusIcon />
                <span className="sr-only">Add Job Listing</span>
              </Link>
            </SidebarGroupAction>
          </SidebarGroup>

          <SidebarNavMenuGroup
            className="mt-auto"
            items={[
              {
                href: '/',
                icon: <BrainCircuitIcon />,
                label: 'Job Board',
              },
            ]}
          />
        </>
      }
      footerButton={<SidebarOrganizationButton />}
    >
      {children}
    </AppSidebar>
  );
}
