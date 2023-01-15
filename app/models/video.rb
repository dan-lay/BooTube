# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :text
#  uploader_id :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
   validates :title, length: { minimum: 1, maximum: 100}
   validates :description, length: { maximum: 5000 }
   validate :ensure_media_object

   has_one_attached :media_object

   belongs_to :uploader,
      foreign_key: :uploader_id,
      class_name: :User

   has_many :comments,
      foreign_key: :video_id,
      class_name: :Comment,
      dependent: :destroy

   has_many :reactions,
      as: :reactable,
      dependent: :destroy

   has_many :views,
      foreign_key: :video_id,
      class_name: :View,
      dependent: :destroy

   has_many :video_viewers,
      through: :Views,
      source: :User

   def ensure_media_object
      unless self.media_object.attached?
         errors.add(:media_object, "Video link must be attached")
      end
   end
end
