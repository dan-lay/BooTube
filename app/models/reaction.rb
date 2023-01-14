# == Schema Information
#
# Table name: reactions
#
#  id             :bigint           not null, primary key
#  reactable_type :string
#  reactable_id   :bigint
#  is_like        :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Reaction < ApplicationRecord
   belongs_to :reactable, polymorphic: true

   scope :likes, -> { where(is_like: true) }
   scope :dislikes, -> { where(is_like: false) }
end
