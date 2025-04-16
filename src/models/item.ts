import mongoose from 'mongoose';

const coordSchema = new mongoose.Schema({
  lat: { type: Number},
  lng: { type: Number}
})

const itemSchema = new mongoose.Schema({
  ownerUid: { type: String, required: true },      // Firebase UID
  title: { type: String, required: true },
  condition: { type: String, required: true },     // e.g., "New", "Used - Like New", etc.
  description: { type: String },
  imageUrl: { type: String },
  position: { type: coordSchema }
}, {
  timestamps: true
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;
