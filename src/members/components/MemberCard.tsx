import { ATCODER_BANDS, CODEFORCES_BANDS } from '../../constants';
import { atcoderUrl, codeforcesUrl, vjudgeUrl } from '../logic';
import type { Member } from '../types';
import { MobileHandle } from './MobileHandle';
import { RatingHandleLink } from './RatingHandleLink';

type MemberCardProps = {
  member: Member;
};

export function MemberCard({ member }: MemberCardProps) {
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
