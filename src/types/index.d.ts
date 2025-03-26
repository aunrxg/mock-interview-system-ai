
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface DecodedToken {
  _id: string;
  email: string;
  username: string;
}