import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var deploymentSchema = new Schema({
    name: { required: true, type: String },
    deployedAt: String,
    url: String,
    versions: { required: true, type: Array, uniqueItems: true, },
},{
    timestamps: true
  }); 

export default mongoose.model('deployments', deploymentSchema); 