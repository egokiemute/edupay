import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import PaymentModel, { IPaymentDocument } from './PaymentModel'; // Import the Payment model

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  picture: string;
  password: string;
  studentId: string;
  role: string; // "admin" | "user"
  refreshToken: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    studentId: { type: String },
    refreshToken: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to add a new payment for this user
userSchema.methods.addPayment = async function(paymentData: Omit<IPaymentDocument, 'studentId' | 'studentName'>) {
  const newPayment = new PaymentModel({
    ...paymentData,
    studentId: this.studentId,
    studentName: `${this.firstname} ${this.lastname}`
  });
  return await newPayment.save();
};

// Method to get all payments for this user
userSchema.methods.getPayments = async function() {
  return await PaymentModel.find({ studentId: this.studentId }).sort({ paymentDate: -1 });
};

// Method to get payments by status
userSchema.methods.getPaymentsByStatus = async function(status: 'completed' | 'pending' | 'failed') {
  return await PaymentModel.find({ 
    studentId: this.studentId,
    status: status
  }).sort({ paymentDate: -1 });
};

// Method to get total amount paid
// userSchema.methods.getTotalPaid = async function() {
//   return await PaymentModel.getTotalPaidByStudent(this.studentId);
// };

// Static method to find user by studentId with their payments
userSchema.statics.findByStudentIdWithPayments = async function(studentId: string) {
  const user = await this.findOne({ studentId });
  if (!user) return null;
  
  const payments = await PaymentModel.find({ studentId }).sort({ paymentDate: -1 });
  return { user, payments };
};

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;