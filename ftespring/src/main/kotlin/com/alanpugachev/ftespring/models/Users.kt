package com.alanpugachev.ftespring.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int = 0

    @Column
    var firstName= ""

    @Column
    var secondName = ""

    @Column
    var email = ""

    @Column
    var password = ""

    @Column
    var role = "user"
}