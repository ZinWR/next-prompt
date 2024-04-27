import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const clientObj: {clientId: any; clientSecret: any} = {
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

const handler = NextAuth({
    providers: [
        GoogleProvider(clientObj)
    ],
    callbacks: {
        async session({ session }: { session: any }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }: { profile: any }) {
            try {
                // severless --> Lambda
                await connectToDB();
    
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST};