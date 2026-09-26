import { cn } from 'cn';
import { MotionConfig, motion } from 'motion/react';
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

// Early rows cascade in, later rows catch up together so the tail never lags
const enterDelay = (index: number) => Math.min(index * 0.04, 0.4);

type MembersListProps = {
  members: Member[];
  isLoading: boolean;
};

export function MembersList({ members, isLoading }: MembersListProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-border">
        <div className="w-full overflow-x-auto max-mobile:hidden">
          <MembersTable members={members} isLoading={isLoading} />
        </div>

        <div className="hidden max-mobile:block">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
                delay: enterDelay(index),
              }}
            >
              <MemberCard member={member} isLoading={isLoading} />
            </motion.div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

type MembersTableProps = {
  members: Member[];
  isLoading: boolean;
};

function MembersTable({ members, isLoading }: MembersTableProps) {
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
          // Fade only: a y-drift extends the overflow-x-auto wrapper's
          // scrollable overflow and flashes a scrollbar while rows settle
          <motion.tr
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
              delay: enterDelay(index),
            }}
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
                  isLoading={isLoading}
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
                  isLoading={isLoading}
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
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
