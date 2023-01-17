json.comment do
   json.extract! @comment, :id, :body, :commenter_id, :video_id, :created_at, :updated_at
end