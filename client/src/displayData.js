import { useQuery, gql } from '@apollo/client'
import React from 'react'
import './displayData.css'

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
    <div className='container'>
      {data &&
        data['users'].map(user => (
          <div key={user.id}>
            <ul>
              <li className='name'>Name: {user.name}</li>
              <li>Username: {user.username}</li>
              <li>Country: {user.nationality.toLowerCase()}</li>
              <li className='friends'>Friends: {user.friends}</li>
            </ul>
            <hr />
          </div>
        ))}
    </div>
  )
}

export default Data
