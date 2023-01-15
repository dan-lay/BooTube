class View < ApplicationRecord
   validates :video_id, presence: true
   
   belongs_to :viewer,
      foreign_key: :viewer_id,
      class_name: :User
      
   belongs_to :video,
      foreign_key: :video_id,
      class_name: :Video
end