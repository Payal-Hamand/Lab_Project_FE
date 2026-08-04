import PaymentSetting from "../models/paymentSetting.js";


// Create Payment Setting (Only Once)

export const createPaymentSetting = async (
  req,
  res
) => {

  try {

    const exists =
      await PaymentSetting.findOne();

    if (exists) {

      return res.status(400).json({

        success: false,

        message:
          "Payment setting already exists. Please update it."

      });

    }

    const payment =
      await PaymentSetting.create({

        accountName:
          req.body.accountName,

        upiId:
          req.body.upiId,

        qrImage:
          req.file.path

      });

    res.status(201).json({

      success: true,

      message:
        "Payment setting created successfully.",

      data: payment

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};



// Get Payment Setting

export const getPaymentSetting =
async (
  req,
  res
) => {

  try {

    const payment =
      await PaymentSetting.findOne();

    res.status(200).json({

      success: true,

      data: payment

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};




// Update Payment Setting

export const updatePaymentSetting =
async (
  req,
  res
) => {

  try {

    const payment =
      await PaymentSetting.findOne();

    if (!payment) {

      return res.status(404).json({

        success: false,

        message:
          "Payment setting not found."

      });

    }

    payment.accountName =
      req.body.accountName;

    payment.upiId =
      req.body.upiId;

    if (req.file) {

      payment.qrImage =
        req.file.path;

    }

    await payment.save();

    res.status(200).json({

      success: true,

      message:
        "Payment setting updated successfully.",

      data: payment

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};




// Delete

export const deletePaymentSetting =
async (
  req,
  res
) => {

  try {

    const payment =
      await PaymentSetting.findOne();

    if (!payment) {

      return res.status(404).json({

        success: false,

        message:
          "Payment setting not found."

      });

    }

    await PaymentSetting.findByIdAndDelete(
      payment._id
    );

    res.json({

      success: true,

      message:
        "Payment setting deleted."

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};