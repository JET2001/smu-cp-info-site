import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '../components/PageHeading';
import { MembersMobile } from '../members/components/MembersMobile';
import { MembersTable } from '../members/components/MembersTable';
import { loadMemberRatings, loadMembers } from '../members/logic';

export const Route = createFileRoute('/members')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ['members'],
      queryFn: loadMembers,
    }),
  component: MembersPage,
  head: () => ({
    meta: [
      {
        title: 'Members | SMU CP',
      },
    ],
  }),
});

function MembersPage() {
  const { data: members = [] } = useQuery({
    queryKey: ['members'],
    queryFn: loadMembers,
  });

  const { data: ratedMembers } = useQuery({
    queryKey: ['member-ratings'],
    queryFn: () => loadMemberRatings(members),
    enabled: members.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const membersToShow = ratedMembers ?? members;

  return (
    <main className="page-container">
      <PageHeading
        title="Members"
        description="Past and present members of the SMU Competitive Programming community"
      />

      <section className="pb-24">
        <MembersTable members={membersToShow} />
        <MembersMobile members={membersToShow} />
      </section>
    </main>
  );
}
