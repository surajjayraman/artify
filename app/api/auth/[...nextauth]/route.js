import User from "@models/User";
import { connectToDatabase } from "@mongodb/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          await connectToDatabase();
          const { email, password } = credentials;
          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("Invalid email or password");
          }
          // check if password is correct
          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid email or password");
          }
          return { email: user.email };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        //connect to database
        try {
          await connectToDatabase();
          let user = await User.findOne({ email: profile.email });
          if (!user) {
            user = await User.create({
              email: profile.email,
              username: profile.name,
              profileImagePath: profile.picture,
              wishlist: [],
              cart: [],
              order: [],
              work: [],
            });
          }
          return user;
        } catch (error) {
          console.log(`Error checking if user exists: ${error.message}`);
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
