export interface Document {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const initialDocuments: Document[] = [
  {
    id: +(Math.random() * 10000000).toFixed(0),
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const documentReducer = (documents: Document[], action) => {
  switch (action.type) {
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
