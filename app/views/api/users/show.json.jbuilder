json.user do
  json.extract! @user, :id, :email, :first_name, :handle, :created_at, :updated_at
end

json.videos do
  @user.videos.each do |video|
    json.set! video.id do 
      json.extract! video, :id, :title, :description, :uploader_id, :created_at, :updated_at
      json.mediaObject video.media_object.url
    end
  end
end

