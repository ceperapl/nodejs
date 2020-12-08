import Models from '../models';

const { City } = Models;

export async function getAllCities() {
  return City.find({}, ['name', 'country', 'capital', 'location']).exec();
}

export async function getCityById(id) {
  return City.findOne({ _id: id }, ['name', 'country', 'capital', 'location']).exec();
}

export async function getRandomCity() {
  return City.aggregate().sample(1).exec();
}

export async function createCity(cityBody) {
  const {
    name, country, capital, location,
  } = cityBody;
  return City.create({
    name, country, capital, location,
  });
}

export async function updateCityById(id, cityBody) {
  const {
    name, country, capital, location,
  } = cityBody;
  return City.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name, country, capital, location,
      },
    },
    { new: true, fields: ['name', 'country', 'capital', 'location'] },
  ).exec();
}

export async function deleteCityById(id) {
  return City.findOneAndRemove({ _id: id }).exec();
}
