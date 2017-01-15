class ManagerController < ApplicationController
 	before_action :authenticate_user!
	def main
		render 'main'
	end

	def menu
		render 'menu'
	end

end
