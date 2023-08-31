import star from "../icons/star.svg"
import google from "../icons/google.svg"

function ReviewCard({cardHeading,cardParagraf,cardName,cardTitle,cardImg}) {
  return (
    <div className="review_card">
        <h1>{cardHeading}</h1>
        <p>{cardParagraf}</p>
     
        <div>
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
        </div>
        <h4>{cardName}</h4>
        <h5>{cardTitle}</h5>
        <div>
            <img src={google} alt="" />
           
            <h5>Google</h5>
        </div>
        <div className="review_image">
        <img  src={cardImg} alt="" />

        </div>
    </div>
  )
}

export default ReviewCard