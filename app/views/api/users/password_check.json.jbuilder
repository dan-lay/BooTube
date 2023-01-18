json.user do
   json.extract! @user, :first_name, :email
   json.profileImage @user.profile_image.url
end