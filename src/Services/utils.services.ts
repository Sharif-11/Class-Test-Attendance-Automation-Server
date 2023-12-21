import { semesterTitles } from '../Shared/utils'

export const createSemesterId = (
  semesterTitle: keyof typeof semesterTitles,
  batch: string,
) => {
  if (semesterTitles[semesterTitle]) {
    return batch + semesterTitle
  } else {
    throw new Error('Invalid semester title or batch')
  }
}
