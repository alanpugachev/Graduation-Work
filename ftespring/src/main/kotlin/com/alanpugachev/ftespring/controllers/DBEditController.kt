package com.alanpugachev.ftespring.controllers;

import com.alanpugachev.ftespring.dtos.CreateTaskDTO
import com.alanpugachev.ftespring.dtos.Message
import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.services.TaskService
import com.alanpugachev.ftespring.services.UserService;
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/db")
public class DBEditController(private val taskService: TaskService) {

    @GetMapping("get/{id}")
    fun getTaskById(@PathVariable id: Int): ResponseEntity<Task?> {
        return try {
            ResponseEntity.ok(this.taskService.get(id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(null)
        }
    }

    @GetMapping("task/{username}")
    fun getTaskByCustomer(@PathVariable username: String): ResponseEntity<Array<Task?>> {
        return try {
            ResponseEntity.ok(this.taskService.getByCustomer(username))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(null)
        }
    }

    @PostMapping("create")
    fun createTask(@RequestBody body: CreateTaskDTO): ResponseEntity<Task> {
        val task = Task()
        task.title = body.title
        task.projectCategory = body.projectCategory
        task.projectClass = body.projectClass
        task.executionTime = body.executionTime
        task.customer = body.customer
        task.price = body.price

        return ResponseEntity.ok(this.taskService.save(task))
    }

    @PostMapping("update/{id}")
    fun updateTask(@RequestBody task: Task, @PathVariable id: Int): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.taskService.update(task, id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Invalid data"))
        }
    }

    /*@PostMapping("update/{id}")
    fun updateTaskById(@PathVariable id: Int): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.taskService.updateById(id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Mamu ebal"))
        }
    } */

    @PostMapping("delete/{id}")
    fun deleteTask(@PathVariable id: Int): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(this.taskService.delete(id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(Message("Error"))
        }
    }
}
