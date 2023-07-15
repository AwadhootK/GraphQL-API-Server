import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client'
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

const createUserMuation = gql`
  mutation createUserMuation($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      age
      nationality
    }
  }
`

function Data () {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS)
  const [usern, setUsern] = useState('')
  const [fetchUser, { data: userData, error: userError }] =
    useLazyQuery(GetUserByID)

  // states for the input types
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')

  const [createUser] = useMutation(createUserMuation)

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
          onChange={e => setUsern(e.target.value)}
        />
        <button onClick={() => fetchUser({ variables: { userID: usern } })}>
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
      <div className='input-div'>
        <h3>Create New User</h3>
        <input
          type='text'
          placeholder='Name...'
          onChange={e => setName(e.target.value)}
        ></input>
        <input
          type='text'
          placeholder='Username...'
          onChange={e => setUsername(e.target.value)}
        ></input>
        <input
          type='number'
          placeholder='Age...'
          onChange={e => setAge(parseInt(e.target.value))}
        ></input>
        <input
          type='text'
          placeholder='Nationality...'
          onChange={e => setNationality(e.target.value.toUpperCase())}
        ></input>
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name: name,
                  username: username,
                  age: age,
                  nationality: nationality
                }
              }
            })
            refetch()
          }}
        >
          Create User
        </button>
      </div>
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
