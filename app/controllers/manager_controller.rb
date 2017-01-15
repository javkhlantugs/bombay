class ManagerController < ApplicationController

	def main
		render 'main'
	end

	def non_header
		@skip_header= true
	end

end
