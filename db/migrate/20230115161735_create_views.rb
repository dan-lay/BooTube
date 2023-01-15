class CreateViews < ActiveRecord::Migration[7.0]
  def change
    create_table :views do |t|
      t.references :viewer, null: false
      t.references :video, null: false
      t.timestamps
    end
  end
end
