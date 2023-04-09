package com.alanpugachev.ftespring.services

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
}