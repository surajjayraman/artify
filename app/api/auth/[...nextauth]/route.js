import User from "@models/User";
import { connectToDatabase } from "@mongodb/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  ],
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
    },
  },
});

export { handler as GET, handler as POST };
