export interface ICompetitor  {
    competitor_name: string,
    competitor_location: {
        lat: number,
        lng: number
      } [],
    id: string
  }