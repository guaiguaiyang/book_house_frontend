import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {
    // subject is for search object from API
    const [subject,setSubject] = useState('')
    // books' details
    const [works,setWorks] = useState([])
    // 
    const [title,setTitle] = useState('')
    const [name,setName] = useState('')
    const [cover,setCover] = useState('')

//  get book informations
    const fetchbooks = async(subject) =>{
        try{
            let response = await axios.get(`https://openlibrary.org/subjects/${subject}.json`)
            // console.log(response.data.works)    
            setWorks(response.data.works)
            // console.log(works)
        }catch(error){
            console.log(error)
            alert('please input subject')
        }
    }
    useEffect(()=>{fetchbooks()},[])

//  submit book info to DB
    const submitBook = async(i) =>{
        let userId = localStorage.getItem('userId')
        console.log(works[i])
        setTitle(works[i].title)
        setName(works[i].authors[0].name)
        setCover(works[i].cover_edition_key)

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book`,{title:works[i].title,name:works[i].authors[0].name,cover:works[i].cover_edition_key,userId})
        .then((response)=>{
            console.log(response)
            alert('You Add One Book')
        }).catch((error)=>{
            console.log('not book submit')
        })    
        
    }

// function to clear the input content automatically
    const handleInputClear= async()=> {
        // e.preventDefault();
        setSubject('')
    }

    return (
        <main className="home">
            <h2>Welcom To BoOk House!~</h2>
            {/* input subject to search */}
            <div>
                What subject books you want?<br/>
                <input placeholder="input subject" type="string" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                <button value={subject} onClick={()=>{fetchbooks(subject);handleInputClear()}} className='subject-submit'>Submit</button>
            </div>
            {/* show all fetch books */}
            <div className='booklist'>
                {works.map((book,i)=>(
                    <div key={i}  className='cell'>
                        <img src={`https://covers.openlibrary.org/b/olid/${works[i].cover_edition_key}-L.jpg`} width='170' height='200'/>
                    <>
                       <p>Book Name: {works[i].title}<br/>
                       Author: {works[i].authors[0].name}</p>
                    </>
                       <button className='add' onClick={()=>{submitBook(i)}}>Add To</button>
                    </div>
                ))} 
            </div>

        </main>


    )
}

export default Home
