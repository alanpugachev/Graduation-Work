package com.alanpugachev.ftespring.repositories

import com.alanpugachev.ftespring.models.Task
import org.springframework.data.jpa.repository.JpaRepository

interface TaskRepository: JpaRepository<Task, Int> {
    fun findByTitle(title: String): Task?
}