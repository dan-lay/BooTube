class Reaction < ApplicationRecord
   belongs_to :reactable, polymorphic: true

   scope :like, -> { where(is_like: true) }
   scope :dislike, -> { where(is_like: false) }
end
