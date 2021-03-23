const getMunicipalityName = (municipalities, id) => {
  return municipalities.find(municipality => municipality._id === id).name
}

export default getMunicipalityName