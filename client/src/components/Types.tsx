//custom types for using the db schemas  and stat structures in typescript
export type Lift = {
    extype: number
    weight: number
    sets: number
    reps: number
    date: Date
    _id: string
  };

export type Photo = {
    photofile: string
    date: Date
    _id: string
};

export type StatData = {
  x: number
  y: number
}