package com.alanpugachev.ftespring.controllers

import com.alanpugachev.ftespring.dtos.Message
import com.alanpugachev.ftespring.models.Users
import com.alanpugachev.ftespring.services.TaskService
import com.alanpugachev.ftespring.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("admin")
public class AdminController(private val userService: UserService, private val taskService: TaskService) {
    @GetMapping("users")
    fun getUsers(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(this.userService.getAllUsers())
        } catch(e: Exception) {
            return ResponseEntity.badRequest().body(Message("No users found"))
        }
    }

    @PostMapping("edit-user/{id}")
    fun editUser(@PathVariable id: Int, @RequestBody user: Users): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.userService.update(user, id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Cannot edit user"))
        }
    }

    @PostMapping("delete-user/{id}")
    fun deleteUser(@PathVariable id: Int): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.userService.delete(id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Cannot delete user$id"))
        }
    }

    @GetMapping("tasks")
    fun getAllUsers(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(this.taskService.getAllTasks())
        } catch(e: Exception) {
            return ResponseEntity.badRequest().body(Message("No users found"))
        }
    }
}