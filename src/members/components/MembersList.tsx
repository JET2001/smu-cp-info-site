import { cn } from 'cn';
import { ATCODER_BANDS, CODEFORCES_BANDS } from '../../constants';
import { atcoderUrl, codeforcesUrl, vjudgeUrl } from '../logic';
import type { Member } from '../types';
import { MemberCard } from './MemberCard';
import { RatingHandleLink } from './RatingHandleLink';

const tableHeaders = ['Member', 'Codeforces', 'Atcoder', 'Vjudge', 'Note'];

const tableLinkClasses = 'hover:underline hover:underline-offset-[3px]';
const cellClasses =
  'border-b border-border px-4.5 py-4 text-left whitespace-nowrap text-muted';
const headerCellClasses = cn(
  cellClasses,
  'text-label font-semibold uppercase tracking-widest',
);

const skeletonCellWidths = ['w-32', 'w-24', 'w-24', 'w-20', 'w-40'];
const defaultSkeletonRowCount = 8;

type MembersListProps = {
  members: Member[];
  isLoading: boolean;
};

export function MembersList({ members, isLoading }: MembersListProps) {
  const skeletonRowCount = members.length || defaultSkeletonRowCount;

  return (
    <div className="border-t border-border">
      <div className="w-full overflow-x-auto max-mobile:hidden">
        {isLoading ? (
          <TableSkeleton rowCount={skeletonRowCount} />
        ) : (
          <MembersTable members={members} />
        )}
      </div>

      <div className="hidden max-mobile:block">
        {isLoading
          ? Array.from({ length: skeletonRowCount }, (_, index) => (
              <CardSkeleton key={index} />
            ))
          : members.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
      </div>
    </div>
  );
}

type MembersTableProps = {
  members: Member[];
};

function MembersTable({ members }: MembersTableProps) {
  return (
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
                '-'
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
                '-'
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
                '-'
              )}
            </td>
            <td className={cellClasses}>{member.remarks ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-3.5 animate-pulse rounded-full bg-border/60', className)}
    />
  );
}

function TableSkeleton({ rowCount }: { rowCount: number }) {
  return (
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
        {Array.from({ length: rowCount }, (_, row) => (
          <tr key={row}>
            {skeletonCellWidths.map((width, cell) => (
              <td key={cell} className={cellClasses}>
                <Skeleton className={width} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CardSkeleton() {
  return (
    <article className="border-b border-border px-2.5 py-4.5">
      <Skeleton className="w-28" />
      <div className="mt-3 grid gap-1.75">
        <Skeleton className="w-32" />
        <Skeleton className="w-24" />
        <Skeleton className="w-20" />
      </div>
    </article>
  );
}
