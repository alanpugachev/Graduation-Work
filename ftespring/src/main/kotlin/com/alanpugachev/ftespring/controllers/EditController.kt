package com.alanpugachev.ftespring.controllers

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

    data class FormData(
        val id: Int,
        val firstName: String,
        val secondName: String,
        val email: String,
        val password: String,
        val role: String
    )

    @PostMapping
    fun editData(@RequestBody formData: FormData): ResponseEntity<Any> {
        userService.getById(formData.id).id = formData.id
        userService.getById(formData.id).firstName = formData.firstName
        userService.getById(formData.id).secondName = formData.secondName
        userService.getById(formData.id).email = formData.email
        userService.getById(formData.id).password = formData.password
        userService.getById(formData.id).role = formData.role

        return ResponseEntity.ok("Successful")
    }
}