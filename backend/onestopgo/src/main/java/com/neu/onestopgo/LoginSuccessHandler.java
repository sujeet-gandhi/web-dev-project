//package com.neu.onestopgo;
//
//import com.neu.onestopgo.models.Role;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.web.RedirectStrategy;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.stream.Collectors;
//
//
//
//@Component
//public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    public static final String LOGIN_URI = "/login";
//    public static final String LOGOUT_URI = "/logout";
//    public static final String JSESSIONID = "JSESSIONID";
//    public static final String ADMIN_ROLE = "ADMIN";
//    public static final String ADMIN_SUCCESS_URL = "/api/v1/category";
//    public static final String USER_ROLE = "USER";
//    public static final String USER_SUCCESS_URL = "/user/dashboard";
//
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
//           redirectToSuccessUrl(request, response, ADMIN_SUCCESS_URL);
//        String user=request.getUserPrincipal().getName();
//        request.setAttribute("user",user);
//
//    }
//
//    private void redirectToSuccessUrl(HttpServletRequest request, HttpServletResponse response, String success_url) throws IOException {
//        RedirectStrategy redirectStrategy = super.getRedirectStrategy();
//        redirectStrategy.sendRedirect(request, response, success_url);
//    }
//
//    public boolean checkForRole(Authentication authentication, String role) {
//        if (authentication != null) {
//            return authentication.getAuthorities().stream()
//                    .map(GrantedAuthority::getAuthority)
//                    .collect(Collectors.toList()).contains(role);
//        }
//        return false;
//    }
//}