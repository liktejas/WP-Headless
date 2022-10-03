import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

const Single = () => {
  const [author, setAuthor] = useState()
  const [post, setPost] = useState([])
  const [cat, setCat] = useState([])
  const [postDate, setPostDate] = useState('')
  const { id } = useParams()
  const getSinglePost = async () => {
    try {
      let res = await fetch('http://localhost/testing/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
                {
                    post(id: "`+ id + `", idType: SLUG) {
                      id
                      title
                      featuredImage {
                        node {
                          id
                        }
                      }
                      content
                      author {
                        node {
                          name
                        }
                      }
                      date
                      categories {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      commentCount
                    }
                  }
            `,
        }),
      })
      let result = await res.json()
      setAuthor(result.data.post.author.node.name)
      setPost(result.data.post)
      setCat(result.data.post.categories.edges)
      let date = new Date(result.data.post.date)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      setPostDate(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear())
    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    getSinglePost()
  }, [id])

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#eaeaea' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mt-5">
              <div className="p-3 bg-white my-3">
                <h2>{post.title}</h2>
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-uppercase post-meta mt-2"><i className="fa fa-user" aria-hidden="true"></i> {author} - posted on <i className="fa fa-calendar" aria-hidden="true"></i> {postDate} - posted in <i className="fa fa-folder-open" aria-hidden="true"></i> {cat.map(curr => curr.node.name)} - <i className="fa fa-comments-o" aria-hidden="true"></i> {post.commentCount === null ? 'No Comments' : post.commentCount}</p>
                    {/* <p className="text-uppercase post-meta mt-2"><i className="fa fa-user" aria-hidden="true"></i> {post.author.node.name} -  posted on {post.date} - {cat.map(curr => curr.node.name)} - {post.commentCount === null ? 'No Comments' : post.commentCount}</p> */}
                  </div>
                </div>
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