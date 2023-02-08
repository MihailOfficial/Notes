//stores the contents of a note
export interface BaseNote {
  title: string;
  description: string;
}
//Note has a unique ID
export interface Note extends BaseNote {
  id: number;
}