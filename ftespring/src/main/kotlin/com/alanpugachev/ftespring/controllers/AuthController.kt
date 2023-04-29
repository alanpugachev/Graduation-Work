package com.alanpugachev.ftespring.controllers

import com.alanpugachev.ftespring.dtos.LoginDTO
import com.alanpugachev.ftespring.dtos.Message
import com.alanpugachev.ftespring.dtos.RegisterDTO
import com.alanpugachev.ftespring.models.Users
import com.alanpugachev.ftespring.services.UserService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*
import java.util.Base64
import java.util.Date

@RestController
class AuthController(private val userService: UserService) {
    @PostMapping("register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<Users> {
        val user = Users()
        user.firstName = body.firstName
        user.secondName = body.secondName
        user.email = body.email
        user.password = body.password
        user.role = body.role

        return ResponseEntity.ok(this.userService.save(user))
    }

    @PostMapping("login")
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Any>{
        val user = this.userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("user not found!"))

        if (!user.comparePassword(body.password)) {
            return ResponseEntity.badRequest().body(Message("invalid password"))
        }

        val base64SecretKey = "666"
        val secretKeyBytes = Base64.getDecoder().decode(base64SecretKey)
        val issuer = user.id.toString()
        val jwt = Jwts.builder()
            .setIssuer(issuer)
            .setExpiration(Date(System.currentTimeMillis() + 60 * 24 * 60 * 1000))
            .signWith(SignatureAlgorithm.HS512, secretKeyBytes).compact()

        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("success"))
    }

    @GetMapping("user")
    fun user(@CookieValue("jwt") jwt: String?): ResponseEntity<Any> {
        try {
            if(jwt == null) {
                return ResponseEntity.status(401).body(Message("unauthenticated"))
            }
            val base64SecretKey = "666"
            val secretKeyBytes = Base64.getDecoder().decode(base64SecretKey)

            val body = Jwts.parser().setSigningKey(secretKeyBytes).parseClaimsJws(jwt).body

            return ResponseEntity.ok(this.userService.getById(body.issuer.toInt()))
        } catch (e: Exception) {
            return ResponseEntity.status(401).body(Message("unauthenticated"))
        }
    }

    @PostMapping("logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "")
        cookie.maxAge = 0

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("success"))
    }
}