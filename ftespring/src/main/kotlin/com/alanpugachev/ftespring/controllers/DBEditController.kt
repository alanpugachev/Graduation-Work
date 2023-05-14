package com.alanpugachev.ftespring.controllers;

import com.alanpugachev.ftespring.dtos.CreateTaskDTO
import com.alanpugachev.ftespring.dtos.Message
import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.services.TaskService
import com.alanpugachev.ftespring.services.UserService;
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/db")
public class DBEditController(private val taskService: TaskService) {
    @PostMapping("create")
    fun createTask(@RequestBody body: CreateTaskDTO): ResponseEntity<Task> {
        val task = Task()
        task.title = body.title
        task.executionTime = body.executionTime
        task.customer = body.customer
        task.price = body.price

        return ResponseEntity.ok(this.taskService.save(task))
    }

    @PostMapping("update")
    fun updateTask(@RequestBody task: Task): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.taskService.save(task))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Invalid data"))
        }
    }
}
