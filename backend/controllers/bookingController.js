import Booking from "../models/Booking.js";
import dotenv from "dotenv";
import User from "../models/User.js";
import { getDistance } from 'geolib'

dotenv.config();

export const createBooking = async (req, res) => {
  try {
    const {
  test,
  package: packageId,
  patientName,
  age,
  gender,
  phone,
  flatNo,
  landmark,
  city,
  pincode,
  address,
  bookingDate,
  bookingTime,
    latitude,
  longitude
} = req.body;
    // Empty Validation
    if (
      (!test && !packageId) ||
      !patientName ||
      !age ||
      !gender ||
      !phone ||
      !flatNo ||
      !city ||
      !pincode ||
      !address ||
      !bookingDate ||
      !bookingTime
    ) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }
    // Name Validation
    if (patientName.length < 3) {
      return res.status(400).json({
        message: "Patient Name Must Be At Least 3 Characters",
      });
    }
    // Age Validation
    if (age < 1 || age > 99) {
      return res.status(400).json({
        message: "Age Must Be Between 1 and 99",
      });
    }
    // Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Enter Valid 10 Digit Phone Number",
      });
    }

    // Pincode Validation

    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {
      return res.status(400).json({
        message: "Enter Valid 6 Digit Pincode",
      });
    }
    // Date Validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(bookingDate);
    if (selectedDate < today) {
      return res.status(400).json({
        message: "Booking Date Cannot Be In Past",
      });
    }

    // Gender Validation

    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        message: "Invalid Gender Selected",
      });
    }
   const labOwners =
  await User.find({
    role: 'lab_owner'
  })

if (!labOwners.length) {

  return res.status(404).json({
    message: 'No Lab Available'
  })
}

let nearestLab = null

let nearestDistance =
  Infinity

for (const lab of labOwners) {

  if (
    !lab.latitude ||
    !lab.longitude
  ) {
    continue
  }

  const distance =
    getDistance(

      {
        latitude:
          latitude,
        longitude:
          longitude
      },

      {
        latitude:
          lab.latitude,
        longitude:
          lab.longitude
      }

    )

  if (
    distance <
    nearestDistance
  ) {

    nearestDistance =
      distance

    nearestLab = lab
  }
}
const MAX_DISTANCE = 50000; // 50 km

if (!nearestLab || nearestDistance > MAX_DISTANCE) {
  return res.status(404).json({
    message: "No Lab Available In Your Area"
  });
}

    // Create Booking
 const bookingData = {
  user: req.user._id,

  patientName,
  age,
  gender,
  phone,

  flatNo,
  landmark,
  city,
  pincode,
  address,

  bookingDate,
  bookingTime,

  labOwner: nearestLab._id,

  assignedDistance: nearestDistance,

  patientLatitude: latitude,
  patientLongitude: longitude,

  location: {
    latitude,
    longitude
  },

  reportId:
    "REP-" +
    Math.floor(
      100000 +
      Math.random() * 900000
    )
}

if (test) {
  bookingData.test = test;
}

if (packageId) {
  bookingData.package = packageId;
}

