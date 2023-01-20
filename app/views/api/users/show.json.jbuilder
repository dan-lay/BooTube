json.user do
  json.set! @user.id do
    json.extract! @user, :id, :email, :first_name, :last_name, :handle, :created_at, :updated_at
    json.subscribers @user.subscribers
    json.subCount @user.subscribers.length
    json.profileImage @user.profile_image.url
  end
end

json.videos do
  @user.videos.each do |video|
    json.set! video.id do 
      json.extract! video, :id, :title, :description, :uploader_id, :created_at, :updated_at
      json.mediaObject video.media_object.url
      json.firstName video.uploader.first_name
      json.channelPic video.uploader.profile_image.url
      json.uploaderHandle video.uploader.handle
    end
  end
end

