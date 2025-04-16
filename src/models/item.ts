import mongoose from 'mongoose';

const coordSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
});

const itemSchema = new mongoose.Schema({
  ownerUid: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  position: { type: coordSchema }
}, {
  timestamps: true
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;