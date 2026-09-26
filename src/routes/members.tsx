import { queryOptions, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '../components/PageHeading';
import { MembersList } from '../members/components/MembersList';
import { loadMemberRatings, loadMembers } from '../members/logic';
import { pageMeta } from '../seo';

const memberQueryOptions = queryOptions({
  queryKey: ['members'],
  queryFn: loadMembers,
});

export const Route = createFileRoute('/members')({
  loader: ({ context }) =>
    context.queryClient.query({ ...memberQueryOptions, staleTime: 'static' }),
  component: MembersPage,
  head: () =>
    pageMeta({
      title: 'Members',
      description:
        'Past and present members of the SMU Competitive Programming community, with Codeforces and AtCoder ratings.',
      path: '/members/',
    }),
});

function MembersPage() {
  const { data: members = [] } = useQuery(memberQueryOptions);

  const { data: ratedMembers, isLoading: isRatingsLoading } = useQuery({
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
        <MembersList members={membersToShow} isLoading={isRatingsLoading} />
      </section>
    </main>
  );
}
