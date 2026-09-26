import { useLoaderData } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { PageHeading } from "../components/PageHeading";
import { ATCODER_BANDS, CODEFORCES_BANDS, type RatingBand } from "../constants";
import {
  atcoderUrl,
  codeforcesUrl,
  loadAtcoderRatings,
  loadCodeforcesRatings,
  ratingClass,
  vjudgeUrl,
} from "../members/logic";
import type { Member } from "../members/types";

const tableHeaders = ["Member", "Codeforces", "Atcoder", "Vjudge", "Note"];

const tableLinkClasses = "hover:underline hover:underline-offset-[3px]";
const cellClasses =
  "border-b border-border px-4.5 py-4 text-left whitespace-nowrap text-muted";
const headerCellClasses = `${cellClasses} text-label font-semibold uppercase tracking-widest`;

export function MembersPage() {
  const loadedMembers = useLoaderData({ from: "/members" });
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

type RatingHandleLinkProps = {
  href: string;
  rating: number | undefined;
  bands: readonly RatingBand[];
  className?: string;
  children: ReactNode;
};

function RatingHandleLink({
  href,
  rating,
  bands,
  className = "",
  children,
}: RatingHandleLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-semibold ${ratingClass(rating, bands)} ${className}`}
    >
      {children}
    </a>
  );
}

function MembersTable({ members }: { members: Member[] }) {
  return (
    <div className="w-full overflow-x-auto border-t border-border max-mobile:hidden">
      <table className="w-full min-w-180 border-collapse text-sm leading-[normal]">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className={headerCellClasses}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={index}
              className="transition-colors duration-120 hover:bg-[rgba(0,0,0,0.018)]"
            >
              <td className={cellClasses}>{member.name}</td>
              <td className={cellClasses}>
                {member.codeforces ? (
                  <RatingHandleLink
                    href={codeforcesUrl(member.codeforces)}
                    rating={member.codeforcesRating}
                    bands={CODEFORCES_BANDS}
                    className={tableLinkClasses}
                  >
                    {member.codeforces}
                  </RatingHandleLink>
                ) : (
                  "-"
                )}
              </td>
              <td className={cellClasses}>
                {member.atcoder ? (
                  <RatingHandleLink
                    href={atcoderUrl(member.atcoder)}
                    rating={member.atcoderRating}
                    bands={ATCODER_BANDS}
                    className={tableLinkClasses}
                  >
                    {member.atcoder}
                  </RatingHandleLink>
                ) : (
                  "-"
                )}
              </td>
              <td className={cellClasses}>
                {member.vjudge ? (
                  <a
                    href={vjudgeUrl(member.vjudge)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tableLinkClasses}
                  >
                    {member.vjudge}
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className={cellClasses}>{member.remarks ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MembersMobile({ members }: { members: Member[] }) {
  return (
    <div className="hidden border-t border-border max-mobile:block">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="border-b border-border px-2.5 py-4.5">
      <h2 className="mb-3 text-sm font-normal leading-[1.5] text-muted">
        {member.name}
      </h2>

      <div className="grid gap-1.75">
        {member.codeforces && (
          <MobileHandle label="CF">
            <RatingHandleLink
              href={codeforcesUrl(member.codeforces)}
              rating={member.codeforcesRating}
              bands={CODEFORCES_BANDS}
            >
              {member.codeforces}
            </RatingHandleLink>
          </MobileHandle>
        )}
        {member.atcoder && (
          <MobileHandle label="AC">
            <RatingHandleLink
              href={atcoderUrl(member.atcoder)}
              rating={member.atcoderRating}
              bands={ATCODER_BANDS}
            >
              {member.atcoder}
            </RatingHandleLink>
          </MobileHandle>
        )}
        {member.vjudge && (
          <MobileHandle label="VJ">
            <a
              href={vjudgeUrl(member.vjudge)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {member.vjudge}
            </a>
          </MobileHandle>
        )}
      </div>

      {member.remarks && (
        <p className="mt-3.5 text-[13px] leading-[1.5] text-muted">
          {member.remarks}
        </p>
      )}
    </article>
  );
}

function MobileHandle({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[36px_1fr] gap-2.5 text-sm leading-[normal]">
      <span className="text-[10px] font-semibold tracking-widest text-muted">
        {label}
      </span>
      {children}
    </div>
  );
}
