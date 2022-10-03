import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import './blogs.css';

const Blogs = () => {

    const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
        let res = await fetch('http://localhost/testing/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
            {
                posts {
                  edges {
                    node {
                      id
                      slug
                      title
                      featuredImage {
                        node {
                          id
                        }
                      }
                      content
                      excerpt
                    }
                  }
                }
              }
            `,
            }),
        })
        let result = await res.json()
        console.log(result.data.posts.edges)
        setPosts(result.data.posts.edges)
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <div style={{ backgroundColor: '#eaeaea' }}>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-5">
                        {
                            posts.map((curr, index) => {
                                return (
                                    <div key={curr.node.id} className="p-3 bg-white my-3">
                                        <h2>{curr.node.title}</h2>
                                        <span dangerouslySetInnerHTML={{ __html: curr.node.excerpt }}></span>
                                        <Link style={{textDecoration: 'none'}} to={"/single/"+curr.node.slug}>Read More...</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-md-4 mt-5">
                        <Sidebar posts={posts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs