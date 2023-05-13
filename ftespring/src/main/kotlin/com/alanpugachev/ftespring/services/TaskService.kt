package com.alanpugachev.ftespring.services

import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.repositories.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(private val taskRepository: TaskRepository) {
    fun save(task: Task): Task {
        return this.taskRepository.save(task)
    }
}