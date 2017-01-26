Rails.application.routes.draw do
  devise_for :users, :skip => :registration
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html  


  scope 'api' do
  	resources :menus, only: [:destroy, :create, :update, :index], controller: 'menus_api' do
      resources :menu_items, only: [:destroy, :create, :update, :new], controller: 'menu_items_api'
    end

  end


  root :to => 'site#home'

  get '/manager', to: 'manager#main', as: 'manager_main'
  get '/manager/menu', to: 'manager#menu', as: 'manager_menu'

 
end
