class ChangeLikesToReactions < ActiveRecord::Migration[7.0]
  def change
    add_column :likes, :is_like, :boolean
    rename_table :likes, :reactions
  end
end
