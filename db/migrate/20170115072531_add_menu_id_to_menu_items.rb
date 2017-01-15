class AddMenuIdToMenuItems < ActiveRecord::Migration[5.0]
  def change
    add_column :menu_items, :menu_id, :integer
  end
end
