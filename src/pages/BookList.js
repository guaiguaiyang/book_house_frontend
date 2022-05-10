import axios from "axios"
import {useState,useEffect} from 'react';

const BookList = () => {
    const [books,setBooks]=useState([])
    const [comment,setComment]=useState('')
    const [comments,setComments]=useState([])

// get books from DB
    const fetchBooks = async()=>{
        let userId = localStorage.getItem('userId')
        if (userId){
            try{
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/user/${userId}`)
                .then((response)=>{
                    // console.log(response)
                    setBooks(response.data.books)
                })
            }catch(error){
                console.log(error)
            }
        }
    }
    useEffect(()=>{fetchBooks()},[])
// delete book from DB

    const deleteBook = async (id)=>{
        console.log(id)
        try{
            let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`)
            console.log(res)
            window.location.reload(false)
        }catch(error){
            console.log(error)
        }
    }
//submit comment info to DB
    const submitComment = async(comment,bookId)=>{
        // id.preventDefault()
        if(comment === ''){
            alert('Write some comments')
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment`,{comment,bookId})
            .then((response)=>{
                fetchComments(bookId)
                // clear comment text box
                
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
// get comments from DB by bookId
    const fetchComments = async(bookId)=>{
        if (bookId){
            try{
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/book/${bookId}`)
                .then((response)=>{
                    console.log(response)
                    setComments(response.data.comments)
                })
            }catch(error){
                console.log(error)
            }
        }
    }
    useEffect(()=>{fetchComments()},[])
// delete comment from DB
    const deleteComment = async (comment)=>{
        if(comment){
            try{
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comment/${comment.id}`)
                .then((response)=>{
                    fetchComments(comment.bookId)
                    // window.location.reload(false)
                })
            }catch(error){
                console.log(error)
            }
        }
    }

    return (
        <div className="shelf">
            <div>
            <h1>My shelf</h1>
            <br/>
            {books.map((book,i)=>{
                return (
                    <div className="list" key={i}>
                        <img src={`https://covers.openlibrary.org/b/olid/${book.cover}-L.jpg`} width='170' height='200'/>
                        <h4>
                           title:{book.title}<br/>
                           name:{book.name}<br/>
                        </h4>
                        <button className="deletebook" onClick={()=>{deleteBook(book.id)}}>Delete Book</button>
                        <div>
                            <input className="comment" placeholder="input comment about this book" onChange={(e) =>setComment(e.target.value)}/><br/>
                            <br/>
                            <div>
                            <button className="publish" onClick={()=>{submitComment(comment,book.id)}}>Publish Comment</button>
                            <button className="see" onClick={()=>{fetchComments(book.id)}}>See Comments</button>
                            </div>
                            <br/>
                        </div>
                    </div>
                )
            })} 
            </div>  
            <div className="commentbar">
                <h1>comments bar</h1>
                    {comments.map((c,y)=>{
                        return(
                            <div key={y}>
                                <h3>
                                    {/* {c.bookId} */}
                                    {y+1}: {c.comment}
                                    {/* {c.id} */}
                                </h3>
                                <button onClick={()=>{deleteComment(c)}}>Delete</button>
                            </div>
                        )
                    })}
            </div>
        </div>
        
    )
}

export default BookList
// value={comment}
// {(e) =>setComment(e.target.value)}