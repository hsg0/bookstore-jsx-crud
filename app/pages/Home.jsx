'use client'

import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'



const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios
      .get('http://localhost:5555/books')
      .then((response)=> {
        setBooks(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Books List</h1>
        <Link to='/books/create' className='bg-green-500 text-white px-4 py-2 rounded-md flex items-center'>
          <MdOutlineAddBox className='mr-2' />
          Add Book
        </Link>

      </div>
      {loading ?( <Spinner />
      ) : (
              <table className='w-full mt-4 border-separate border-spacing'>
                <thead>
                  <tr>
                    <th className='border border-gray-300 rounded-md'>No</th>
                    <th className='border border-gray-300 rounded-md'>Title</th>
                    <th className='border border-gray-300 rounded-md max-md:hidden'>Author</th>
                    <th className='border border-gray-300 rounded-md max-md:hidden'>Publish Year</th>
                    <th className='border border-gray-300 rounded-md'>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id}>
                      <td className='border border-gray-300 rounded-md text-center'>{index + 1}</td>
                      <td className='border border-gray-300 rounded-md text-center'>{book.title}</td>
                      <td className='border border-gray-300 rounded-md text-center max-md:hidden'>{book.author}</td>
                      <td className='border border-gray-300 rounded-md text-center max-md:hidden'>{book.publish_year}</td> 
                      <td className='border border-gray-300 rounded-md text-center'>
                        <div className='flex justify-center items-center'>
                          <Link to={`/books/details/${book.id}`} className='bg-blue-500 text-white px-2 py-1 rounded-md mr-2'>
                          <BsInfoCircle className='text-xl text-green-800' />
                          </Link>
                          <Link to={`/books/edit/${book.id}`} className='bg-yellow-500 text-white px-2 py-1 rounded-md mr-2'>
                          <AiOutLineEdit className='text-xl text-green-800' />
                          </Link>
                          <Link to={`/books/delete/${book.id}`} className='bg-red-500 text-white px-2 py-1 rounded-md'>
                          <MdOutlineDelete className='text-xl text-green-800' />
                          </Link>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                </table>

          )}
    </div>
  )
}

export default Home