const booking =
  await Booking.create(
    bookingData
  );

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("test", "title price")
.populate("package", "title price")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadReport = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }
    // Save Cloudinary URL
    booking.report = req.file.path;
    booking.status = "Completed";
    booking.assignedLabAssistant = req.user._id;
    await booking.save();
    res.status(200).json({
      message: "Report Uploaded Successfully",
      reportUrl: booking.report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("test")
      .populate("user")
      .populate('package')
      .populate("assignedLabAssistant", "name email")
      .populate("labOwner", "name email labAddress")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getLabOwnerBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      labOwner: req.user._id
    })
      .populate("test")
      .populate("package")
      .populate("user")
      .populate(
        "assignedLabAssistant",
        "name email"
      );

    bookings.sort((a, b) => {

      const aCompleted =
        a.status === "Completed";

      const bCompleted =
        b.status === "Completed";

      if (!aCompleted && bCompleted)
        return -1;

      if (aCompleted && !bCompleted)
        return 1;

      const aDate =
        new Date(a.bookingDate);

      const bDate =
        new Date(b.bookingDate);

      if (
        aDate.getTime() !==
        bDate.getTime()
      ) {
        return aDate - bDate;
      }

      return (
        a.bookingTime || ""
      ).localeCompare(
        b.bookingTime || ""
      );

    });

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const assignAssistant = async (req, res) => {
  try {
    const {
      bookingId,
      assistantId,
    } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }
    // Booking Ownership
    if (booking.labOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    // Assistant Check
    const assistant = await User.findById(assistantId);
    if (!assistant || assistant.role !== "lab_assistant") {
      return res.status(400).json({
        message: "Invalid Assistant",
      });
    }
    // Assistant Belongs To Lab Owner
    if (assistant.labOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Assistant Does Not Belong To Your Lab",
      });
    }
    booking.assignedLabAssistant = assistantId;
    booking.status = "Assigned";
    await booking.save();
    res.status(200).json({
      message: "Assistant Assigned Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAssignedBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      assignedLabAssistant: req.user._id
    })
      .populate("test", "title price")
      .populate("package", "title price")
      .populate("user");

    const today = new Date();
today.setHours(0,0,0,0);

