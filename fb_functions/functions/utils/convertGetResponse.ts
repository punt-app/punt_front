import type { DocumentData } from '@firebase/firestore-types'

interface Res {
  id: number
  data: string
}

export function convertGetResponse(res: any) {
  const convertedRes: Res[] = []
  res.forEach((doc: DocumentData) => {
    convertedRes.push({
      id: doc.id,
      data: doc.data()
    })
  })
  return convertedRes
}
