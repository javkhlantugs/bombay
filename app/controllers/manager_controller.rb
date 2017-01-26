class ManagerController < ApplicationController
 	before_action :authenticate_user!
	def main
		render 'main'
	end

	def menu
		
		@theManager = User.find_by_role('manager')
		@menu = Menu.all
		@a_menu = Menu.new
		@items = MenuItem.all
		render 'menu'

	end

end
