package com.alanpugachev.ftespring.services

import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.repositories.TaskRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class TaskService(private val taskRepository: TaskRepository) {

    fun get(id: Int): Task {
        return this.taskRepository.getReferenceById(id)
    }

    fun getByCustomer(username: String): Array<Task?> {
        return this.taskRepository.findByCustomer(username)
    }

    fun save(task: Task): Task {
        return this.taskRepository.save(task)
    }

    fun update(task: Task, id: Int): Task {
        var taskEntity = this.taskRepository.findById(id).get()

        taskEntity.title = task.title
        taskEntity.projectCategory = task.projectCategory
        taskEntity.projectClass =  task.projectClass
        taskEntity.price = task.price
        taskEntity.customer = task.customer
        taskEntity.executionTime = task.executionTime

        return this.taskRepository.save(taskEntity)
    }

    fun delete(id: Int) {
        return this.taskRepository.deleteById(id)
    }

    fun getAllTasks(): MutableList<Task> {
        return this.taskRepository.findAll()
    }
}