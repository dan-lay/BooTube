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

   belongs_to :uploader,
   foreign_key: :uploader_id,
   class_name: :User

   has_one_attached :media_object
end
