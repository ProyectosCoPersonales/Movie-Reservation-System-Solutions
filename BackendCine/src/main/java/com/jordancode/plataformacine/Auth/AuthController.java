package com.jordancode.plataformacine.Auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "login")
    public AuthResponse login(@RequestBody LoginRequest request)
    {   
        String token = authService.login(request).getToken();
        String username = authService.getUsername(token);
        String role = authService.getRole(token);
        AuthResponse authResponse = new AuthResponse(token,username,role);
        return authResponse;
        
    }

    @PostMapping(value = "register")
    public AuthResponse register(@RequestBody RegisterRequest request)
    {
        String token = authService.register(request).getToken();
        String username = authService.getUsername(token);
        String role = authService.getRole(token);
        AuthResponse authResponse = new AuthResponse(token,username,role);
        return authResponse;
    }
}
