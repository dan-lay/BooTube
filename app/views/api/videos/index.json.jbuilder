@videos.each do |video|
   json.set! video.id do
      json.extract! video, :id, :title, :description
      json.media_object video.media_object.url
      json.thumbnail video.media_object.preview(resize_to_limit: [300, 180]).processed.url
      
   end
   # puts thumbnail

end


