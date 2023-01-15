json.user do
   json.extract! @user, :id, :email, :first_name, :handle, :created_at, :updated_at
   json.sessionUserPic @user.profile_image.url
end