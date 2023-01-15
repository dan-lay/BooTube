import './ProfilePic.css'

export const ProfilePic = (props) => {
   const image = props.image;
   const firstInitial = props.firstName[0];

   const defaultPic = <div className="default-pic">
                        <p>{`${firstInitial}`}</p>
                      </div>

   const userPic = <img src={image} className="user-pic">
                     
                   </img>
   return (
      <div className="profile-image">
         {image ? userPic : defaultPic}
      </div>
   )
}