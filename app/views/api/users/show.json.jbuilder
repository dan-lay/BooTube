json.user do
  json.extract! @user, :id, :email, :channel_name, :created_at, :updated_at
end