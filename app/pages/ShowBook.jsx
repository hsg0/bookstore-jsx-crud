import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


const ShowBook = () => {

  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=> {
        setBook(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }
  , [id])

  return (
    <div className='p-4'>
      <BackButton />
      <h1>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{book._id}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{book.title}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{book.author}</span>
            </div>
            <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{book.publishYear}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span className='text-xl font-bold'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}

    </div>
  )
}

export default ShowBook