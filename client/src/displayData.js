import { useQuery, gql } from '@apollo/client'
import React from 'react'

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      nationality
      username
    }
  }
`

function Data () {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS)

  if (error) {
    return <h1>An error occurred!</h1>
  }

  if (loading) {
    return <h1>Data is loading...</h1>
  }

  if (data) {
    console.log(data)
  }

  return (
    <div>
      {data &&
        data['users'].map(user => (
          <>
            <div>
              <li>Name: {user.name}</li>
              <li>Username: {user.name}</li>
              <li>Age: {user.age}</li>
              <li>Country: {user.nationality.toLowerCase()}</li>
              <li>Friends: {user.friends}</li>
            </div>
            <hr></hr>
          </>
        ))}
    </div>
  )
}

export default Data
