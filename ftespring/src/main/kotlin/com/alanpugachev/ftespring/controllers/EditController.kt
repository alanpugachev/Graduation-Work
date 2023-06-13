package com.alanpugachev.ftespring.controllers

import com.alanpugachev.ftespring.dtos.Message
import com.alanpugachev.ftespring.models.Users
import com.alanpugachev.ftespring.repositories.UserRepository
import com.alanpugachev.ftespring.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/edit")
class EditController(private val userService: UserService) {
    @PostMapping
    fun editData(@RequestBody user: Users): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.userService.save(user))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Invalid data"))
        }
    }
}