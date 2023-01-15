@videos.each do |video|
   json.set! video.id do
      json.extract! video, :id, :title, :description, :uploader_id, :created_at, :updated_at
      json.mediaObject video.media_object.url
      json.uploaderHandle video.uploader.handle
      json.uploaderId video.uploader.id 
      json.channelPic video.uploader.profile_image.url
      json.firstName video.uploader.first_name
   end
end


