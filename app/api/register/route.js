import { connectToDB } from "@mongodb/database";
import { User } from "@models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";

// user register
export async function POST(req) {
  try {
    // connect to database
    await connectToDB();
    const data = req.formData();
    // extract data from form

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const file = data.get("profileImage");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded", status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const profileImagePath = `/public/uploads/${file.name}`;
    await writeFile(profileImagePath, buffer);
    console.log(`open ${profileImagePath} to see the uploaded image`);

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists", status: 409 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImagePath: `uploads/${file.name}`,
    });

    // save new user
    await newUser.save();
    return NextResponse.json(
      {
        message: "User registered successfully!",
        user: newUser,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Failed to create new User",
      status: 500,
    });
  }
}
