import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, min: 4, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Post = model('Post', PostSchema);

export default Post;
