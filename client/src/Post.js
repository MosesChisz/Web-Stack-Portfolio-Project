import {formatISO9075} from "date-fns"
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author}){
    return(
        <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:4000/${cover}`} alt="" /> 
          </Link>
        </div>          
        <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
            <a className="author">{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
        <p className="summary">{summary}</p>       
            <div className="delete">
              <Link className="edit-btn" to={`/delete/${_id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6m4.5 0H4.5m0 0L5 19.5a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25L19.5 6H4.5z" />
                </svg>
                Delete this post
              </Link>
            </div>
        </div>          
      </div>
      
    )
}