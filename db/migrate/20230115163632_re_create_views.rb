class ReCreateViews < ActiveRecord::Migration[7.0]
  def change
    create_table :views do |t|
      t.references :viewer, null: true
      t.references :video, null: false
      t.timestamps
    end
  end
end
