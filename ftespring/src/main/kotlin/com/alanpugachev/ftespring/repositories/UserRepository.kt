package com.alanpugachev.ftespring.repositories

import com.alanpugachev.ftespring.models.Users
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<Users, Int> {
}