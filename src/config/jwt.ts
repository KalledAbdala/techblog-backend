export const jwtConfig = {
secret: process.env.JWT_SECRET || "techblog-secret",
expiresIn: "7d",
};