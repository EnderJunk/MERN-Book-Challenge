import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

interface addUserInput {
  username: string;
  email: string;
  password: string;
}

interface loginInput {
  email: string;
  password: string;
}

interface saveBookInput {
  bookData: { bookId: string; authors: string[]; description: string; title: string; image: string; link: string; };
}

interface removeBookInput {
  bookId: string;
}

const resolvers = {
  Query: {
    me: async (_:any, __:any, context: any) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new Error('Not logged in');
    },
  },

  
  Mutation: {
    addUser: async (_:any, { username, email, password }:addUserInput) => {
      console.log("beginning of addUser");
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(username, email, user.id);
        return { token, user };
      }
      catch (err) {
        console.log(err);
        return
      }
    },
    
    login: async (_:any, { email, password }:loginInput) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user.username, user.email, (user._id as string).toString());
      return { token, user };
    },
    
    saveBook: async (_:any, { bookData }:saveBookInput, context:any) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
      }
      throw new Error('You need to be logged in!');
    },
    
    removeBook: async (_:any, { bookId }:removeBookInput, context:any) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new Error('You need to be logged in!');
    },
  },
};

export default resolvers;