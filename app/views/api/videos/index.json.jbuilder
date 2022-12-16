@videos.each do |video|
   json.set! video.id do
      json.extract! video, :id, :title, :description
      json.mediaObject video.media_object.url
   end
end


