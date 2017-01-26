class ManagerController < ApplicationController
 	before_action :authenticate_user!
	def main
		render 'main'
	end

	def menu
		
		@menu = Menu.all
		@a_menu = Menu.new
		render 'menu'

	end

end
