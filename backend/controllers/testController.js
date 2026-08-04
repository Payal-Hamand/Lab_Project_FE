import Test from '../models/Test.js'

export const createTest = async (req, res) => {

  try {

    const {
      title,
      category,
      price,
      reportTime,
      description,
      image
    } = req.body

    const test = await Test.create({
      title,
      category,
      price,
      reportTime,
      description,
      image
    })

    res.status(201).json(test)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const getAllTests = async (req, res) => {

  try {

    const tests = await Test.find()

    res.status(200).json(tests)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const getSingleTest = async (req, res) => {

  try {

    const test = await Test.findById(req.params.id)

    if (!test) {
      return res.status(404).json({
        message: 'Test Not Found'
      })
    }

    res.status(200).json(test)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}