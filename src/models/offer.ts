import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  offerer_id: { type: String, required: true },
  offerer_name: { type: String, required: true },
  owner_id: { type: Number, required: true },
  item_id: { type: String, required: true },
  title: { type: String , required: true},
  price: { type: Number },
  status: { type: String}
}, {
  timestamps: true
});

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
export default Offer;