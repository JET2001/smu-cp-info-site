import { type TrainingSection } from "./types"

import problemsetsImage from '../assets/problemsets.png'
import teamContestsImage from '../assets/team-contests.png'
import selectionImage from '../assets/selection.png'
import icpcImage from '../assets/icpc.png'

export const sections: TrainingSection[] = [
  {
    eyebrow: '01 · Learn techniques',
    title: 'Problemset Weeks',
    description:
      'Topic-focused sessions where members learn and practise core competitive programming techniques. With the topic known in advance, the emphasis is on understanding the idea deeply and learning how to apply it across different problems.',
    images: [
      {
        src: problemsetsImage,
        alt: 'SMU CP members working through a problemset',
      },
    ],
  },
  {
    eyebrow: '02 · Practise competition',
    title: 'Team Contests',
    description:
      'Members regularly compete together under contest conditions. Beyond solving problems, team contests develop problem selection, communication, debugging, time management, and the ability to combine different ideas under pressure.',
    images: [
      {
        src: teamContestsImage,
        alt: 'SMU CP members competing in teams',
      },
    ],
  },
  {
    eyebrow: '03 · Earn selection',
    title: 'Selection Contests',
    description:
      'Selection contests identify members who will represent SMU at major competitions. Participants compete individually on a carefully prepared problemset under formal contest conditions.',
    images: [
      {
        src: selectionImage,
        alt: 'SMU CP selection contest',
      },
    ],
  },
  {
    eyebrow: '04 · Represent SMU',
    title: 'ICPC',
    description:
      'Selected teams represent SMU at the International Collegiate Programming Contest. ICPC brings together the technical preparation, teamwork, and contest experience developed throughout the training programme.',
    images: [
      {
        src: icpcImage,
        alt: 'SMU team at an ICPC regional',
      },
    ],
  },
]