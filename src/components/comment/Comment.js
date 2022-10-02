import { useEffect, useState } from "react";
import '../../App';
import { FaStar } from "react-icons/fa";
import {fetchComments,postComment} from "../../service/comment.service";
import Card from 'react-bootstrap/Card';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};


function Comment(bookId) {

  console.log('incoming book id',bookId?.value);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  const getAllComments =()=>{
    const res = fetchComments(bookId?.value);
    console.log('inside getAllComments(), after fetchComments',res)
    res.then((response)=>{
      if(response.status === 200){
        setComments(response.data)
      }
    })  
  }
  
  useEffect(()=>{
    getAllComments();
  },[])
  
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleComment = (e)=>{
      e.preventDefault();
      console.log('inside handlecomment',comment)
      const res = postComment(bookId,comment);
      res.then((response)=>{
        if(response.status===201){
          console.log('Comment posted successfully',response)
          getAllComments();
          }else{
            console.log('ERROR',response)
          }
      })     
  }

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }


  return (
    <div style={styles.container}>
      <h2> Add Comment</h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea
        value={comment} onChange={(e)=>setComment(e.target.value)} 
        placeholder="Add your comment here.."
        style={styles.textarea}
      />

      <button
        style={styles.button}
        onClick ={handleComment}
      >
        Submit
      </button>

      <br/><br/>
      <h2>User Comments</h2>

     <div>
     
      {
        (
          comments.map((comment) => (         
          
            <div key={comment.id} className="comment">
             
            <Card style={{ width: "20rem" ,padding:'10px 5px 10px' ,backgroundColor: '#F5FFFA',border:'1px solid 	#F0FFF0'}}>          
            <Card.Img variant="top" className="CommentImg" src="/user-icon.png" style={{borderRadius: '8px'}}/>
            <Card.Title style={{marginTop: 10, right:0}}><h3>{comment.userName}</h3></Card.Title> 
              <Card.Body>
              

                <Card.Text style={{font:'notoserif'}}>
                {comment.userComment}                     
                </Card.Text>
                <Card.Text>
                {comment.timestamp}
                </Card.Text>
              </Card.Body>
            </Card>
          


            
            {/* <h3>{comment.userName}</h3>
            

            
             
              <h3>{comment.userComment}</h3>
              <h4>{comment.timestamp}</h4> */}
          </div>
            
          ))
        )
      }
         
              

        {/* //Actual code
        {
        (
          comments.map((comment) => (         
            <div>
              <h2>{comment.userName}</h2>
              <h3>{comment.userComment}</h3>
              <h4>{comment.timestamp}</h4>
            </div>
          ))
        )
      } */}


        {/* <div key={comments.id} className="comment">

         <div className="comment-image-container">
        <img src="/user-icon.png" />
        <h3>{comments.userName}</h3>
           </div>
                
        </div> */}


       
      {/* {
      comments.length > 0 ? (
          comments.map((comment) => (
            console.log('each comment',comment)
          ))
        ) : (
          <h3>This book has no comments</h3>
        )
      } */}
      </div>
      {/* //You are code */}

        

    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 500,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};


export default Comment;