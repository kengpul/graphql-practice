import { MovieList, UserList } from "../FakeData"
import _ from "lodash"

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },
        user: (parent: unknown, args: { id: string }) => {
            const id = args.id;
            const user = _.find(UserList, { id });
            return user;
        },

        movies: () => {
            return MovieList
        },
        movie: (parent: unknown, args: { name: string }) => {
            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, { isInTheaters: true });
        }
    },
    Mutation: {
        createUser: (parent: unknown, args: { input }) => {
            const user = args.input;
            user.id = String(UserList.length + 1);
            UserList.push(user);
            console.log(user)
            return user;
        },
        updateUser: (parent: unknown, args: { input }) => {
            const {id, newUsername} = args.input;
            const user = _.find(UserList, { id });
            if (user) {
                user.username = newUsername;
                return user;
            } else {
                throw new Error("User not found")
            }
        },
        deleteUser: (parent: unknown, args: { id: string }) => {
            const id = args.id;
            const user = _.find(UserList, { id });
            if (user) {
                _.remove(UserList, { id });
                return user;
            } else {
                throw new Error("User not found")
            }
        }

    }
}

export default resolvers;