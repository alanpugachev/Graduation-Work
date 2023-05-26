package com.alanpugachev.ftespring.services

import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.repositories.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(private val taskRepository: TaskRepository) {

    fun get(id: Int): Task {
        return this.taskRepository.getReferenceById(id)
    }
    fun save(task: Task): Task {
        return this.taskRepository.save(task)
    }

    fun update(task:Task, id: Int): Task? {
        return this.taskRepository.updateById(task, id)
    }

    fun delete(id: Int) {
        return this.taskRepository.deleteById(id)
    }
}