import { Schema, Document } from 'mongoose';

export interface Listener extends Document {
  id: string;
  user: string;
  class: string;
  age: number;
  email: string;
  inserted_at: string;
  modified_at?: string;
}

export const ListenerSchema = new Schema<Listener>({
  id: { type: String, required: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: String, required: true },
  modified_at: { type: String }, // optional, only used by listener
},
{
  collection: 'listeners', // Explicit collection name (optional but clearer)
  });
