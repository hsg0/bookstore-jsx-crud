import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const CreateBooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSaveBook = ( ) => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true)
    axios
      .post('http://localhost:5555/books', data)
      .then((response) => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-2xl font-bold'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='mt-4 flex flex-col border-2 border-sky-400 p-4 rounded-md'>
        <div className='my-4'>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-300 rounded-md p-2'
          />
        </div>
        <div className='my-4'>
          <label htmlFor="">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-300 rounded-md p-2'
          />
        </div>
        <div className='my-4'>
          <label htmlFor="">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-300 rounded-md p-2'
          />
        </div>
        <button
          onClick={handleSaveBook}
          className='bg-green-500 text-white px-4 py-2 rounded-md'
        >
          Save Book
        </button>
      </div>
    </div>
  )
}

export default CreateBooks