bookings.sort((a, b) => {

  const aDate = new Date(a.bookingDate);
  const bDate = new Date(b.bookingDate);

  const aCompleted = a.status === "Completed";
  const bCompleted = b.status === "Completed";

  if (!aCompleted && bCompleted) return -1;
  if (aCompleted && !bCompleted) return 1;

  const aToday = aDate.getTime() === today.getTime();
  const bToday = bDate.getTime() === today.getTime();

  if (aToday && !bToday) return -1;
  if (!aToday && bToday) return 1;

  if (aDate.getTime() !== bDate.getTime()) {
    return aDate - bDate;
  }

  return a.bookingTime.localeCompare(
    b.bookingTime
  );
});

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const markReached = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

    booking.status = 'Reached'

    booking.reachedAt = new Date()

    await booking.save()

    res.status(200).json({
      message: 'Assistant Reached Patient Home'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}


export const uploadSample = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

    if (
  !req.files ||
  req.files.length === 0
) {
  return res.status(400).json({
    message:
      "Please upload at least one sample image"
  });
}

  booking.sampleImages =
  req.files.map(
    file => file.path
  )

    booking.sampleId =
      'SMP-' +
      Math.floor(
        100000 +
        Math.random() * 900000
      )

    booking.sampleCollectedAt =
      new Date()

    booking.assistantNotes =
      req.body.assistantNotes

    booking.status =
      'Sample Collected'

    await booking.save()

    res.status(200).json({
      message:
        'Sample Uploaded Successfully',

      booking
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}
export const markPaymentDone = async (req, res) => {

  try {

    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        message: "Booking Not Found"
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message: "Please upload payment receipt."
      });

    }

    booking.paymentScreenshot =
      req.file.path;

    booking.paymentStatus =
      "Paid";

    booking.paidAt =
      new Date();

    booking.status =
      "Processing";

    await booking.save();

    res.status(200).json({

      success: true,

      message:
        "Payment completed successfully.",

      booking

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

 export const searchAssignedBookings = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const bookings = await Booking.find({
      assignedLabAssistant: req.user._id
    })
      .populate("test", "title price")
      .populate("package", "title price")
      .populate("user");

    const filteredBookings = bookings.filter((booking) => {

      const searchText = search.toLowerCase();

      return (
        booking.patientName?.toLowerCase().includes(searchText) ||
        booking.phone?.includes(search) ||
        booking.test?.title?.toLowerCase().includes(searchText) ||
        booking.package?.title?.toLowerCase().includes(searchText)
      );
    });

    res.status(200).json(filteredBookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
export const searchLabOwnerBookings =
  async (req, res) => {

    try {

      const { search = "" } =
        req.query;

      const bookings =
        await Booking.find({
          labOwner: req.user._id
        })
          .populate(
            "test",
            "title price"
          )
          .populate(
            "package",
            "title price"
          )
          .populate(
            "user"
          )
          .populate(
            "assignedLabAssistant",
            "name email"
          );

      const searchText =
        search.toLowerCase();

      const filtered =
        bookings.filter(
          (booking) => {

            return (

              booking.patientName
                ?.toLowerCase()
                .includes(searchText)

              ||

              booking.phone
                ?.includes(search)

              ||

              booking.test?.title
                ?.toLowerCase()
                .includes(searchText)

              ||

              booking.package?.title
                ?.toLowerCase()
                .includes(searchText)

              ||

              booking
                .assignedLabAssistant
                ?.name
                ?.toLowerCase()
                .includes(searchText)

            );

          }
        );

      res.status(200).json(
        filtered
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

  export const cancelBooking =
  async (req, res) => {

    try {

      const {
        reason
      } = req.body

      if (!reason) {

        return res.status(400).json({
          message:
            'Cancellation reason is required'
        })
      }

      const booking =
        await Booking.findById(
          req.params.id
        )

      if (!booking) {

        return res.status(404).json({
          message:
            'Booking Not Found'
        })
      }

      // Only patient can cancel own booking

      if (
        booking.user.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          message:
            'Unauthorized'
        })
      }

      // Cannot cancel completed booking

      if (
        booking.status ===
        'Completed'
      ) {

        return res.status(400).json({
          message:
            'Completed booking cannot be cancelled'
        })
      }

      booking.status =
        'Cancelled'

      booking.cancelReason =
        reason

      booking.cancelledBy =
        'patient'

      booking.cancelledAt =
        new Date()

      await booking.save()

      res.status(200).json({
        message:
          'Booking Cancelled Successfully'
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      })

    }
  }
  export const updateBookingRequest =
async (req, res) => {

  try {

    const {
      action,
      reason,
      bookingDate,
      bookingTime
    } = req.body

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message:
          'Booking Not Found'
      })
    }

    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        message:
          'Unauthorized'
      })
    }

    if (
      booking.status ===
      'Completed'
    ) {

      return res.status(400).json({
        message:
          'Completed booking cannot be modified'
      })
    }

    // Cancel

    if (
      action === 'cancel'
    ) {

      if (!reason) {

        return res.status(400).json({
          message:
            'Cancellation reason required'
        })
      }

      booking.status =
        'Cancelled'

      booking.cancelReason =
        reason

      booking.cancelledBy =
        'patient'

      booking.cancelledAt =
        new Date()

      await booking.save()

      return res.status(200).json({
        message:
          'Booking Cancelled Successfully'
      })
    }

    // Reschedule

    if (
      action === 'reschedule'
    ) {

      if (
        !bookingDate ||
        !bookingTime
      ) {

        return res.status(400).json({
          message:
            'New Date and Time Required'
        })
      }

      booking.oldBookingDate =
        booking.bookingDate

      booking.oldBookingTime =
        booking.bookingTime

      booking.bookingDate =
        bookingDate

      booking.bookingTime =
        bookingTime

      booking.rescheduleReason =
        reason || ''

      booking.rescheduledAt =
        new Date()

      booking.status =
        'Rescheduled'

      await booking.save()

      return res.status(200).json({
        message:
          'Booking Rescheduled Successfully'
      })
    }

    res.status(400).json({
      message:
        'Invalid Action'
    })

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}


export const updateBookingLab = async (req, res) => {
  try {
    // Only Admin can update
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin Can Update Lab"
      });
    }

    const { bookingId } = req.params;
    const { labOwnerId } = req.body;

    // Check booking exists
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found"
      });
    }

    // Check Lab Owner exists
    const labOwner = await User.findOne({
      _id: labOwnerId,
      role: "lab_owner"
    });

    if (!labOwner) {
      return res.status(404).json({
        message: "Lab Owner Not Found"
      });
    }

    booking.labOwner = labOwnerId;

    // Optional: remove assigned assistant when lab changes
    booking.assignedLabAssistant = null;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Lab Assigned Successfully",
      booking
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const getAllLabOwners = async (req, res) => {
  try {

    const labOwners =
      await User.find({
        role: "lab_owner"
      }).select(
        "name email labAddress"
      );

    res.status(200).json(
      labOwners
    );

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};