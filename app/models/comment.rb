# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  commenter_id :bigint
#  video_id     :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  body         :text
#
class Comment < ApplicationRecord
   validates :body, length: { in: 1..10000 }
   validates :commenter_id, presence: true
   validates :video_id, presence: true

   belongs_to :commenter,
   foreign_key: :commenter_id,
   class_name: :User

   belongs_to :video,
   foreign_key: :video_id,
   class_name: :Video

   has_many :reactions, as: :reactable,
   dependent: :destroy
end
