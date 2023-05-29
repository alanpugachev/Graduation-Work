package com.alanpugachev.ftespring.services

import com.alanpugachev.ftespring.models.Task
import com.alanpugachev.ftespring.models.Users
import com.alanpugachev.ftespring.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun save(user: Users): Users {
        return this.userRepository.save(user)
    }

    fun findByEmail(email: String): Users? {
        return this.userRepository.findByEmail(email)
    }

    fun getById(id: Int): Users {
        return this.userRepository.findById(id).get()
    }

    fun getAllUsers(): MutableList<Users> {
        return this.userRepository.findAll()
    }

    fun update(user: Users, id: Int): Users {
        var userEntity = this.userRepository.findById(id).get()

        userEntity.firstName = user.firstName
        userEntity.secondName = user.secondName
        userEntity.email = user.email
        userEntity.role = user.role

        return this.userRepository.save(userEntity)
    }

    fun delete(id: Int) {
        return this.userRepository.deleteById(id)
    }
}