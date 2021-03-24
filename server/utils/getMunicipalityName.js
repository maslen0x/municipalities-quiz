const getMunicipalityName = (municipalities, id) => {
  return municipalities.find(municipality => municipality._id.toString() === id.toString()).name
}

export default getMunicipalityName