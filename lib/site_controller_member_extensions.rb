module SiteControllerMemberExtensions
  def self.included(base)
    base.send(:include, InstanceMethods)
    base.class_eval do
      session :disabled => false
      alias_method_chain :show_page, :member_validation
      use_cookies_flash
    end
  end
  
  module InstanceMethods
    def show_page_with_member_validation
      url = params[:url]
      if Array === url
        url = url.join('/')
      else
        url = url.to_s
      end
      if MemberSystem.allow_url?(current_member, url)
        show_page_without_member_validation
      else
        flash[:error] = "Member must be logged in."
        redirect_to MEMBER_LOGIN_PATH
      end
    end
  end
end