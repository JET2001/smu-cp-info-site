import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PageHeading } from '../components/PageHeading';
import { MembersMobile } from '../members/components/MembersMobile';
import { MembersTable } from '../members/components/MembersTable';
import {
  loadAtcoderRatings,
  loadCodeforcesRatings,
  loadMembers,
} from '../members/logic';

export const Route = createFileRoute('/members')({
  loader: () => loadMembers(),
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
  const loadedMembers = Route.useLoaderData();
  const [members, setMembers] = useState(loadedMembers);

  useEffect(() => {
    let active = true;

    void Promise.allSettled([
      loadCodeforcesRatings(loadedMembers),
      loadAtcoderRatings(loadedMembers),
    ]).then(() => {
      if (active) setMembers([...loadedMembers]);
    });

    return () => {
      active = false;
    };
  }, [loadedMembers]);

  return (
    <main className="page-container">
      <PageHeading
        title="Members"
        description="Past and present members of the SMU Competitive Programming community"
      />

      <section className="pb-24">
        <MembersTable members={members} />
        <MembersMobile members={members} />
      </section>
    </main>
  );
}
