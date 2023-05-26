import { User } from './models/User.mjs';

export const resolvers = {
    Query: {
        // Get All Users Information
        // Return JSON format of Users Information
        getAllUsers: async () => {
            const users = await User.find();
            return users;
        },

        // Get User Information by Email
        // Return JSON format of User Information
        getUserByEmail: async (parent, { email }, context, info) => {
            return await User.findOne({ email: email }).exec();
        },

        // Get User Information by Name
        // Return JSON format of User Information
        getUserByName: async (parent, { name }, context, info) => {
            return await User.findOne({ name: name }).exec();
        },

        // Get User Information by ID
        // Return JSON format of User Information
        getUserById: async (parent, { id }, context, info) => {
            return await User.findById(id)
        },
        
        // Check Name is Exist or Not
        // Return Boolean Value
        checkName: async (parent, { name }, context, info) => {
            return await User.exists({ name: name })
        },

        // Check Email is Exist or Not
        // Return Boolean Value
        checkEmail: async (parent, { email }, context, info) => {
            return await User.exists({ email: email })
        },
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const { name, email, password } = args.user;
            console.log(name, email, password);
            const user = new User({ name, email, password });
            await user.save();
            return user;
        },
        deleteUser: async (parent, { id }, context, info) => {
            await User.findByIdAndDelete(id);
            return 'User Deleted';
        }
    },
};
