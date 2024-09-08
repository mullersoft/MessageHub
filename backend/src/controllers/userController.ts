import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";
import * as factory from "./handlerFactory";
import { IUser } from "../models/userModel"; // Adjust the import path as necessary

// Extend the Request interface to include `user` and `file` properties
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
    file?: Express.Multer.File;
  }
}
// Function to ensure directory exists
const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // No error, so null is passed
  } else {
    cb(new Error("Not an image! Please upload only images.") as any, false); // Cast the error to 'any' to avoid TypeScript error
  }
};



const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single("photo");

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    // Type guard to ensure req.user is defined
    if (req.user) {
      req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    } else {
      return next(new AppError("User not found", 401)); 
    }

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  }
);


// Utility function to filter allowed fields from an object
const filteredObj = (obj: Record<string, any>, ...allowedFields: string[]) => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// Middleware to set the user's ID in the request parameters
// export const getMe = (req: Request, res: Response, next: NextFunction) => {
//   req.params.id = req.user.id;
//   next();
// };

// Controller to update the current user's details
export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create an error if the user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400
        )
      );
    }
    // 2) Update user document
    const filteredBody = filteredObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = req.file.filename;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  }
);

// Controller to deactivate the current user's account
export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if req.user is defined
    if (!req.user || !req.user.id) {
      return next(new AppError("You are not logged in!", 401));
    }
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Factory function calls for CRUD operations
export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const updateUser = factory.updateOne(User); 
export const deleteUser = factory.deleteOne(User);
