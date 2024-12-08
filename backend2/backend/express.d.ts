import { User } from "../models/userModel"; // User modelini import et

declare global {
  namespace Express {
    interface Request {
      user?: User; // user özelliğini ekle
    }
  }
}
