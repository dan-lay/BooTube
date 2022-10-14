json.video do
   json.extract! @video, :id, :title, :description, :created_at, :updated_at
   json.media_object @video.media_object.url
end