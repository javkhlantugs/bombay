class MenuItemsApiController < ApplicationController

	def new
		@the_menu = Menu.find(params[:menu_id])
		@the_item = @the_menu.menu_items.new
	end

	def create
		@menu = Menu.find(params[:menu_id])
		@new_item = @menu.menu_items.new(items_params)

		@new_item.save!
		redirect_to manager_menu_path

	end

	def update
		@menu_item = MenuItem.find(params[:id])
		@menu_item.update(items_params)
		respond_to do |format|
			if @menu_item.save
				format.json {render json: @menu_item}
			else
				format.json { render json: @menu_item.errors, status: :unprocessable_entity }
			end
		end
	end




	def items_params
		params.require(:menu_item).permit(:name, :price, :description)
	end

end
