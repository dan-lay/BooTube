json.user do
  json.extract! @user, :id, :email, :first_name, :handle, :created_at, :updated_at
end

# json.videos do

# end