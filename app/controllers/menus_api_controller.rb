class MenusApiController < ApplicationController
	protect_from_forgery with: :null_session
	def index
		theMenu = Menu.all
		render json: theMenu
	end

	def create
		@new_menu = Menu.new(menu_params)


		respond_to do |format| 
			if @new_menu.save
				format.json { render json: @new_menu}
			else
				format.json { render json: @new_menu.errors, status: :unprocessable_entity }
			end
		end
	end


	def destroy
		menu = Menu.find(params[:id])
		menu.destroy
		render json: menu
	end

	def menu_params
		params.require(:menu).permit(:name)
	end

end
