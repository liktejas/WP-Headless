import React from 'react'
import { Link } from "react-router-dom";



const Sidebar = () => {

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
      
    }, [])
    
    return (
        <div className="p-3 bg-white my-3">
            <h2>Recent Posts</h2>
            {
                posts.map((curr, index) => {
                    return (
                        <div className="mb-2" key={curr.node.id} >
                            <Link style={{ textDecoration: 'none' }} to={"/single/" + curr.node.slug}>{curr.node.title}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar