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

        // Check Login Information is Correct or Not
        // Return Boolean Value
        loginAuthCheck: async (parent, { email, password }, context, info) => {
            if (await User.findOne({ email: email, password: password }).exec()) {
                return true;
            } else {
                return false;
            }
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
        },
        updateUser: async (parent, args, context, info) => {
            const { id } = args;
            const { name, email, password } = args.user;
            const updates = {};
            if (name !== undefined) {
                updates.name = name;
            }
            if (email !== undefined) {
                updates.email = email;
            }
            if (password !== undefined) {
                updates.password = password;
            }
            const user = await user.findByIdAndUpdate(id, updates, {new: true});
            return user;
        }
    },
};
