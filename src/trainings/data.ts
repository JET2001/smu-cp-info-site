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
      'Weekly problems for learning new algorithmic techniques and developing independent problem-solving skills.',
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
      'Mixed-problem contests where members must identify the right approach, combine ideas and coordinate under time pressure.',
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
      'A merit-based internal contest providing a transparent pathway to represent SMU at ICPC.',
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
      'Selected students represent SMU at the International Collegiate Programming Contest (ICPC).',
    images: [
      {
        src: icpcImage,
        alt: 'SMU team at an ICPC regional',
      },
    ],
  },
]