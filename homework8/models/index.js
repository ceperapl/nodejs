import mongoose from 'mongoose';

import defineCityModel from './city';
import defineProductModel from './product';
import defineUserModel from './user';
import defineReviewModel from './review';

const { Schema } = mongoose;

const definitions = [
  defineCityModel,
  defineProductModel,
  defineUserModel,
  defineReviewModel,
];

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

definitions.forEach(definition => definition(mongoose, Schema));

export default mongoose.models;
