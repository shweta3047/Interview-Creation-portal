import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../../models/admin";

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw {
        status: 401,
        message: "Admin must be logged in!!",
      };
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err)
        throw {
          status: 401,
          message: "Admin must be logged in!!",
        };
      const { id } = payload;

      Admin.findById(id).then((adminData) => {
        req.admin = adminData;
        next();
      });
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || "500",
      message: error.message || "Something Went Wrong",
    });
  }
};
