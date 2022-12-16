json.video do
   json.extract! @video, :id, :title, :description, :uploader_id, :created_at, :updated_at
   json.media_object @video.media_object.url
   json.uploaderName @video.uploader.first_name #change to username later
   json.set! :comments do
      json.array! @video.comments, :id
   end
end

json.comments do
   @video.comments.each do |comment|
      json.set! comment.id do
         json.extract! comment, :id, :body, :commenter_id, :video_id, :created_at, :updated_at
         json.commenterName comment.commenter.first_name #change to username later
      end
   end
end