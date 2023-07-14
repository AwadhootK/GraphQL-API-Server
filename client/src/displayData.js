import { useQuery, useLazyQuery, gql } from '@apollo/client'
import React, { useState } from 'react'
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

const GetUserByID = gql`
  query getUserByID($userID: ID!) {
    user(id: $userID) {
      username
      name
      age
      nationality
    }
  }
`

function Data () {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS)
  const [username, setUsername] = useState('')
  const [fetchUser, { data: userData, error: userError }] =
    useLazyQuery(GetUserByID)

  if (error) {
    return <h1>An error occurred!</h1>
  }

  if (loading) {
    return <h1>Data is loading...</h1>
  }

  if (data) {
    console.log(data)
  }

  if (userData) {
    console.log('FOUND!!!')
  }

  return (
    <>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Enter Username'
          onChange={e => setUsername(e.target.value)}
        />
        <button onClick={() => fetchUser({ variables: { userID: username } })}>
          Search
        </button>
      </div>
      {userData && !userError ? (
        <div>
          <h4>User Found</h4>
          <div className='container my-div'>
            <li>Name: {userData.user.name}</li>
            <li>Age: {userData.user.age}</li>
            <li>Nationality: {userData.user.nationality}</li>
          </div>
        </div>
      ) : (
        <h4>User not found!</h4>
      )}
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
    </>
  )
}

export default Data
