let { userList, moviesList } = require('../sampleData')

const resolvers = {
  Query: {
    // here is where we will do the actual database call
    // for now we will just use the file `sampleData.js`
    users () {
      // return type without union error handling:
      return userList

      // // return type with union error handling:
      // if (userList) {
      //   // if api call was successful and userList is fetched, return a UserSuccessfulResult object containing
      //   // the userList as a key-value pair
      //   return { users: userList }
      // }
      // // if unsuccessful, return an UserErrorResult object with message describing the error
      // return { message: 'An Error Occurred!!' }
    },

    user: (parent, args, context, info) => {
      const id = args.id
      return userList.find(user => user.id === id)
    },

    movies: () => {
      return moviesList
    },

    movie: (_, args) => {
      const name = args.name
      return moviesList.find(movie => movie.name === name)
    }
  },

  User: {
    // resolver for getting favourite movies by the user
    // actually we can include a list of IDs from the users table, then query the favourite movies table by those IDs
    // make that API call in this resolver and return the list
    favouriteMovies: () => {
      return moviesList.filter(
        movie =>
          movie.yearOfPublication >= 2010 && movie.yearOfPublication <= 2020
      )
    }
  },

  Mutation: {
    // put the logic for inserting into a database here
    // for now we are just pushing data into a file
    createUser: (_, args) => {
      const user = args.input
      // console.log(user)
      const lastID = userList[userList.length - 1].id
      user.id = (parseInt(lastID) + 1).toString()
      userList.push(user)
      return user
    },

    updateUsername: (_, args) => {
      const { id, newUsername } = args.input
      let newUser
      userList.forEach(user => {
        if (user.id === id) {
          newUser = user
          user.username = newUsername
        }
      })
      return newUser
    },

    deleteUserByID: (_, args) => {
      const id = args.id
      userList = userList.filter(user => user.id !== id)
      return null
    }
  },

  // RESOLVER FOR UNION TYPE OF USERSRESULT:
  // UsersResult: {
  //   __resolveType (obj) {
  //     if (obj.users) {
  //       return 'UserSuccessfulResult'
  //     }
  //     if (obj.message) {
  //       return 'UserErrorResult'
  //     }

  //     // some other error occurred
  //     return null
  //   }
  // }
}

module.exports = { resolvers }

/*
fragments: to re-use code on the frontend 
instead of specifying the same fields again and again

Eg:)

fragment GetUserNames on User {
  name
  age
}

query GetUserInfo {
  users {
    ...GetUserNames
  }
}

*/
