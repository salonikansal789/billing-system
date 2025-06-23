import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../db";
import { common } from "../helper/common";
import { Response } from "express";

class UserService {
  async signup(
    name: string,
    mobileNo: string,
    email: string,
    password: string,
    role: "admin" | "user"
  ) {
    const userRepo = AppDataSource.getRepository(User);
    console.log("User repository:", userRepo);

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      mobileNo,
      email,
      password: hashedPassword,
      role,
    });
    await userRepo.save(user);

    return { message: "User created successfully" };
  }

  async login(email: string, password: string, res: Response) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = common.generateToken(
      { id: user.userID, role: user.role },
      res
    );
    return { token, role: user.role };
  }
}

const userService = new UserService();
export default userService;
