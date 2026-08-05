import User from "../models/User.js";

import bcrypt from "bcryptjs";

export const createLabAssistant = async (req, res) => {
  try {
    if (req.user.role !== "lab_owner") {
      return res.status(403).json({
        message: "Only Lab Owners Can Create Assistants",
      });
    }
    const {
      name,
      email,
      password,
      phone,
      documents,
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must Be At Least 6 Characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid Email Format",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );

    const user = await User.create({
      name,
      email,
      phone,
      documents,
      password: hashedPassword,
      role: "lab_assistant",
      labOwner: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Lab Assistant Created Successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createLabOwner = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin Can Create Lab Owners",
      });
    }
    const {
      name,
      email,
      phone,
      password,
      servicePincodes,
      labAddress,
      latitude,
      longitude
    } = req.body

    if (!name || !email || !password || !phone || !labAddress ||
      !latitude ||
      !longitude) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must Be At Least 6 Characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid Email Format",
      });
    }

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const phoneExists = await User.findOne({
      phone,
    });
    if (phoneExists) {
      return res.status(400).json({
        message: "Phone Number Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'lab_owner',
      labAddress,
      latitude,
      longitude,
    })

    res.status(201).json({
      message: "Lab Owner Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLabOwners =
  async (req, res) => {

    try {

      const labOwners =
        await User.find({

          role: 'lab_owner'
        })

      res.status(200).json(
        labOwners
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      })
    }
  }
