import type { Member } from '../types';
import { MemberCard } from './MemberCard';

type MembersMobileProps = {
  members: Member[];
};

export function MembersMobile({ members }: MembersMobileProps) {
  return (
    <div className="hidden border-t border-border max-mobile:block">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  );
}
