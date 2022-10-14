class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :title, length: { in: 1..100 }
      t.text :description, length: { in: 0..5000 }, allow_nil: true
      t.references :uploader, index: true, foreign_key: { to_table: :users }


      t.timestamps
    end
  end
end
