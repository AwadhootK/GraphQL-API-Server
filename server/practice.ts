type User = {
    id: string,
    name: string,
    email: string,
    age: number,
    occupation: string,
    gender: 'male' | 'female'
    info: () => void
 }

const a: User = {
    id: '1',
    name: 'John',
    email: 'awadhootk6@gmail.com',
    age: 20,
    occupation: 'Software Engineer',
    gender: 'male',
    info: () => {
        console.log(this)
    }
}

a.info()