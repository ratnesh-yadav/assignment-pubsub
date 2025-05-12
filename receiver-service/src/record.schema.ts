import { Schema, Document } from 'mongoose';

export interface Record extends Document {
  id: string;
  user: string;
  class: string;
  age: number;
  email: string;
  inserted_at: string;
  modified_at?: string;
}

export const RecordSchema = new Schema<Record>(
  {
    id: { type: String, required: true },
    user: { type: String, required: true },
    class: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    inserted_at: { type: String, required: true },
    modified_at: { type: String }, // Optional
  },
  {
    collection: 'records', // Explicit collection name (optional but clearer)
  }
);

