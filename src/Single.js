import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

const Single = () => {
    const [post, setPost] = useState([])
    const { id } = useParams()
    const getSinglePost = async () => {
        let res = await fetch('http://localhost/testing/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                {
                    post(id: "hello-world", idType: SLUG) {
                      id
                      title
                      featuredImage {
                        node {
                          id
                        }
                      }
                      content
                    }
                  }
            `,
            }),
        })
        let result = await res.json()
        console.log(result.data.post)
        setPost(result.data.post)
    }
    useEffect(() => {
      getSinglePost()
    }, [])
    
  return (
    <>
        <Navbar />
        <div style={{ backgroundColor: '#eaeaea' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-5">
                        <div className="p-3 bg-white my-3">
                            <h2>{post.title}</h2>
                            <span dangerouslySetInnerHTML={{ __html: post.content }}></span>
                        </div>
                    </div>
                    <div className="col-md-4 mt-5">
                    <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Single