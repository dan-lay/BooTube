class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :reactable, polymorphic: true
      t.boolean :is_like
      t.timestamps
    end
  end
end
