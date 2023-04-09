package com.alanpugachev.ftespring.controllers

import com.alanpugachev.ftespring.dtos.RegisterDTO
import com.alanpugachev.ftespring.models.Users
import com.alanpugachev.ftespring.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

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
}