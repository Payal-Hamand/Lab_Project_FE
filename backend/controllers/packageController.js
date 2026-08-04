import Package from '../models/Package.js'

export const createPackage = async (req, res) => {

  try {
    

    const {
      title,
      description,
      price,
      testsIncluded,
      image,
      category
    } = req
    .body

    const newPackage = await Package.create({
      title,
      description,
      price,
      testsIncluded,
      image,
      category
    })
    res.status(201).json(newPackage)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getAllPackages = async (req, res) => {
  try {
    const packages =
  await Package.find()
    .populate(
      'testsIncluded'
    )
    res.status(200).json(packages)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}